import { LinkIcon } from "@heroicons/react/24/solid";

type Props = {
  color: string;
};

export function TranscriberInput({ color }: Props) {
  return (
    <div
      className="flex items-center flex-row-reverse gap-3 w-[328px] border rounded-[50px] px-4 py-2"
      style={{ borderColor: color }}
    >
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <LinkIcon className="w-4 h-4 text-white" />
      </div>
      <input
        type="text"
        placeholder="example.com/sample.mp3"
        className="flex-1 outline-none text-left text-[14px] placeholder:text-gray-400"
      />
    </div>
  );
}
