import { create } from 'zustand'
import { AgentUrlSlice, createAgentUrlSlice } from './slices/agentUrl'

type StoreState = AgentUrlSlice

export const useAgentStore = create<StoreState>()((...a) => ({
  ...createAgentUrlSlice(...a),
}))
