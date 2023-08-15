'use client'
import { components } from '@/app/types/api'
import { TableCell, TableRow } from '@/components/ui/table'
import { downloadFile } from '@/app/utils'
import { useAgentStore } from '@/app/store'

interface Props {
  taskId: string
  artifact: components['schemas']['Artifact']
  artifact_number: number
}

export default function Artifact(props: Props) {
  const { url } = useAgentStore()

  const { taskId, artifact_number, artifact } = props
  return (
    <TableRow>
      <TableCell>{artifact_number}</TableCell>
      <TableCell>{artifact.file_name}</TableCell>
      <TableCell>{artifact.relative_path}</TableCell>
      <TableCell
        onClick={() =>
          downloadFile(
            `${url}/tasks/${taskId}/artifacts/${artifact.artifact_id}`,
            artifact.file_name,
          )
        }
        className="cursor-pointer hover:bg-gray-100 transition-all"
      >
        Download
      </TableCell>
    </TableRow>
  )
}
