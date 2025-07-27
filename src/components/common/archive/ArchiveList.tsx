import ArchiveTable from "./ArchiveTable"
import Pagination from "./Pagination"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import { fetchFiles, removeFile, setPageAndQuery } from "../../store/slices/archiveSlice"

export default function ArchiveList() {
  const dispatch = useDispatch<AppDispatch>()
  const { files, loading, currentPage, queryString } = useSelector((state: RootState) => state.archive)

  useEffect(() => {
    dispatch(fetchFiles(queryString))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString])

  const handlePageChange = (page: number, query: string) => {
    dispatch(setPageAndQuery({ page, query }))
  }

  const handleRemove = (id: string) => {
    dispatch(removeFile(id))
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
