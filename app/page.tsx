'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useSWR from 'swr'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAgentStore } from '@/app/store'
import { components } from '@/app/types/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const fetcher = async (url: string) => {
  console.log(url)
  const response = await fetch(url)
  console.log(response)
  return await response.json()
}

export default function Home() {
  const [input, setInput] = useState('')
  const { url } = useAgentStore()
  const router = useRouter()

  const {
    data: tasks,
    mutate: refetchTasks,
    error,
    isLoading,
  } = useSWR<components['schemas']['Task'][]>(`${url}/agent/tasks`, fetcher, {
    fallbackData: [],
  })

  if (error || tasks === undefined)
    return (
      <div>
        {error.toString()}
        failed to load
      </div>
    )
  if (isLoading) return <div>Loading...</div>

  async function createTask() {
    await fetch(`${url}/agent/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: input }),
    })
    setInput('')
    await refetchTasks()
  }

  return (
    <div className="flex-1 w-full flex flex-col items-start justify-start px-2 py-4">
      <Table>
        <TableCaption>Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Task ID</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Artifacts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.task_id}>
              <TableCell>{task.task_id}</TableCell>
              <TableCell
                onClick={() => router.push(`/task/${task.task_id}`)}
                className=" font-medium cursor-pointer hover:bg-gray-100 transition-all"
              >
                {task.input}
              </TableCell>
              {task.artifacts.length > 0 ? (
                <TableCell
                  onClick={() => router.push(`/task/${task.task_id}/artifacts`)}
                  className="cursor-pointer hover:bg-gray-100 transition-all"
                >
                  Link
                </TableCell>
              ) : (
                <TableCell>No Artifacts</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="sticky top-[100vh] px-4 py-5 w-full flex items-center space-x-2 bg-white border-2">
        <Input
          type="text"
          placeholder="Task for the agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          className="whitespace-nowrap"
          onClick={() => createTask()}
        >
          Create New Task
        </Button>
      </div>
    </div>
  )
}
