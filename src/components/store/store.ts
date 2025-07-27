import { configureStore } from '@reduxjs/toolkit'
import transcriptionReducer from './slices/transcriptionSlice'
import archiveReducer from './slices/archiveSlice'

export const store = configureStore({
  reducer: {
    transcription: transcriptionReducer,
    archive: archiveReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
