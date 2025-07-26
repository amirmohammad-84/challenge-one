import ArchiveTable from "./ArchiveTable"
import Pagination from "./Pagination"
import type { FileItem } from "../../Types/archive"
import { useState, useEffect } from "react"
import { listRequests } from "../../../api/callApi"

type ApiResultItem = {
  id: string
  url: string
  duration: number
  processed: boolean
  segments: {
    start: number
    end: number
    text: string
  }[]
  size?: number
  transcript?: string
}

export default function ArchiveList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [queryString, setQueryString] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true)
      try {
        const data = await listRequests(queryString)
        if (data && Array.isArray(data.results)) {
          const mappedFiles: FileItem[] = data.results.map((item: ApiResultItem) => {
            let iconType: "mic" | "cloud" | "link" = "cloud"
            if (item.url.includes("record")) iconType = "mic"
            else if (item.url.includes("upload")) iconType = "cloud"
            else if (item.url.includes("link")) iconType = "link"

            const urlParts = item.url.split("/")
            const fileName = urlParts[urlParts.length - 1] || "Unknown"
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
              size: item.size ?? 0,
              transcript: item.transcript ?? "",
              segments: item.segments ?? [],
              icon: iconType,
              processed: item.processed,
              date: dateStr,
              type: ext,
            }
          })
          setFiles(mappedFiles)
        }
      } catch (error) {
        console.error("خطا در دریافت فایل‌ها:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [queryString])

  function handlePageChange(page: number, query: string) {
    setCurrentPage(page)
    setQueryString(query)
  }

  function handleRemove(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    if (currentPage > 1 && (files.length - 1) <= (currentPage - 1) * 10) {
      setCurrentPage((p) => p - 1)
    }
  }

  return (
    <div className="mt-20 px-4 max-w-6xl mx-auto">
      {loading ? (
        <div className="text-center py-10 text-gray-500">در حال بارگذاری...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-10 text-gray-500">هیچ آرشیوی موجود نیست.</div>
      ) : (
        <>
          <ArchiveTable files={files} onRemove={handleRemove} />
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
