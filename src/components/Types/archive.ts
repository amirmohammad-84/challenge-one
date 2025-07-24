type Segment = {
  start: number
  end: number
  text: string
}

export type FileItem = {
  segments?: Segment[]
  transcript: string
  audioUrl: string
  id: string
  name: string
  type: string
  date: string
  duration: string
  icon: "link" | "mic" | "cloud"
  size: string
}
