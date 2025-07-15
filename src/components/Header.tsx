import { useState } from 'react';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

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

export default function Header() {
  const [open, setOpen] = useState(false);
  const greenColor = '#00BA9F';

  return (
    <div className="w-fit">
      <div
        className={`w-[121px] bg-white rounded-[20px] flex flex-col items-center cursor-default transition-all duration-300 ease-in-out`}
        style={{
          border: `1.5px solid ${greenColor}`,
          height: open ? '90px' : '37px',
          padding: '0 12px',
          overflow: 'hidden',
        }}
      >
        {/* ناحیه کلیک باز/بسته */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full h-[37px] cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" style={{ color: greenColor }} />
            <span className="text-[15px] font-normal" style={{ color: greenColor }}>
              مهمان
            </span>
          </div>
          {open ? (
            <FilledTriangleUp className="w-3 h-2" />
          ) : (
            <FilledTriangleDown className="w-3 h-2" />
          )}
        </div>

        {open && (
          <>
            <hr
              className="my-1"
              style={{
                width: '84px',
                borderColor: greenColor,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderRadius: '1px',
              }}
            />
            <div
              className="flex items-center gap-1 w-full h-[37px] cursor-pointer rounded-b-[20px]"
              style={{ color: greenColor }}
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>خروج</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
