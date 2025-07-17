type Props = {
  text: string
}

export default function SimpleTranscript({ text }: Props) {
  return (
    <div className="w-full text-right text-sm leading-7 px-2 whitespace-pre-wrap">
      {text}
    </div>
  )
}
