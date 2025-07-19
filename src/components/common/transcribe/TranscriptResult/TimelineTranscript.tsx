type Props = {
  text: string
}

function parseTimeline(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      const match = line.match(/(.*)\[(\d{2}:\d{2})\]$/)
      if (!match) return null
      return { id: i, content: match[1].trim(), time: match[2] }
    })
    .filter(Boolean) as { id: number; content: string; time: string }[]
}

export default function TimelineTranscript({ text }: Props) {
  const lines = parseTimeline(text)

  return (
    <table className="w-full max-h-72 overflow-y-auto pr-2 text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-300 sticky top-0 bg-white">
          <th className="text-left px-2 py-1 w-20">زمان شروع</th>
          <th className="text-left px-2 py-1 w-20">زمان پایان</th>
          <th className="text-right px-2 py-1">متن</th>
        </tr>
      </thead>
      <tbody className="max-h-72 overflow-y-auto">
        {lines.map((line, i) => (
          <tr key={line.id} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
            <td className="px-2 py-1">{i * 2} ثانیه</td>
            <td className="px-2 py-1">{(i + 1) * 2} ثانیه</td>
            <td className="px-2 py-1 text-right">{line.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
