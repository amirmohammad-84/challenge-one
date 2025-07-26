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
  duration: number
  icon: "link" | "mic" | "cloud"
  size: string
}
