import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { listRequests } from "../../../api/callApi"
import type { FileItem } from "../../Types/archive"

type ApiResultItem = {
  id: string
  url: string
  duration: number
  processed: boolean
  segments: { start: number; end: number; text: string }[]
  size?: number
  transcript?: string
}


interface ArchiveState {
  files: FileItem[]
  currentPage: number
  queryString?: string
  loading: boolean
}

const initialState: ArchiveState = {
  files: [],
  currentPage: 1,
  queryString: undefined,
  loading: false,
}

export const fetchFiles = createAsyncThunk("archive/fetchFiles", async (queryString?: string) => {
  const data = await listRequests(queryString)
  if (data && Array.isArray(data.results)) {
    return data.results.map((item: ApiResultItem): FileItem => {
      let iconType: "mic" | "cloud" | "link" = "cloud"
      if (item.url.includes("record")) iconType = "mic"
      else if (item.url.includes("upload")) iconType = "cloud"
      else if (item.url.includes("link")) iconType = "link"

      const fileName = item.url.split("/").pop() || "Unknown"
      const ext = fileName.split(".").pop() || "unknown"
      const dateStr = new Date().toLocaleDateString()

      return {
        id: item.id,
        name: fileName,
        url: item.url,
        audioUrl: item.url,
        fileType: ext,
        duration: item.duration,
        uploadDate: new Date().toISOString(),
        size: (item.size ?? 0).toString(),
        transcript: item.transcript ?? "",
        segments: item.segments ?? [],
        icon: iconType,
        // processed: item.processed,
        date: dateStr,
        type: ext,
      }
    })
  } else {
    return []
  }
})

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    removeFile(state, action: PayloadAction<string>) {
      state.files = state.files.filter((f) => f.id !== action.payload)
      if (state.currentPage > 1 && state.files.length <= (state.currentPage - 1) * 10) {
        state.currentPage -= 1
      }
    },
    setPageAndQuery(state, action: PayloadAction<{ page: number; query: string }>) {
      state.currentPage = action.payload.page
      state.queryString = action.payload.query
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<FileItem[]>) => {
        state.files = action.payload
        state.loading = false
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { removeFile, setPageAndQuery } = archiveSlice.actions
export default archiveSlice.reducer