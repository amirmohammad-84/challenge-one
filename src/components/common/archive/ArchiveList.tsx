import ArchiveTable from "./ArchiveTable"
import Pagination from "./Pagination"
import type { FileItem } from "../../Types/archive"
import { useState, useMemo } from "react"

const initialFiles: FileItem[] = [
  {
    id: "1",
    name: "khaterate To",
    type: "mp4",
    date: "۱۴۰۲/۰۷/۱۲",
    duration: "۴:۳۸",
    icon: "link",
    size: "۳٫۱ مگابایت",
    transcript: "متن ترنسکرایب یا توضیح فایل ۱",
    audioUrl: "/audios/sample1.mp3",
  },
  {
    id: "2",
    name: "پادکست سروش",
    type: "mp3",
    date: "۱۴۰۲/۰۳/۲۱",
    duration: "۱۸:۱۸",
    icon: "mic",
    size: "۳٫۱۸ مگابایت",
    transcript: "متن ترنسکرایب یا توضیح فایل ۲",
    audioUrl: "/audios/sample2.mp3",
  },
  {
    id: "3",
    name: "Sirvan Khosravi",
    type: "wav",
    date: "۱۴۰۲/۰۲/۱۹",
    duration: "۵:۱۲",
    icon: "cloud",
    size: "۲٫۹ مگابایت",
    transcript: "متن ترنسکرایب یا توضیح فایل ۳",
    audioUrl: "/audios/sample3.mp3",
  },
]

export default function ArchiveList() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const totalPages = Math.ceil(files.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, files.length)

  const paginatedFiles = useMemo(
    () => files.slice(startIndex, endIndex),
    [files, startIndex, endIndex]
  )

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
          range.push("...")
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
    </div>
  )
}
