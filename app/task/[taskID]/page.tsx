import { ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page({ params }: { params: { taskID: string } }) {
  return (
    <div className="flex-1 w-full flex flex-col items-start justify-start py-2 px-4 bg-zinc-50">
      {/* Breadcrumbs */}
      <div className="flex justify-start items-center space-x-1">
        <Link href="/">
          <span className="text-xs text-zinc-500 cursor hover:text-gray-600 transition-all">Tasks {'/'}</span>
        </Link>

        <Link href={`/task/${params.taskID}`}>
          <span className="text-xs font-medium">{params.taskID} {'(should be task input)'}</span>
        </Link>
      </div>

      <div className="flex-1 py-4 space-y-2 flex flex-col items-start justify-start flex-1 w-full">
        <div>Step 1</div>
        <div>Step 2</div>
      </div>


      <Separator/>
      <div className="px-4 py-2 w-full flex items-center justify-end space-x-2">
        <Button type="submit" className="whitespace-nowrap text-xs px-3 h-8">
          Next Step
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}