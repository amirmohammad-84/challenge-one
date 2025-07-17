import { useState, useRef } from "react"
import SimpleTranscript from "./SimpleTranscript"
import TimelineTranscript from "./TimelineTranscript"
import AudioPlayer from "./AudioPlayer"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { Bars3Icon, ClockIcon } from "@heroicons/react/24/outline"

type Props = {
  type: "simple" | "timeline"
  tab: "record" | "upload" | "link"
  audioUrl?: string
  text: string
  onReset: () => void
  onChangeType?: (type: "simple" | "timeline") => void
}

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 300)
  }

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className="absolute z-50 bottom-full mb-2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap select-none pointer-events-none"
          style={{ left: "50%", transform: "translateX(-50%)", userSelect: "none" }}
        >
          {text}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              marginLeft: -5,
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function TranscriptResult({ type, tab, audioUrl, text, onReset, onChangeType }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const borderColor = {
    record: "#00BA9F",
    upload: "#118AD3",
    link: "#FF1654",
  }[tab]

  return (
    <div
      className="w-full max-w-3xl bg-white p-4 flex flex-col justify-between"
      style={{
        height: 429,
        minHeight: 429,
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
        borderTopRightRadius: tab === "record" ? 0 : "16px",
      }}
    >
      <div className="flex justify-between items-center px-2 pb-5" style={{ borderBottom: "0.25px solid rgba(0, 0, 0, 0.5)" }}>
        <div className="flex items-center gap-6 relative">
          {(["simple", "timeline"] as const).map((t) => {
            const active = type === t
            return (
              <button
                key={t}
                className="text-sm font-semibold text-gray-700 flex items-center gap-1 relative pb-1"
                type="button"
                aria-pressed={active}
                onClick={() => onChangeType?.(t)}
              >
                {t === "simple" ? (
                  <>
                    <Bars3Icon className="w-5 h-5" />
                    متن ساده
                  </>
                ) : (
                  <>
                    <ClockIcon className="w-5 h-5" />
                    متن زمان‌بندی شده
                  </>
                )}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: "1px", backgroundColor: "rgba(0,0,0,1)" }}
                  />
                )}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-4">
          <Tooltip text={copied ? "کپی شد!" : "کپی"}>
            <button
              onClick={copyToClipboard}
              className="flex items-center p-1 rounded hover:bg-gray-100"
              aria-label="کپی"
              type="button"
            >
              <img src="/src/assets/copy.svg" className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip text="دانلود">
            <button
              onClick={downloadText}
              className="flex items-center p-1 rounded hover:bg-gray-100"
              aria-label="دانلود"
              type="button"
            >
              <img src="/src/assets/download.svg" className="w-5 h-5" />
            </button>
          </Tooltip>
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-white px-3 py-1"
            style={{
              backgroundColor: "rgba(17, 138, 211, 1)",
              borderColor: "rgba(17, 138, 211, 1)",
              borderRadius: "20px",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            type="button"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>شروع مجدد</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div className="px-2 overflow-y-auto pt-4" style={{ maxHeight: 429 - 80 - 52 }}>
          {type === "simple" ? (
            <SimpleTranscript text={text} />
          ) : (
            <TimelineTranscript text={text} />
          )}
        </div>

        {audioUrl && (
          <div className="mt-2">
            <AudioPlayer url={audioUrl} />
          </div>
        )}
      </div>
    </div>
  )
}
