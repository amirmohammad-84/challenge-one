import { LinkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

type Props = {
  color: string
  onSubmit: (url: string) => Promise<void>;
}

const audioExtensions = ["mp3", "wav", "aac", "flac", "ogg"]
const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"]

function isValidMediaLink(url: string) {
  try {
    const lowerUrl = url.toLowerCase().trim()
    const ext = lowerUrl.split(".").pop() || ""
    return audioExtensions.includes(ext) || videoExtensions.includes(ext)
  } catch {
    return false
  }
}

export function TranscriberInput({ color, onSubmit }: Props) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = () => {
    if (!isValidMediaLink(inputValue)) return
    onSubmit(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValidMediaLink(inputValue)) {
      handleSubmit()
    }
  }

  return (
    <div
      className="flex items-center flex-row-reverse gap-3 w-[328px] border rounded-[50px] px-4 py-2"
      style={{ borderColor: color }}
    >
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <LinkIcon className="w-5 h-5 text-white" />
      </div>
      <input
        type="text"
        placeholder="example.com/sample.mp3"
        className="flex-1 outline-none text-left text-[14px] placeholder:text-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {isValidMediaLink(inputValue) && (
        <button
          onClick={handleSubmit}
          aria-label="Submit link"
          type="button"
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: `${color}88` }}
        >
          <PaperAirplaneIcon className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}
