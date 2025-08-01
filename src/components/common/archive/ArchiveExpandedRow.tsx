import { useState } from "react"
import SimpleTranscript from "../transcribe/TranscriptResult/SimpleTranscript"
import TimelineTranscript from "../transcribe/TranscriptResult/TimelineTranscript"
import AudioPlayer from "../transcribe/TranscriptResult/AudioPlayer"
import { Bars3Icon, ClockIcon } from "@heroicons/react/24/outline"

type Segment = {
  start: number
  end: number
  text: string
}

type Props = {
  tab: "record" | "upload" | "link"
  text: string
  audioUrl?: string
  segments?: Segment[]
}

const transcriptTypes = [
  { type: "simple", label: "متن ساده", Icon: Bars3Icon },
  { type: "timeline", label: "متن زمان‌بندی شده", Icon: ClockIcon },
] as const

export default function ArchiveExpandedRow({
  audioUrl,
  segments = [],
}: Props) {
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
                className={`text-sm font-semibold text-gray-700 flex items-center gap-1 relative pb-1 ${
                  active
                    ? "border-b-0 after:absolute after:-bottom-[12px] after:left-0 after:right-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 after:ease-in-out"
                    : "border-b-0 after:absolute after:-bottom-[12px] after:left-0 after:right-0 after:h-[1px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between h-80">
        <div className="px-2 overflow-y-auto pt-3" style={{ maxHeight: 255 }}>
          {type === "simple" ? (
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
