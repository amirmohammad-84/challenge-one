type Props = {
  text: string
}

function parseTimeline(text: string) {
  return text.split("\n").map((line, i) => {
    const match = line.match(/(.*)\[(\d{2}:\d{2})\]$/)
    if (!match) return null
    return { id: i, content: match[1].trim(), time: match[2] }
  }).filter(Boolean) as { id: number; content: string; time: string }[]
}

export default function TimelineTranscript({ text }: Props) {
  const lines = parseTimeline(text)

  return (
    <div className="w-full max-h-72 overflow-y-auto pr-2 space-y-4">
      {lines.map((line) => (
        <div key={line.id} className="flex justify-between text-sm">
          <div className="text-gray-800 text-right flex-1">{line.content}</div>
          <div className="text-gray-400 text-left min-w-[48px] text-xs">{line.time}</div>
        </div>
      ))}
    </div>
  )
}
