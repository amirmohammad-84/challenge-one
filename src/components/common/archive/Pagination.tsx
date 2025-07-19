import React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  startIndex: number
  endIndex: number
  total: number
  getPageNumbers: () => (number | string)[]
}

const toPersianNumber = (num: number | string) =>
  String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  getPageNumbers,
}) => (
  <div className="mt-10 flex flex-col items-center justify-center space-y-4">
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`p-1.5 rounded-full ${
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
        }`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="flex items-center justify-center">
        {getPageNumbers().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === "..." ? (
              <span className="px-2 py-1 text-gray-500 select-none">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-white`}
                style={{
                  backgroundColor:
                    currentPage === page
                      ? "rgba(0, 186, 159, 1)"
                      : "rgba(0, 186, 159, 0.5)",
                }}
              >
                {toPersianNumber(page)}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`p-1.5 rounded-full ${
          currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
)

export default Pagination
