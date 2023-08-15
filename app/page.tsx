import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const tasks = [
  {
    task_id: 'aslk21j',
    input: 'Do a task 1',
  },
  {
    task_id: 'wqefio3',
    input: 'Do a task 2',
  },
  {
    task_id: 'asdopi9',
    input: 'Do a task 3',
  },
]


export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-start justify-start">
      <div className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-2">
        <span className="text-xs text-zinc-400">Agent URL</span>
        <Input className="w-[300px] text-xs h-8" type="text" placeholder="https://..." />
      </div>
      <Separator/>

      <div className="flex-1 px-4 py-4 space-y-2 flex flex-col items-start justify-start flex-1 w-full bg-zinc-50">
        <h3 className="text-xs text-zinc-400">Tasks</h3>
        <div className="flex flex-col items-start justify-start w-full">
          {tasks.map((task, idx) => (
            <Link className="w-full" key={task.task_id} href={`/task/${task.task_id}`}>
            <div key={task.task_id} className="rounded w-full transition-all cursor-pointer flex flex-col w-full space-y-2 py-2">
              <div className="flex flex-row items-center justify-start space-x-2 w-full">
                <span className="w-[50px] text-xs text-zinc-600">{task.task_id}</span>
                <span className="text-xs font-medium text-zinc-600">{task.input}</span>
              </div>
              {idx !== tasks.length - 1 && (
                <Separator/>
              )}
            </div>
            </Link>
          ))}
        </div>
      </div>

      <Separator/>
      <div className="px-4 py-2 w-full flex items-center space-x-2">
        <Input type="text" placeholder="Task for the agent..." />
        <Button type="submit" className="whitespace-nowrap">Create New Task</Button>
      </div>
    </div>
  )
}
