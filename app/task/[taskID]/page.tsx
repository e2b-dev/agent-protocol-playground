'use client'
import useSWR from 'swr'

import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import Step from '@/app/task/[taskID]/step'
import { fetcher } from '@/app/utils'

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
    data: steps,
    mutate: mutateSteps,
    error: stepsError,
    isLoading: isStepsLoading,
  } = useSWR<components['schemas']['Step'][]>(
    `${url}/agent/tasks/${params.taskID}/steps`,
    fetcher,
  )

  if (isStepsLoading || isTaskLoading) {
    return <div>Loading...</div>
  }

  if (taskError || stepsError || task === undefined || steps === undefined) {
    return <div>Failed to load</div>
  }

  async function nextStep() {
    const request = fetch(`${url}/agent/tasks/${params.taskID}/steps`, {
      method: 'POST',
    })

    const currentStep = steps!.find((step) => step.status === 'created')
    if (currentStep) {
      const updatedSteps = steps!.map((item) =>
        item.step_id === currentStep.step_id
          ? { ...item, status: 'running' }
          : item,
      )
      await mutateSteps(updatedSteps, false)
    }
    await request
    await mutateSteps()
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
            <TableHead className="w-[150px]">Step Name</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Output</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {steps.map((step, idx) => (
            <Step key={step.step_id} step={step} step_number={idx + 1} />
          ))}
        </TableBody>
      </Table>

      <div className="sticky top-[100vh] px-4 py-2 w-full flex items-center justify-end space-x-2 bg-white border-2 rounded-l">
        <Button
          type="submit"
          className="whitespace-nowrap px-3 h-8"
          onClick={() => nextStep()}
        >
          Next Step
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
