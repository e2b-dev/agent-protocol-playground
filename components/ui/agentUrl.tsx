'use client'

import { Input } from '@/components/ui/input'
import { useAgentStore } from '@/app/store'

export const AgentUrl = () => {
  const { setUrl, url } = useAgentStore()
  return (
    <div className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-2">
      <span className="text-xs text-zinc-400">Agent URL</span>
      <Input
        className="w-[300px] text-xs h-8"
        type="text"
        placeholder="localhost:8000"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  )
}
