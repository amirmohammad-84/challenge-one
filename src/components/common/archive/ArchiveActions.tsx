import wordIcon from "../../../assets/word.svg"
import copyIcon from "../../../assets/copy.svg"
import trashIcon from "../../../assets/trash.svg"
import downloadIcon from "../../../assets/download.svg"
import type { FC } from "react"

type Props = {
  size: string
}

type Action = {
  icon: string
  alt: string
  tooltip?: string
  hoverClass?: string
  bgClass?: string
}

const ArchiveActions: FC<Props> = ({ size }) => {
  const actions: Action[] = [
    {
      icon: downloadIcon,
      alt: "download",
      tooltip: `حجم فایل: ${size}`,
      bgClass: "hover:bg-gray-200 hover:brightness-90",
    },
    {
      icon: wordIcon,
      alt: "word",
      bgClass: "hover:bg-gray-200 hover:brightness-90",
    },
    {
      icon: copyIcon,
      alt: "copy",
      bgClass: "hover:bg-gray-200 hover:brightness-90",
    },
    {
      icon: trashIcon,
      alt: "trash",
      bgClass: "hover:bg-red-500 hover:brightness-90",
      hoverClass: "group-hover:brightness-0 group-hover:invert",
    },
  ]

  return (
    <div className="flex items-center gap-1">
      {actions.map(({ icon, alt, tooltip, hoverClass, bgClass }) => (
        <div
          key={alt}
          title={tooltip}
          className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer group ${bgClass ?? ""}`}
        >
          <img
            src={icon}
            alt={alt}
            width={16}
            height={16}
            className={`transition duration-200 ${hoverClass ?? ""}`}
          />
        </div>
      ))}
    </div>
  )
}

export default ArchiveActions
