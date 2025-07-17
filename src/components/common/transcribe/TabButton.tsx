import type { ReactNode } from "react";

type Props = {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  activeColor: string;
};

export default function TabButton({ active, onClick, icon, label, activeColor }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-36 h-12 text-base font-normal rounded-t-xl flex items-center justify-center gap-2 ${
        active ? "text-white" : "text-black"
      }`}
      style={{ backgroundColor: active ? activeColor : undefined }}
    >
      {icon}
      {label}
    </button>
  );
}
