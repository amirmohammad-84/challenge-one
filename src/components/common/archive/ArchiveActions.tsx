import { useState, useEffect, type FC } from "react"
import wordIcon from "../../../assets/word.svg"
import copyIcon from "../../../assets/copy.svg"
import trashIcon from "../../../assets/trash.svg"
import downloadIcon from "../../../assets/download.svg"

type Props = {
  size: string
  textToHandle: string
  onDelete: () => void
}

const ArchiveActions: FC<Props> = ({ size, textToHandle, onDelete }) => {
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(textToHandle)
      setCopied(true)
    } catch { /* empty */ }
  }

  const downloadTxt = () => {
    const blob = new Blob([textToHandle], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadWord = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Document</title></head>
      <body>${textToHandle.replace(/\n/g, "<br>")}</body></html>
    `
    const blob = new Blob([htmlContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.doc"
    a.click()
    URL.revokeObjectURL(url)
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const confirmDelete = () => {
    onDelete()
    closeModal()
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <div
          title={`حجم فایل: ${size}`}
          onClick={downloadTxt}
          className="p-[6px] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 hover:brightness-90 group transition"
        >
          <img
            src={downloadIcon}
            alt="download"
            width={16}
            height={16}
            className="transition duration-200"
          />
        </div>
        <div
          title="word"
          onClick={downloadWord}
          className="p-[6px] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 hover:brightness-90 group transition"
        >
          <img
            src={wordIcon}
            alt="word"
            width={16}
            height={16}
            className="transition duration-200"
          />
        </div>
        <div
          title={copied ? "کپی شد" : "copy"}
          onClick={copyText}
          className={`p-[6px] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 hover:brightness-90 group transition ${
            copied ? "bg-green-200" : ""
          }`}
        >
          <img
            src={copyIcon}
            alt="copy"
            width={16}
            height={16}
            className="transition duration-200"
          />
        </div>
        <div
          title="حذف"
          onClick={openModal}
          className="p-[6px] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-500 hover:brightness-90 group group-hover:brightness-0 group-hover:invert transition"
        >
          <img
            src={trashIcon}
            alt="trash"
            width={16}
            height={16}
            className="transition duration-200"
          />
        </div>
      </div>

      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "transparent" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-[6px] bg-white rounded-lg p-5 w-[320px] text-center shadow-xl animate-fadeIn"
            style={{ animationDuration: "0.25s", animationTimingFunction: "ease-out" }}
          >
            <p className="mb-6 text-gray-800">آیا از حذف این مورد مطمئن هستید؟</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                حذف
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ArchiveActions
