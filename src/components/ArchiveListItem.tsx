import { LinkIcon } from "@heroicons/react/24/outline";
import cloudIcon from "../assets/cloud.svg";
import micIcon from "../assets/mic2.svg";
import copyIcon from "../assets/copy.svg";
import wordIcon from "../assets/word.svg";
import downloadIcon from "../assets/download.svg";
import trashIcon from "../assets/trash.svg";
import type { JSX } from "react";

type FileItem = {
  name: string;
  type: string;
  date: string;
  duration: string;
  icon: string;
  size: string;
};

const ActionButton = ({
  icon,
  onHoverText,
}: {
  icon: string;
  onHoverText?: string;
}) => {
  const icons: { [key: string]: string } = {
    copy: copyIcon,
    word: wordIcon,
    download: downloadIcon,
    trash: trashIcon,
  };

  const hoverColorMap: { [key: string]: string } = {
    copy: "rgba(64, 198, 184, 1)",
    word: "rgba(17, 138, 211, 1)",
    download: "rgba(64, 198, 184, 1)",
  };

  const isTrash = icon === "trash";
  const hoverColor = hoverColorMap[icon];

  return (
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer relative group transition duration-200 ${
        isTrash ? "hover:bg-[#FF1654]" : ""
      }`}
    >
      <img
        src={icons[icon]}
        alt={icon}
        width={14}
        height={14}
        className={`transition duration-200 ${
          isTrash
            ? ""
            : hoverColor
            ? "group-hover:brightness-0 group-hover:invert"
            : ""
        }`}
        style={{
          filter:
            hoverColor && !isTrash
              ? `drop-shadow(0 0 0 ${hoverColor})`
              : "none",
        }}
      />
      {onHoverText && icon === "download" && (
        <div
          className="absolute left-0 mt-12 bg-white text-gray-800 text-xs px-2 py-1 rounded whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition"
          style={{
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          {onHoverText}
        </div>
      )}
    </div>
  );
};

const ArchiveListItem = ({ file }: { file: FileItem }) => {
  const iconMap: {
    [key: string]: { element: JSX.Element; bg: string };
  } = {
    cloud: {
      element: <img src={cloudIcon} alt="cloud" width={16} height={16} />,
      bg: "bg-[#118AD3]",
    },
    mic: {
      element: <img src={micIcon} alt="mic" width={16} height={16} />,
      bg: "bg-[#40C6B8]",
    },
    link: {
      element: <LinkIcon className="w-4 h-4 text-white" />,
      bg: "bg-[#FF1654]",
    },
  };

  return (
    <tr className="hover:shadow-[1px_1px_5px_0_rgba(0,0,0,0.05)] transition h-12 rounded-lg">
      <td className="w-1/2 px-3 text-sm text-gray-700 text-center">
        <div className="flex items-center gap-2.5 max-w-md mr-5 truncate">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${iconMap[file.icon].bg}`}
          >
            {iconMap[file.icon].element}
          </div>
          <span className="truncate flex items-center">{file.name}</span>
        </div>
      </td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">{file.date}</td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">.{file.type}</td>
      <td className="w-[12.5%] text-sm text-gray-600 text-center">{file.duration}</td>
      <td className="w-[12.5%] pr-1">
        <div className="flex gap-1 justify-start">
          <ActionButton icon="download" onHoverText={file.size} />
          <ActionButton icon="word" />
          <ActionButton icon="copy" />
          <div className="ml-auto">
            <ActionButton icon="trash" />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ArchiveListItem;
