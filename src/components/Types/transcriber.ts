import type { ReactNode } from "react";

export type TabId = "record" | "upload" | "link";

export type TabConfig = {
  id: TabId;
  label: string;
  icon: ReactNode;
  color: string;
  iconSize?: number;
  description: ReactNode;
  input?: ReactNode;
  showButton?: boolean;
  roundedTopRight?: boolean;
};
