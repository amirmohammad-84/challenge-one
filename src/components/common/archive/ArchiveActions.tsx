import wordIcon from "../../../assets/word.svg";
import copyIcon from "../../../assets/copy.svg";
import trashIcon from "../../../assets/trash.svg";
import downloadIcon from "../../../assets/download.svg";
import type { FC } from "react";

type Props = {
  size: string;
};

type Action = {
  icon: string;
  alt: string;
  bg: string;
  tooltip?: string;
};

const ArchiveActions: FC<Props> = ({ size }) => {
  const actions: Action[] = [
    {
      icon: downloadIcon,
      alt: "download",
      bg: "hover:bg-teal-500",
      tooltip: size,
    },
    {
      icon: wordIcon,
      alt: "word",
      bg: "hover:bg-blue-600",
    },
    {
      icon: copyIcon,
      alt: "copy",
      bg: "hover:bg-teal-500",
    },
    {
      icon: trashIcon,
      alt: "trash",
      bg: "bg-transparent hover:bg-red-500 hover:brightness-90",
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {actions.map(({ icon, alt, bg, tooltip }) => (
        <div
          key={alt}
          title={tooltip}
          className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer group ${bg}`}
        >
          <img
            src={icon}
            alt={alt}
            width={16}
            height={16}
            className="group-hover:text-white transition duration-200"
          />
        </div>
      ))}
    </div>
  );
};

export default ArchiveActions;
