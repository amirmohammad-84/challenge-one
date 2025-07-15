import wordIcon from "../../../assets/word.svg";
import copyIcon from "../../../assets/copy.svg";
import trashIcon from "../../../assets/trash.svg";
import downloadIcon from "../../../assets/download.svg";

export default function ArchiveActions({ size }: { size: string }) {
  const actions = [
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
      {actions.map(({ icon, alt, bg, tooltip }, idx) => (
        <div
          key={idx}
          title={tooltip}
          className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer group ${bg}`}
        >
          <img
            src={icon}
            alt={alt}
            width={16}
            height={16}
            className="text-gray-400 group-hover:text-white transition duration-200"
            style={{ filter: "none" }}
          />
        </div>
      ))}
    </div>
  );
}
