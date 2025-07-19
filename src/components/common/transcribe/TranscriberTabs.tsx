import { useState, useMemo, useEffect, useRef } from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";

import TabButton from "./TabButton";
import TranscriberCard from "./TranscriberCard";
import { TranscriberInput } from "./TranscriberInput";
import type { TabConfig } from "../../Types/transcriber";
import Footer from "../Footer";
import TranscriptResult from "./TranscriptResult/TranscriptResult";

import micIcon from "../../../assets/mic2.svg";
import cloudIcon from "../../../assets/cloud.svg";

const rawText = `[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]`;

export default function TranscriberTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab") as
    | "record"
    | "upload"
    | "link"
    | null;

  const [activeTab, setActiveTab] = useState<"record" | "upload" | "link">(
    tabFromQuery ?? "record"
  );

  const [submitted, setSubmitted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery);
      setSubmitted(false);
      setAudioUrl(null);
    }
  }, [tabFromQuery]);

  const handleSend = (blobUrl?: string) => {
    setAudioUrl(blobUrl || null);
    setSubmitted(true);
  };

  const handleTabClick = (tabId: "record" | "upload" | "link") => {
    setActiveTab(tabId);
    setSubmitted(false);
    setAudioUrl(null);
    setSearchParams({ tab: tabId });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleSend(url);
  };

  const tabs: TabConfig[] = [
    {
      id: "record",
      label: "ضبط گفتار",
      icon: <img src={micIcon} alt="mic" className="w-5 h-5" />,
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
      icon: <img src={cloudIcon} alt="cloud" className="w-5 h-5" />,
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
      input: <TranscriberInput color="#FF1654" onSubmit={() => handleSend()} />,
    },
  ];

  const currentTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)!,
    [activeTab]
  );

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
          {submitted ? (
            <TranscriptResult
              type="simple"
              audioUrl={audioUrl ?? undefined}
              text={rawText}
              onReset={() => {
                setSubmitted(false);
                setAudioUrl(null);
              }}
              tab={activeTab}
            />
          ) : (
            <>
              {activeTab === "upload" ? (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <TranscriberCard
                    theme={{
                      color: currentTab.color,
                      icon: currentTab.icon,
                      iconSize: currentTab.iconSize,
                    }}
                    description={currentTab.description}
                    roundedTopRight={currentTab.roundedTopRight}
                    showButton={true}
                    onClearText={() => setSubmitted(false)}
                    onSend={(blobUrl) => handleSend(blobUrl)}
                    onUploadClick={handleUploadClick}
                  />
                </>
              ) : (
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
                  onClearText={() => setSubmitted(false)}
                  onSend={(blobUrl) => handleSend(blobUrl)}
                />
              )}
            </>
          )}
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
