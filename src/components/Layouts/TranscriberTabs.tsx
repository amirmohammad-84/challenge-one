/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MicrophoneIcon,
  ArrowUpTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";

import TabButton from "../common/transcribe/TabButton";
import TranscriberCard from "../common/transcribe/TranscriberCard";
import { TranscriberInput } from "../common/transcribe/TranscriberInput";
import type { TabConfig } from "../Types/transcriber";
import Footer from "../common/Footer";

const tabs: TabConfig[] = [
  {
    id: "record",
    label: "ضبط گفتار",
    icon: <MicrophoneIcon className="w-5 h-5" />,
    color: "#00BA9F",
    iconSize: 32,
    roundedTopRight: false,
    description: (
      <>
        برای شروع به صحبت، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر شود
      </>
    ),
  },
  {
    id: "upload",
    label: "بارگذاری فایل",
    icon: <ArrowUpTrayIcon className="w-5 h-5" />,
    color: "#118AD3",
    iconSize: 32,
    description: (
      <>
        برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر می شود
      </>
    ),
  },
  {
    id: "link",
    label: "لینک",
    icon: <LinkIcon className="w-5 h-5" />,
    color: "#FF1654",
    iconSize: 16,
    showButton: false,
    description: (
      <>
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
        <br />
        و دکمه را فشار دهید
      </>
    ),
    input: <TranscriberInput color="#FF1654" />,
  },
];

export default function TranscriberTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialTab = searchParams.get("tab");
  const validTab = tabs.find((tab) => tab.id === initialTab)?.id || "record";

  const [activeTab, setActiveTab] = useState<string>(validTab);

  useEffect(() => {
    if (validTab !== activeTab) {
      setActiveTab(validTab);
    }
  }, [validTab]);

  const handleTabClick = useCallback((tabId: string) => {
    navigate(`/?tab=${tabId}`, { replace: true });
    setActiveTab(tabId);
  }, [navigate]);

  const currentTab = useMemo(() => tabs.find((tab) => tab.id === activeTab)!, [activeTab]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white mt-1 flex flex-col items-start w-full max-w-3xl">
        <div className="flex">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              icon={tab.icon}
              label={tab.label}
              activeColor={tab.color}
            />
          ))}
        </div>

        <div className="w-full flex justify-center">
          <TranscriberCard
            theme={{
              color: currentTab.color,
              icon: currentTab.icon,
              iconSize: currentTab.iconSize,
            }}
            description={currentTab.description}
            input={currentTab.input}
            roundedTopRight={currentTab.roundedTopRight}
            showButton={currentTab.showButton}
          />
        </div>
      </div>

      <div className="mt-3.5 w-full flex justify-center">
        <div className="w-full max-w-3xl flex justify-end">
          <Footer />
        </div>
      </div>
    </div>
  );
}
