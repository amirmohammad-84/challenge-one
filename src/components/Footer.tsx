import { useState } from 'react';

const FilledTriangleDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 8L0 0H12L6 8Z" fill="#00BA9F" />
  </svg>
);

const FilledTriangleUp = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 0L12 8H0L6 0Z" fill="#00BA9F" />
  </svg>
);

export default function Footer() {
  const [open, setOpen] = useState(false);
  const greenColor = '#00BA9F';

  const [selectedLangs, setSelectedLangs] = useState<('فارسی' | 'انگلیسی')[]>([
    'فارسی',
    'انگلیسی',
  ]);

  const selectedLang = selectedLangs[0];

  const handleSelect = (lang: 'فارسی' | 'انگلیسی') => {
    setSelectedLangs((prev) => {
      const filtered = prev.filter((l) => l !== lang);
      return [lang, ...filtered];
    });
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2 mt-0.5 text-sm font-light text-gray-700 select-none pr-2">
      <div>زبان گفتار:</div>
      <div
        className="w-32 bg-white rounded-3xl flex flex-col items-center cursor-default transition-all duration-300 ease-in-out"
        style={{
          border: `1.5px solid ${greenColor}`,
          height: open ? '90px' : '37px',
          padding: '0 12px',
          overflow: 'hidden',
          color: greenColor,
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full h-9 cursor-pointer"
        >
          <span>{selectedLang}</span>
          {open ? (
            <FilledTriangleUp className="w-3 h-2" />
          ) : (
            <FilledTriangleDown className="w-3 h-2" />
          )}
        </div>

        {open && (
          <>
            <hr
              className="my-1 w-20 border-t-2 border-[#00BA9F] rounded"
            />
            <div className="flex flex-col gap-1 w-full cursor-pointer">
              {selectedLangs.slice(1).map((lang) => (
                <div
                  key={lang}
                  onClick={() => handleSelect(lang)}
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
