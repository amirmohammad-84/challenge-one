import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Segment = {
  start: number
  end: number
  text: string
}

type TranscriptionState = {
  activeTab: 'record' | 'upload' | 'link'
  audioUrl: string | null
  segments: Segment[] | null
}

const initialState: TranscriptionState = {
  activeTab: 'record',
  audioUrl: null,
  segments: null,
}

const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<'record' | 'upload' | 'link'>) {
      state.activeTab = action.payload
    },
    setAudioUrl(state, action: PayloadAction<string | null>) {
      state.audioUrl = action.payload
    },
    setSegments(state, action: PayloadAction<Segment[] | null>) {
      state.segments = action.payload
    },
    resetTranscription(state) {
      state.audioUrl = null
      state.segments = null
    },
  },
})

export const { setActiveTab, setAudioUrl, setSegments, resetTranscription } = transcriptionSlice.actions
export default transcriptionSlice.reducer
