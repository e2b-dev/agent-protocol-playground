'use client'

import { useState } from 'react'
import { components } from '@/app/types/api'
import { TableCell, TableRow } from '@/components/ui/table'

interface Props {
  step: components['schemas']['Step']
  step_number: number
}

function statusMapping(status: string) {
  switch (status) {
    case 'created':
      return 'queued'
    default:
      return status
  }
}

export default function Step(props: Props) {
  const [showOutput, setShowOutput] = useState(false)
  const { step_number, step } = props
  return (
    <TableRow
      onClick={() => setShowOutput((prevState) => !prevState)}
      className="cursor-pointer hover:bg-gray-100 transition-all"
    >
      <TableCell>{step_number}</TableCell>
      <TableCell>{step.name}</TableCell>
      <TableCell>{statusMapping(step.status)}</TableCell>
      <TableCell className="font-medium">
        {step.output &&
          (showOutput || step.output.length < 100
            ? step.output
            : `${step.output.slice(0, 97)}...`)}
      </TableCell>
    </TableRow>
  )
}
