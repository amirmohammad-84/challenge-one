import ArchiveListItem from "./ArchiveListItem";

const files = [
  {
    name: "khaterate To",
    type: "mp4",
    date: "۱۴۰۲/۰۷/۱۲",
    duration: "۴:۳۸",
    icon: "link",
    size: "۳٫۱ مگابایت",
  },
  {
    name: "پادکست سروش",
    type: "mp3",
    date: "۱۴۰۲/۰۳/۲۱",
    duration: "۱۸:۱۸",
    icon: "mic",
    size: "۳٫۱۸ مگابایت",
  },
  {
    name: "Sirvan Khosravi",
    type: "wav",
    date: "۱۴۰۲/۰۲/۱۹",
    duration: "۵:۱۲",
    icon: "cloud",
    size: "۲٫۹ مگابایت",
  },
];

const Pagination = () => {
  const pages = ["<", "۱۳۳", "...", "۱۳۵", "۱۳۶", "۲۵۶", ">"];
  const activePage = "۱۳۳";

  return (
    <div className="flex justify-center gap-2 mt-6">
      {pages.map((page, index) => (
        <button
          key={index}
          className={`w-8 h-8 text-sm flex items-center justify-center rounded-full ${
            page === activePage
              ? "bg-teal-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const ArchiveList = () => {
  return (
    <div className="overflow-x-auto mt-20">
      <table className="min-w-full border-separate border-spacing-y-2 text-right">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="w-1/2 text-right pr-20">نام فایل</th>
            <th className="w-[12.5%] text-center">تاریخ بارگذاری</th>
            <th className="w-[12.5%] text-center">نوع فایل</th>
            <th className="w-[12.5%] text-center">مدت زمان</th>
            <th className="w-[12.5%] text-right"></th>
          </tr>
        </thead>
        <tbody className="mt-14">
          {files.map((file, idx) => (
            <ArchiveListItem key={idx} file={file} />
          ))}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
};

export default ArchiveList;
