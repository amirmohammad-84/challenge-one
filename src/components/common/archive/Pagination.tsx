import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions: { value: number; label: string }[];
  startIndex: number;
  endIndex: number;
  total: number;
  getPageNumbers: () => (number | string)[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
  startIndex,
  endIndex,
  total,
  getPageNumbers,
}) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 space-y-4 md:space-y-0">
    <div className="flex items-center space-x-2 md:w-auto w-full justify-center">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === "..." ? (
              <span className="px-3 py-1 text-gray-500 select-none">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>

    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 md:w-auto w-full justify-between">
      <div className="flex items-center space-x-2">
        <label
          htmlFor="pageSize"
          className="text-sm text-gray-700 select-none"
        >
          Show:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pageSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-700">
        Showing {startIndex + 1} to {endIndex} of {total} results
      </div>
    </div>
  </div>
);

export default Pagination;
