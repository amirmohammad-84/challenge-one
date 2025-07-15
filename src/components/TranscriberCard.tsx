// src/components/TranscriberCard.tsx
import type { ReactNode } from "react";

type TranscriberCardProps = {
  icon: ReactNode;
  buttonColor: string;
  borderColor: string;
  description: ReactNode;
  input?: ReactNode;
  roundedTopRight?: boolean;
  showButton?: boolean;
};

export default function TranscriberCard({
  icon,
  buttonColor,
  borderColor,
  description,
  input,
  roundedTopRight = true,
  showButton = true,
}: TranscriberCardProps) {
  const baseRadius = "rounded-[25px]";
  const customRadius = roundedTopRight ? "" : "rounded-tr-none";

  return (
    <div
      className={`relative w-3xl h-[429px] bg-white flex flex-col items-center justify-center gap-6 border-2 ${baseRadius} ${customRadius}`}
      style={{ borderColor }}
    >
      {input}

      {showButton && (
        <button
          className="w-16 h-16 rounded-full text-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: buttonColor }}
        >
          {icon}
        </button>
      )}

      <p className="text-base font-light text-center leading-6 text-[#000] px-8">
        {description}
      </p>
    </div>
  );
}
