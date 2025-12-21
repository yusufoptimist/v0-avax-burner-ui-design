"use client"

import { create } from "zustand"

interface WalletState {
  address: string | null
  isConnected: boolean
  balance: string
  connect: (address: string) => void
  disconnect: () => void
  setBalance: (balance: string) => void
}

export const useWallet = create<WalletState>()((set) => ({
  address: null,
  isConnected: false,
  balance: "0",
  connect: (address: string) => set({ address, isConnected: true, balance: "2.5" }),
  disconnect: () => set({ address: null, isConnected: false, balance: "0" }),
  setBalance: (balance: string) => set({ balance }),
}))
