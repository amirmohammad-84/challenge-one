import type { ReactNode } from "react";

type Props = {
  theme: {
    icon: ReactNode;
    color: string;
    iconSize?: number;
  };
  description: ReactNode;
  input?: ReactNode;
  showButton?: boolean;
  roundedTopRight?: boolean;
};

export default function TranscriberCard({
  theme,
  description,
  input,
  showButton = true,
  roundedTopRight = true,
}: Props) {
  const baseRadius = "rounded-[25px]";
  const customRadius = roundedTopRight ? "" : "rounded-tr-none";

  return (
    <div
      className={`relative w-3xl h-[429px] bg-white flex flex-col items-center justify-center gap-6 border-2 ${baseRadius} ${customRadius}`}
      style={{ borderColor: theme.color }}
    >
      {input}

      {showButton && (
        <button
          className="w-16 h-16 rounded-full text-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: theme.color }}
        >
          {theme.icon}
        </button>
      )}

      <p className="text-base font-light text-center leading-6 text-[#000] px-8">
        {description}
      </p>
    </div>
  );
}
