import { useState, useMemo, useEffect } from "react"
import {
  MicrophoneIcon,
  ArrowUpTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/solid"
import { useSearchParams } from "react-router-dom"

import TabButton from "../common/transcribe/TabButton"
import TranscriberCard from "../common/transcribe/TranscriberCard"
import { TranscriberInput } from "../common/transcribe/TranscriberInput"
import type { TabConfig } from "../Types/transcriber"
import Footer from "../common/Footer"
import TranscriptResult from "../common/transcribe/TranscriptResult/TranscriptResult"

const rawText = `[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]`

export default function TranscriberTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromQuery = searchParams.get("tab") as "record" | "upload" | "link" | null

  // وضعیت تب فعال
  const [activeTab, setActiveTab] = useState<"record" | "upload" | "link">(tabFromQuery ?? "record")

  // آیا کاربر روی ارسال کلیک کرده؟
  const [submitted, setSubmitted] = useState(false)

  // آدرس URL صوت ضبط شده یا آپلود شده
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  // هر بار که query param تغییر می‌کند، تب را آپدیت و حالت ارسال را ریست کن
  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery)
      setSubmitted(false)
      setAudioUrl(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabFromQuery])

  // تابع مدیریت ارسال (صوت یا لینک)
  const handleSend = (blobUrl?: string) => {
    setAudioUrl(blobUrl || null)
    setSubmitted(true)
  }

  // کلیک روی تب (record, upload, link)
  const handleTabClick = (tabId: "record" | "upload" | "link") => {
    setActiveTab(tabId)
    setSubmitted(false)
    setAudioUrl(null)
    setSearchParams({ tab: tabId })
  }

  // تنظیمات تب‌ها
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
      input: (
        <TranscriberInput color="#FF1654" onSubmit={() => handleSend()} />
      ),
    },
  ]

  // تب فعلی
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentTab = useMemo(() => tabs.find((tab) => tab.id === activeTab)!, [activeTab])

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white mt-1 flex flex-col items-start w-full max-w-3xl">
        <div className="flex">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id as "record" | "upload" | "link")}
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
                setSubmitted(false)
                setAudioUrl(null)
              }}
              tab={activeTab}
            />
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
        </div>
      </div>

      <div className="mt-3.5 w-full flex justify-center">
        <div className="w-full max-w-3xl flex justify-end">
          <Footer />
        </div>
      </div>
    </div>
  )
}
