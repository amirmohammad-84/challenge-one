import ArchiveList from "../components/common/archive/ArchiveList";

export default function Archive() {
  return (
    <div className="max-w-[1034px] mx-auto px-4">
      <h1 className="text-xl font-bold text-[rgba(0,186,159,1)] mt-20 mb-6 pr-12">
        آرشیو من
      </h1>
      <ArchiveList />
    </div>
  );
}
