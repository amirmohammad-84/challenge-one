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
  },
  {
    id: "2",
    name: "پادکست سروش",
    type: "mp3",
    date: "۱۴۰۲/۰۳/۲۱",
    duration: "۱۸:۱۸",
    icon: "mic",
    size: "۳٫۱۸ مگابایت",
  },
  {
    id: "3",
    name: "Sirvan Khosravi",
    type: "wav",
    date: "۱۴۰۲/۰۲/۱۹",
    duration: "۵:۱۲",
    icon: "cloud",
    size: "۲٫۹ مگابایت",
  },
]

export default function ArchiveList() {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const totalPages = Math.ceil(initialFiles.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, initialFiles.length)

  const paginatedFiles = useMemo(
    () => initialFiles.slice(startIndex, endIndex),
    [startIndex, endIndex]
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

  return (
    <div className="mt-20 px-4 max-w-6xl mx-auto">
      <ArchiveTable files={paginatedFiles} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        total={initialFiles.length}
        getPageNumbers={getPageNumbers}
      />
    </div>
  )
}
