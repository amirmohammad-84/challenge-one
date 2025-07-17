import { useState } from "react"
import SimpleTranscript from "../transcribe/TranscriptResult/SimpleTranscript"
import TimelineTranscript from "../transcribe/TranscriptResult/TimelineTranscript"
import AudioPlayer from "../transcribe/TranscriptResult/AudioPlayer"
import { Bars3Icon, ClockIcon } from "@heroicons/react/24/outline"

type Props = {
  tab: "record" | "upload" | "link"
  text: string
  audioUrl?: string
}

const transcriptTypes = [
  { type: "simple", label: "متن ساده", Icon: Bars3Icon },
  { type: "timeline", label: "متن زمان‌بندی شده", Icon: ClockIcon },
] as const

export default function ArchiveExpandedRow({ text, audioUrl }: Props) {
  const [type, setType] = useState<"simple" | "timeline">("simple")

  return (
    <div
      className="w-full bg-white px-4 py-4 mt-2 rounded-[10px]"
      style={{ height: 371 }}
    >
      <div
        className="flex justify-between items-center px-2 pb-3"
        style={{ borderBottom: "0.25px solid rgba(0,0,0,0.5)" }}
      >
        <div className="flex items-center gap-6 relative">
          {transcriptTypes.map(({ type: t, label, Icon }) => {
            const active = type === t
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setType(t)}
                className="text-sm font-semibold text-gray-700 flex items-center gap-1 relative pb-1"
              >
                <Icon className="w-5 h-5" />
                {label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-64px)]">
        <div className="px-2 overflow-y-auto pt-3" style={{ maxHeight: 239 }}>
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
