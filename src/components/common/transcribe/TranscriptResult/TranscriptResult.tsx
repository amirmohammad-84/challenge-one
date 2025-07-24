import { useState, useRef, useEffect, useCallback, memo } from "react"
import SimpleTranscript from "./SimpleTranscript"
import TimelineTranscript from "./TimelineTranscript"
import AudioPlayer from "./AudioPlayer"
import { ArrowPathIcon, Bars3Icon, ClockIcon } from "@heroicons/react/24/outline"

type Segment = {
  start: number
  end: number
  text: string
}

type Props = {
  type?: "simple" | "timeline"
  tab: "record" | "upload" | "link"
  audioUrl?: string
  segments?: Segment[]
  onReset: () => void
}

const Tooltip = memo(({ children, text }: { children: React.ReactNode; text: string }) => {
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
        <div className="absolute z-50 bottom-full mb-2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap pointer-events-none left-1/2 -translate-x-1/2 select-none">
          {text}
          <div className="absolute top-full left-1/2 -ml-[5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-[rgba(0,0,0,0.5)]" />
        </div>
      )}
    </div>
  )
})

export default function TranscriptResult({ tab, audioUrl, segments = [], onReset, type: initialType = "simple" }: Props) {
  const [type, setType] = useState<"simple" | "timeline">(initialType)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  const text = segments.map((s) => s.text).join(" ")

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  const downloadText = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
    URL.revokeObjectURL(url)
  }, [text])

  const borderColor = {
    record: "#00BA9F",
    upload: "#118AD3",
    link: "#FF1654",
  }[tab]

  return (
    <div
      className="w-full max-w-3xl bg-white p-4 flex flex-col justify-between rounded-[16px]"
      style={{
        height: 429,
        minHeight: 429,
        border: `1px solid ${borderColor}`,
        borderTopRightRadius: tab === "record" ? 0 : 16,
      }}
    >
      <div className="flex justify-between items-center px-2 pb-3 border-b border-black/50">
        <div className="flex items-center gap-6 relative">
          {(["simple", "timeline"] as const).map((t) => {
            const active = type === t
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setType(t)}
                className={`text-sm font-semibold text-gray-700 flex items-center gap-1 relative pb-1 ${
                  active
                    ? "border-b-0 after:absolute after:-bottom-[17px] after:left-0 after:right-0 after:h-[1px] after:bg-black after:content-[''] after:block after:transition-all after:duration-300"
                    : "after:content-['']"
                }`}
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
              disabled={!text}
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
              disabled={!text}
            >
              <img src="/src/assets/download.svg" className="w-5 h-5" />
            </button>
          </Tooltip>
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-white px-3 py-1 border rounded-full"
            style={{
              backgroundColor: "rgba(17, 138, 211, 1)",
              borderColor: "rgba(17, 138, 211, 1)",
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
          {isLoading ? (
            <p className="text-gray-500 text-center">در حال بارگذاری...</p>
          ) : segments.length === 0 ? (
            <p className="text-gray-500">متنی وجود ندارد</p>
          ) : type === "simple" ? (
            <SimpleTranscript segments={segments} />
          ) : (
            <TimelineTranscript segments={segments} />
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
