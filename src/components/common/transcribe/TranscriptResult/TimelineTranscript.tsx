type Segment = {
  start: number | string
  end: number | string
  text: string
}

type Props = {
  segments: Segment[]
}

export default function TimelineTranscript({ segments }: Props) {
  return (
    <div className="w-full max-h-[270px] border border-gray-300 rounded-md overflow-hidden">
      <div className="overflow-y-auto max-h-[270px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white border-b border-gray-300">
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 w-24">زمان شروع</th>
              <th className="text-left px-4 py-2 w-24">زمان پایان</th>
              <th className="text-right px-4 py-2">متن</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((seg, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "" : "bg-gray-200"}`}>
                <td className="px-4 py-2">
                  <div className="rounded-[10px]">{seg.start}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="rounded-[10px]">{seg.end}</div>
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="rounded-[10px]">{seg.text}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
