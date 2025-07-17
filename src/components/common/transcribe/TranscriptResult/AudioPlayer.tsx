type Props = {
  url: string
}

export default function AudioPlayer({ url }: Props) {
  if (!url) return null
  return (
    <audio
      src={url}
      controls
      className="w-full"
      preload="metadata"
    />
  )
}
