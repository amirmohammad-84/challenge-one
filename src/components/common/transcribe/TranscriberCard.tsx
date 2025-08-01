import type { ReactNode } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
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
  onUploadClick?: () => void;
};

export default function TranscriberCard({
  theme,
  description,
  input,
  showButton = true,
  roundedTopRight = true,
  onClearText,
  onSend,
  onUploadClick,
}: Props) {
  const [mode, setMode] = useState<
    "initial" | "recording" | "paused" | "stopped"
  >("initial");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const stream = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stream.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = useCallback(async () => {
    if (mode !== "initial") return;
    onClearText?.();
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const recorder = new MediaRecorder(newStream);
      stream.current = newStream;
      mediaRecorder.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setMode("stopped");
        newStream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMode("recording");
    } catch { /* empty */ }
  }, [mode, onClearText]);

  const pauseResumeRecording = useCallback(() => {
    if (!mediaRecorder.current) return;
    if (mode === "recording") {
      mediaRecorder.current.pause();
      setMode("paused");
    } else if (mode === "paused") {
      mediaRecorder.current.resume();
      setMode("recording");
    }
  }, [mode]);

  const stopRecording = useCallback(() => {
    if ((mode === "recording" || mode === "paused") && mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  }, [mode]);

  const reset = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setMode("initial");
  }, [audioUrl]);

  return (
    <div
      className={`relative w-3xl h-[429px] bg-white flex flex-col items-center justify-center gap-6 border-2 rounded-[25px] ${
        roundedTopRight ? "" : "rounded-tr-none"
      }`}
      style={{ borderColor: theme.color }}
    >
      {input}

      {mode === "initial" && showButton && !onUploadClick && (
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

      {mode === "initial" && showButton && onUploadClick && (
        <button
          onClick={onUploadClick}
          className="w-16 h-16 rounded-full text-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: theme.color }}
          aria-label="بارگذاری فایل"
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
              <PaperAirplaneIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      <p className="text-base font-light text-center leading-6 text-[#000] px-8">
        {description}
      </p>
    </div>
  );
}
