import { useState } from "react";

const TriangleIcon = ({
  direction,
  className,
}: {
  direction: "up" | "down";
  className?: string;
}) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={direction === "down" ? "M6 8L0 0H12L6 8Z" : "M6 0L12 8H0L6 0Z"}
      fill="#00BA9F"
    />
  </svg>
);

const LANGUAGES = ["فارسی", "انگلیسی"] as const;

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<(typeof LANGUAGES)[number]>(
    "فارسی"
  );

  const otherLangs = LANGUAGES.filter((lang) => lang !== selectedLang);

  const toggleLang = (lang: typeof LANGUAGES[number]) => {
    setSelectedLang(lang);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2 mt-0.5 text-sm font-light text-gray-700 select-none pr-2">
      <div>زبان گفتار:</div>
      <div
        className="w-32 bg-white rounded-3xl flex flex-col items-center cursor-default transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          border: "1.5px solid #00BA9F",
          height: open ? "90px" : "37px",
          padding: "0 12px",
          color: "#00BA9F",
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full h-9 cursor-pointer"
        >
          <span>{selectedLang}</span>
          <TriangleIcon direction={open ? "up" : "down"} className="w-3 h-2" />
        </div>

        {open && (
          <>
            <hr className="my-1 w-20 border-t-2 border-[#00BA9F] rounded" />
            <div className="flex flex-col gap-1 w-full cursor-pointer">
              {otherLangs.map((lang) => (
                <div
                  key={lang}
                  onClick={() => toggleLang(lang)}
                  className="px-2 py-1 rounded-b-3xl flex justify-between text-[#00BA9F]"
                >
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
