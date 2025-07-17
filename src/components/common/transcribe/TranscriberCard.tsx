import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import {
  PauseIcon,
  StopIcon,
  TrashIcon,
  PlayIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

type Props = {
  theme: {
    icon: ReactNode;
    color: string;
    iconSize?: number;
  };
  description: ReactNode;
  input?: ReactNode;
  showButton?: boolean;
  roundedTopRight?: boolean;
  onClearText?: () => void;
  onSend?: (blobUrl?: string) => void;
};

export default function TranscriberCard({
  theme,
  description,
  input,
  showButton = true,
  roundedTopRight = true,
  onClearText,
  onSend,
}: Props) {
  const [mode, setMode] = useState<"initial" | "recording" | "paused" | "stopped">("initial");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const stream = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    if (mode !== "initial") return;
    if (onClearText) onClearText();
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream.current);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setMode("stopped");
        stream.current?.getTracks().forEach((track) => track.stop());
      };
      mediaRecorder.current.start();
      setMode("recording");
    } catch { /* empty */ }
  };

  const pauseResumeRecording = () => {
    if (!mediaRecorder.current) return;
    if (mode === "recording") {
      mediaRecorder.current.pause();
      setMode("paused");
    } else if (mode === "paused") {
      mediaRecorder.current.resume();
      setMode("recording");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    if (mode === "recording" || mode === "paused") {
      mediaRecorder.current.stop();
    }
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setMode("initial");
  };

  return (
    <div
      className={`relative w-3xl h-[429px] bg-white flex flex-col items-center justify-center gap-6 border-2 rounded-[25px] ${
        roundedTopRight ? "" : "rounded-tr-none"
      }`}
      style={{ borderColor: theme.color }}
    >
      {input}

      {mode === "initial" && showButton && (
        <button
          onClick={startRecording}
          className="w-16 h-16 rounded-full text-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: theme.color }}
          aria-label="شروع ضبط"
          type="button"
        >
          {theme.icon}
        </button>
      )}

      {(mode === "recording" || mode === "paused") && (
        <div className="flex gap-6 items-center">
          <button
            onClick={pauseResumeRecording}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{ width: 48, height: 48, backgroundColor: "#FACC15" }}
            aria-label={mode === "recording" ? "مکث ضبط" : "ادامه ضبط"}
            type="button"
          >
            {mode === "recording" ? (
              <PauseIcon className="w-6 h-6 text-gray-900" />
            ) : (
              <PlayIcon className="w-6 h-6 text-gray-900" />
            )}
          </button>

          <button
            onClick={stopRecording}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{ width: 56, height: 56, backgroundColor: "#22C55E" }}
            aria-label="توقف کامل ضبط"
            type="button"
          >
            <StopIcon className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={reset}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{ width: 48, height: 48, backgroundColor: "#EF4444" }}
            aria-label="حذف ضبط"
            type="button"
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {mode === "stopped" && audioUrl && (
        <div className="flex flex-col items-center gap-4 w-full px-4">
          <audio
            src={audioUrl}
            controls
            className="w-full max-w-md"
            preload="metadata"
          />
          <div className="flex gap-6 justify-center w-full max-w-md">
            <button
              onClick={reset}
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{ width: 56, height: 56, backgroundColor: "#EF4444" }}
              aria-label="حذف ضبط"
              type="button"
            >
              <TrashIcon className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => onSend?.(audioUrl)}
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{ width: 56, height: 56, backgroundColor: theme.color }}
              aria-label="ارسال"
              type="button"
            >
              <PaperAirplaneIcon className="w-6 h-6 text-white rotate-0" />
            </button>
          </div>
        </div>
      )}

      <p className="text-base font-light text-center leading-6 text-[#000] px-8">{description}</p>
    </div>
  );
}
