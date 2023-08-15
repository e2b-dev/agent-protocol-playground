import { StateCreator } from 'zustand'

export interface AgentUrlSlice {
  url: string
  setUrl: (url: string) => void
}

export const createAgentUrlSlice: StateCreator<AgentUrlSlice> = (set) => ({
  url: 'http://localhost:8000',
  setUrl: async (url: string) => {
    set({ url })
  },
})
