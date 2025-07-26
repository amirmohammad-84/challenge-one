import React, { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { listRequests } from "../../../api/callApi"

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number, query: string) => void
}

const toPersianNumber = (num: number | string) =>
  String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1)
  const [nextLink, setNextLink] = useState<string | null>(null)
  const [prevLink, setPrevLink] = useState<string | null>(null)
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([])

  useEffect(() => {
    async function fetchPageMeta() {
      const query = currentPage > 1 ? `page=${currentPage}` : undefined
      const data = await listRequests(query)

      if (data?.count) {
        const total = Math.ceil(data.count / 10)
        setTotalPages(total)

        const delta = 2
        const range: (number | string)[] = []
        let l = -1

        for (let i = 1; i <= total; i++) {
          if (
            i === 1 ||
            i === total ||
            (i >= currentPage - delta && i <= currentPage + delta)
          ) {
            if (l !== -1 && i - l > 1) {
              range.push("…")
            }
            range.push(i)
            l = i
          }
        }

        setPageNumbers(range)
        setNextLink(data.next)
        setPrevLink(data.previous)
      }
    }

    fetchPageMeta()
  }, [currentPage])

  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <button
          onClick={() => {
            if (prevLink) onPageChange(currentPage - 1, prevLink)
          }}
          disabled={!prevLink}
          className={`p-1.5 rounded-full ${
            !prevLink ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
          }`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center">
          {pageNumbers.map((page, idx) => (
            <React.Fragment key={idx}>
              {page === "…" ? (
                <span className="px-2 py-1 text-gray-500 select-none">…</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number, `page=${page}`)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                    currentPage === page ? "text-white" : "text-black"
                  }`}
                  style={{
                    backgroundColor: currentPage === page ? "rgba(0, 186, 159, 1)" : "",
                  }}
                >
                  {toPersianNumber(page)}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => {
            if (nextLink) onPageChange(currentPage + 1, nextLink)
          }}
          disabled={!nextLink}
          className={`p-1.5 rounded-full ${
            !nextLink ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
