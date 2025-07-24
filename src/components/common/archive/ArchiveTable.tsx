import type { FC } from "react"
import ArchiveTableRow from "./ArchiveTableRow"
import type { FileItem } from "../../Types/archive"

type Props = {
  files: FileItem[]
  onRemove: (id: string) => void
}

const ArchiveTable: FC<Props> = ({ files, onRemove }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-right border-separate border-spacing-y-2">
        <thead>
          <tr className="text-sm text-gray-500">
            <th scope="col" className="text-right pr-[74px] w-1/2">
              نام فایل
            </th>
            <th scope="col" className="text-center w-[12.5%]">
              تاریخ بارگذاری
            </th>
            <th scope="col" className="text-center w-[12.5%]">
              نوع فایل
            </th>
            <th scope="col" className="text-center w-[12.5%]">
              مدت زمان
            </th>
            <th scope="col" className="text-right w-[12.5%]"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <ArchiveTableRow
              key={file.id}
              file={file}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArchiveTable
