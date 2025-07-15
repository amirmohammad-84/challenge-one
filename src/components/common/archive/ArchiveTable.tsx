import ArchiveTableRow from "./ArchiveTableRow";
import type { FileItem } from "../../Types/archive";

type Props = {
  files: FileItem[];
};

export default function ArchiveTable({ files }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2 text-right">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="text-right pr-[74px] w-1/2">نام فایل</th>
            <th className="text-center w-[12.5%]">تاریخ بارگذاری</th>
            <th className="text-center w-[12.5%]">نوع فایل</th>
            <th className="text-center w-[12.5%]">مدت زمان</th>
            <th className="text-right w-[12.5%]"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <ArchiveTableRow key={file.id} file={file} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
