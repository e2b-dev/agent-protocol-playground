'use client'
import useSWR from 'swr'

import Link from 'next/link'
import { useAgentStore } from '@/app/store'
import { components } from '@/app/types/api'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetcher } from '@/app/utils'
import Artifact from '@/app/task/[taskID]/artifacts/artifact'

export default function Page({ params }: { params: { taskID: string } }) {
  const { url } = useAgentStore()
  const {
    data: task,
    error: taskError,
    isLoading: isTaskLoading,
  } = useSWR<components['schemas']['Task']>(
    `${url}/agent/tasks/${params.taskID}`,
    fetcher,
  )
  const {
    data: artifacts,
    error: artifactsError,
    isLoading: isArtifactsLoading,
  } = useSWR<components['schemas']['Artifact'][]>(
    `${url}/agent/tasks/${params.taskID}/artifacts`,
    fetcher,
  )

  if (isArtifactsLoading || isTaskLoading) {
    return <div>Loading...</div>
  }
  if (
    taskError ||
    artifactsError ||
    task === undefined ||
    artifacts === undefined
  ) {
    return <div>Failed to load</div>
  }

  return (
    <div className="flex-1 w-full flex flex-col items-start justify-start py-2 px-4 bg-zinc-50">
      {/* Breadcrumbs */}
      <div className="flex justify-start items-center space-x-1">
        <Link href="/">
          <span className="text-xs text-zinc-500 cursor hover:text-gray-600 transition-all">
            Tasks {'/'}
          </span>
        </Link>

        <Link href={`/task/${params.taskID}`}>
          <span className="text-xs font-medium">{task.input}</span>
        </Link>
      </div>

      <Table>
        <TableCaption>Steps</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead className="w-[150px]">File Name</TableHead>
            <TableHead className="w-[100px]">Relative Path</TableHead>
            <TableHead>Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artifacts.map((artifact, idx) => (
            <Artifact
              key={artifact.artifact_id}
              taskId={task.task_id}
              artifact={artifact}
              artifact_number={idx + 1}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
