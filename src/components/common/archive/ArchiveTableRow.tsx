import { LinkIcon } from "@heroicons/react/24/outline";
import micIcon from "../../../assets/mic2.svg";
import cloudIcon from "../../../assets/cloud.svg";
import ArchiveActions from "./ArchiveActions";
import type { FileItem } from "../../Types/archive";

const iconMap = {
  link: {
    icon: <LinkIcon className="w-4 h-4 text-white" />,
    bg: "bg-[#FF1654]",
  },
  mic: {
    icon: <img src={micIcon} alt="mic" className="w-4 h-4" />,
    bg: "bg-[#40C6B8]",
  },
  cloud: {
    icon: <img src={cloudIcon} alt="cloud" className="w-4 h-4" />,
    bg: "bg-[#118AD3]",
  },
};

export default function ArchiveTableRow({ file }: { file: FileItem }) {
  const icon = iconMap[file.icon];

  return (
    <tr className="hover:shadow-[1px_2px_5px_0px_rgba(0,0,0,0.05)] transition h-12 rounded-[10px] cursor-pointer bg-white">
      <td className="w-1/2 px-3 text-sm text-gray-700 text-center">
        <div className="flex items-center gap-2.5 max-w-md mr-5 truncate">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${icon.bg}`}>
            {icon.icon}
          </div>
          <span className="truncate flex items-center">{file.name}</span>
        </div>
      </td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">{file.date}</td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">.{file.type}</td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">{file.duration}</td>
      <td className="w-[12.5%] pr-1">
        <ArchiveActions size={file.size} />
      </td>
    </tr>
  );
}
