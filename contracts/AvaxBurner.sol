// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AvaxBurner
 * @dev Contract for burning spam tokens and NFTs with rebate system
 */
contract AvaxBurner is ReentrancyGuard, Ownable {
    uint256 public constant REBATE_PERCENTAGE = 25; // 25% rebate
    uint256 public totalBurns;
    uint256 public totalRebatesPaid;
    
    mapping(address => uint256) public userBurnCount;
    mapping(address => uint256) public userRebates;
    
    event TokensBurned(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 rebate
    );
    
    event NFTBurned(
        address indexed user,
        address indexed nft,
        uint256 tokenId,
        uint256 rebate
    );
    
    event RebateClaimed(
        address indexed user,
        uint256 amount
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Burn ERC20 tokens
     * @param tokenAddress Address of the token contract
     * @param amount Amount of tokens to burn
     */
    function burnTokens(address tokenAddress, uint256 amount) 
        external 
        nonReentrant 
    {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(tokenAddress);
        
        // Transfer tokens from user to this contract
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        // Calculate rebate (25% of gas cost estimation)
        uint256 gasUsed = gasleft();
        uint256 rebate = (tx.gasprice * gasUsed * REBATE_PERCENTAGE) / 100;
        
        // Update stats
        totalBurns++;
        userBurnCount[msg.sender]++;
        userRebates[msg.sender] += rebate;
        totalRebatesPaid += rebate;
        
        emit TokensBurned(msg.sender, tokenAddress, amount, rebate);
    }
    
    /**
     * @dev Burn multiple ERC20 tokens in batch
     * @param tokenAddresses Array of token contract addresses
     * @param amounts Array of amounts to burn
     */
    function batchBurnTokens(
        address[] calldata tokenAddresses,
        uint256[] calldata amounts
    ) external nonReentrant {
        require(
            tokenAddresses.length == amounts.length,
            "Arrays length mismatch"
        );
        require(tokenAddresses.length > 0, "Empty arrays");
        
        uint256 totalRebate = 0;
        
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            address tokenAddress = tokenAddresses[i];
            uint256 amount = amounts[i];
            
            require(tokenAddress != address(0), "Invalid token address");
            require(amount > 0, "Amount must be greater than 0");
            
            IERC20 token = IERC20(tokenAddress);
            require(
                token.transferFrom(msg.sender, address(this), amount),
                "Transfer failed"
            );
            
            uint256 gasUsed = gasleft();
            uint256 rebate = (tx.gasprice * gasUsed * REBATE_PERCENTAGE) / 100;
            totalRebate += rebate;
            
            totalBurns++;
            
            emit TokensBurned(msg.sender, tokenAddress, amount, rebate);
        }
        
        userBurnCount[msg.sender] += tokenAddresses.length;
        userRebates[msg.sender] += totalRebate;
        totalRebatesPaid += totalRebate;
    }
    
    /**
     * @dev Burn NFT
     * @param nftAddress Address of the NFT contract
     * @param tokenId Token ID to burn
     */
    function burnNFT(address nftAddress, uint256 tokenId) 
        external 
        nonReentrant 
    {
        require(nftAddress != address(0), "Invalid NFT address");
        
        IERC721 nft = IERC721(nftAddress);
        
        // Transfer NFT from user to this contract
        nft.transferFrom(msg.sender, address(this), tokenId);
        
        // Calculate rebate
        uint256 gasUsed = gasleft();
        uint256 rebate = (tx.gasprice * gasUsed * REBATE_PERCENTAGE) / 100;
        
        // Update stats
        totalBurns++;
        userBurnCount[msg.sender]++;
        userRebates[msg.sender] += rebate;
        totalRebatesPaid += rebate;
        
        emit NFTBurned(msg.sender, nftAddress, tokenId, rebate);
    }
    
    /**
     * @dev Batch burn NFTs
     * @param nftAddresses Array of NFT contract addresses
     * @param tokenIds Array of token IDs to burn
     */
    function batchBurnNFTs(
        address[] calldata nftAddresses,
        uint256[] calldata tokenIds
    ) external nonReentrant {
        require(
            nftAddresses.length == tokenIds.length,
            "Arrays length mismatch"
        );
        require(nftAddresses.length > 0, "Empty arrays");
        
        uint256 totalRebate = 0;
        
        for (uint256 i = 0; i < nftAddresses.length; i++) {
            address nftAddress = nftAddresses[i];
            uint256 tokenId = tokenIds[i];
            
            require(nftAddress != address(0), "Invalid NFT address");
            
            IERC721 nft = IERC721(nftAddress);
            nft.transferFrom(msg.sender, address(this), tokenId);
            
            uint256 gasUsed = gasleft();
            uint256 rebate = (tx.gasprice * gasUsed * REBATE_PERCENTAGE) / 100;
            totalRebate += rebate;
            
            totalBurns++;
            
            emit NFTBurned(msg.sender, nftAddress, tokenId, rebate);
        }
        
        userBurnCount[msg.sender] += nftAddresses.length;
        userRebates[msg.sender] += totalRebate;
        totalRebatesPaid += totalRebate;
    }
    
    /**
     * @dev Claim accumulated rebates
     */
    function claimRebate() external nonReentrant {
        uint256 rebate = userRebates[msg.sender];
        require(rebate > 0, "No rebate to claim");
        require(address(this).balance >= rebate, "Insufficient contract balance");
        
        userRebates[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: rebate}("");
        require(success, "Rebate transfer failed");
        
        emit RebateClaimed(msg.sender, rebate);
    }
    
    /**
     * @dev Get user statistics
     */
    function getUserStats(address user) 
        external 
        view 
        returns (
            uint256 burnCount,
            uint256 pendingRebate
        ) 
    {
        return (
            userBurnCount[user],
            userRebates[user]
        );
    }
    
    /**
     * @dev Fund contract for rebates
     */
    receive() external payable {}
    
    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}
