type Segment = {
  start: number
  end: number
  text: string
}

type Props = {
  segments: Segment[]
}

export default function SimpleTranscript({ segments }: Props) {
  const combinedText = segments.map(s => s.text).join(" ")

  return (
    <div className="w-full text-right text-sm leading-7 px-2 whitespace-pre-wrap">
      {combinedText}
    </div>
  )
}
