import ArchiveTable from "./ArchiveTable"
import Pagination from "./Pagination"
import type { FileItem } from "../../Types/archive"
import { useState, useMemo, useEffect } from "react"

export default function ArchiveList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const pageSize = 8
  const totalPages = Math.ceil(files.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, files.length)

  const paginatedFiles = useMemo(
    () => files.slice(startIndex, endIndex),
    [files, startIndex, endIndex]
  )

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("/api/transcribe")
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setFiles(data)
        } else {
          setFiles([
            {
              id: "mock-1",
              name: "فایل تستی بیس",
              type: "mp3",
              date: "۱۴۰۳/۰۴/۱۰",
              duration: "۳:۴۵",
              icon: "mic",
              size: "۲٫۵ مگابایت",
              transcript: "این یک نمونه‌ی ترنسکرایب شده است.",
              audioUrl: "/audios/sample1.mp3",
            },
          ])
        }
      } catch (error) {
        console.error("خطا در دریافت فایل‌ها:", error)
        setFiles([
          {
            id: "mock-1",
            name: "فایل تستی خطا",
            type: "mp3",
            date: "۱۴۰۳/۰۴/۱۰",
            duration: "۳:۴۵",
            icon: "mic",
            size: "۲٫۵ مگابایت",
            transcript: "این یک نمونه‌ی ترنسکرایب شده است.",
            audioUrl: "/audios/sample1.mp3",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  function getPageNumbers() {
    const delta = 2
    const range: (number | string)[] = []
    let l = -1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        if (l !== -1 && i - l > 1) {
          range.push("…")
        }
        range.push(i)
        l = i
      }
    }
    return range
  }

  function handlePrevious() {
    setCurrentPage((p) => Math.max(p - 1, 1))
  }

  function handleNext() {
    setCurrentPage((p) => Math.min(p + 1, totalPages))
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function handleRemove(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    if (currentPage > 1 && (files.length - 1) <= (currentPage - 1) * pageSize) {
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
          <ArchiveTable files={paginatedFiles} onRemove={handleRemove} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            total={files.length}
            getPageNumbers={getPageNumbers}
          />
        </>
      )}
    </div>
  )
}
