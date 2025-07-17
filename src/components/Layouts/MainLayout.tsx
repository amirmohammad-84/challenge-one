import { useState, type ReactNode } from "react";
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import archiveIcon from "../../assets/archive.svg";
import voiceIcon from "../../assets/mic.svg";
import logo from "../../assets/logo.svg";
import asideImage from "../../assets/mainPageAside.svg";

const FilledTriangle = ({
  direction = "down",
  className,
}: {
  direction?: "up" | "down";
  className?: string;
}) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d={direction === "down" ? "M6 8L0 0H12L6 8Z" : "M6 0L12 8H0L6 0Z"}
      fill="#00BA9F"
    />
  </svg>
);

function Sidebar() {
  const location = useLocation();
  const activeTab = location.pathname === "/archive" ? "archive" : "voice";

  // نکته: مقدار کلاس `text-white` در اسپن‌ها تکراریه، فقط یک‌بار اضافه کن

  return (
    <div className="hidden lg:flex relative w-44 bg-[#00BA9F] text-white rounded-tl-xl rounded-bl-xl min-h-screen">
      <img
        src={asideImage}
        alt="aside-typography"
        className="absolute top-0 left-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="logo" className="w-14 h-9" loading="lazy" />
      </div>
      <Link
        to="/"
        className={`absolute top-72 left-1/2 transform -translate-x-1/2 w-36 h-12 flex items-center justify-center rounded-xl px-4 cursor-pointer transition-opacity ${
          activeTab === "voice"
            ? "bg-[#02816E] text-white"
            : "bg-transparent text-black"
        }`}
      >
        <img src={voiceIcon} className="w-6 h-6 ml-3" alt="voice" loading="lazy" />
        <span className="text-white">تبدیل گفتار</span>
      </Link>
      <Link
        to="/archive"
        className={`absolute top-96 left-1/2 transform -translate-x-1/2 w-36 h-12 flex items-center justify-center rounded-xl px-4 cursor-pointer transition-opacity ${
          activeTab === "archive"
            ? "bg-[#02816E] text-white"
            : "bg-transparent text-black"
        }`}
      >
        <img
          src={archiveIcon}
          className="w-6 h-6 ml-7"
          alt="archive"
          loading="lazy"
        />
        <span className="text-white">آرشیو</span>
      </Link>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const greenColor = "#00BA9F";

  return (
    <div className="absolute left-11 top-10">
      <div
        className="w-[121px] bg-white rounded-[20px] flex flex-col items-center cursor-default transition-all duration-300 ease-in-out"
        style={{
          border: `1.5px solid ${greenColor}`,
          height: open ? "90px" : "37px",
          padding: "0 12px",
          overflow: "hidden",
        }}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full h-[37px] cursor-pointer select-none"
        >
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" style={{ color: greenColor }} />
            <span
              className="text-[15px] font-normal"
              style={{ color: greenColor }}
            >
              مهمان
            </span>
          </div>
          <FilledTriangle direction={open ? "up" : "down"} className="w-3 h-2" />
        </div>

        {open && (
          <>
            <hr
              className="my-1"
              style={{
                width: "84px",
                borderColor: greenColor,
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderRadius: "1px",
              }}
            />
            <div
              className="flex items-center gap-1 w-full h-[37px] cursor-pointer rounded-b-[20px] select-none"
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

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 relative bg-white p-6">
        <Header />
        <main className="mt-20">{children}</main>
      </div>
    </div>
  );
}
