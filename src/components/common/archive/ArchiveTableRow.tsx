// src/components/archive/ArchiveTableRow.tsx
import { useState, useRef, useEffect, useMemo } from "react"
import ArchiveExpandedRow from "./ArchiveExpandedRow"
import { LinkIcon } from "@heroicons/react/24/outline"
import micIcon from "../../../assets/mic2.svg"
import cloudIcon from "../../../assets/cloud.svg"
import ArchiveActions from "./ArchiveActions"
import type { FileItem } from "../../Types/archive"

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
} as const

const iconToTabMap = {
  link: "link",
  mic: "record",
  cloud: "upload",
} as const

const borderColors = {
  record: "#00BA9F",
  upload: "#118AD3",
  link: "#FF1654",
} as const

export default function ArchiveTableRow({
  file,
  onRemove,
}: {
  file: FileItem
  onRemove: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const icon = useMemo(() => iconMap[file.icon], [file.icon])
  const tab = useMemo(() => iconToTabMap[file.icon], [file.icon])
  const borderColor = useMemo(() => (expanded ? borderColors[tab] : "transparent"), [expanded, tab])

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [expanded])

  return (
    <tr>
      <td colSpan={5} className="p-0">
        <div
          className={`bg-white rounded-[10px] transition-shadow duration-300 ${
            expanded ? "shadow-[1px_2px_5px_rgba(0,0,0,0.05)] border" : ""
          }`}
          style={{
            border: `1px solid ${borderColor}`,
          }}
        >
          <div className="flex items-center px-3 h-12 select-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${icon.bg} flex-shrink-0`}
            >
              {icon.icon}
            </div>
            <span
              onClick={() => setExpanded((prev) => !prev)}
              className="truncate flex-1 mx-4 text-gray-700 text-sm cursor-pointer"
            >
              {file.name}
            </span>
            <div className="w-[12.5%] text-center text-sm text-gray-600">{file.date}</div>
            <div className="w-[12.5%] text-center text-sm text-gray-600">.{file.type}</div>
            <div className="w-[12.5%] text-center text-sm text-gray-600">{file.duration}</div>
            <div className="w-[12.5%] pr-1 flex justify-center">
              <ArchiveActions
                size={file.size}
                textToHandle={file.transcript ?? ""}
                onDelete={() => onRemove(file.id)}
              />
            </div>
          </div>
          <div
            ref={contentRef}
            className="overflow-hidden transition-[height] duration-300 px-4 pb-4"
            style={{ height }}
            onClick={(e) => e.stopPropagation()}
          >
            {expanded && (
              <ArchiveExpandedRow
                tab={tab}
                text={file.transcript ?? "بدون متن"}
                audioUrl={file.audioUrl ?? ""}
              />
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}
