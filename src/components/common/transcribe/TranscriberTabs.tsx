import { useState, useMemo, useEffect, useRef } from "react"
import {
  MicrophoneIcon,
  ArrowUpTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/solid"
import { useSearchParams } from "react-router-dom"

import TabButton from "./TabButton"
import TranscriberCard from "./TranscriberCard"
import { TranscriberInput } from "./TranscriberInput"
import type { TabConfig } from "../../Types/transcriber"
import Footer from "../Footer"
import TranscriptResult from "./TranscriptResult/TranscriptResult"
import { transcribeMedia } from "../../../api/callApi"

type Segment = {
  start: number
  end: number
  text: string
}

export default function TranscriberTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromQuery = searchParams.get("tab") as "record" | "upload" | "link" | null

  const [activeTab, setActiveTab] = useState<"record" | "upload" | "link">(
    tabFromQuery ?? "record"
  )

  const [submitted, setSubmitted] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [, setTranscriptText] = useState<string | null>(null)
  const [segments, setSegments] = useState<Segment[] | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const isSendingRef = useRef(false)

  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery)
      setSubmitted(false)
      setAudioUrl(null)
      setTranscriptText(null)
      setSegments(null)
    }
  }, [tabFromQuery])

  const handleSend = async (blobUrl?: string) => {
    if (isSendingRef.current) return
    isSendingRef.current = true

    setAudioUrl(blobUrl || null)
    setSubmitted(true)

    if (blobUrl) {
      try {
        const response = await transcribeMedia(blobUrl)
        const finalText = response?.text || response?.[0]?.text || "نتیجه‌ای یافت نشد"
        const finalSegmentsRaw = response?.segments || response?.[0]?.segments || null

        const finalSegments: Segment[] | null = Array.isArray(finalSegmentsRaw)
          ? (finalSegmentsRaw as Segment[])
          : null

        setTranscriptText(finalText)
        setSegments(finalSegments)
      } catch {
        setTranscriptText("خطا در پردازش فایل.")
        setSegments(null)
      } finally {
        isSendingRef.current = false
      }
    } else {
      isSendingRef.current = false
    }
  }

  const handleTabClick = (tabId: "record" | "upload" | "link") => {
    setActiveTab(tabId)
    setSubmitted(false)
    setAudioUrl(null)
    setTranscriptText(null)
    setSegments(null)
    setSearchParams({ tab: tabId })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    handleSend(url)
  }

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
      input: <TranscriberInput color="#FF1654" onSubmit={(url) => handleSend(url)} />,
    },
  ]

  const currentTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)!,
    [activeTab]
  )

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
              tab={activeTab}
              segments={segments ?? undefined}
              onReset={() => {
                setSubmitted(false)
                setAudioUrl(null)
                setTranscriptText(null)
                setSegments(null)
              }}
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
  )
}
