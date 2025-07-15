import { useEffect, type JSX } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MicrophoneIcon,
  ArrowUpTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import TranscriberCard from "./TranscriberCard";
import Footer from "./Footer";

type Tab = {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string;
  content: JSX.Element;
};

export default function CardsTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // تب‌های تعریف شده
  const tabs: Tab[] = [
    {
      id: "record",
      label: "ضبط گفتار",
      icon: <MicrophoneIcon className="w-5 h-5" />,
      color: "#00BA9F",
      content: (
        <TranscriberCard
          icon={<MicrophoneIcon style={{ width: 32.72, height: 32.72 }} />}
          buttonColor="#00BA9F"
          borderColor="#00BA9F"
          roundedTopRight={false}
          description={
            <>
              برای شروع به صحبت، دکمه را فشار دهید
              <br />
              متن پیاده شده آن، در اینجا ظاهر شود
            </>
          }
        />
      ),
    },
    {
      id: "upload",
      label: "بارگذاری فایل",
      icon: <ArrowUpTrayIcon className="w-5 h-5" />,
      color: "#118AD3",
      content: (
        <TranscriberCard
          icon={<ArrowUpTrayIcon style={{ width: 32, height: 32 }} />}
          buttonColor="#118AD3"
          borderColor="#118AD3"
          description={
            <>
              برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
              <br />
              متن پیاده شده آن، در اینجا ظاهر می شود
            </>
          }
        />
      ),
    },
    {
      id: "link",
      label: "لینک",
      icon: <LinkIcon className="w-5 h-5" />,
      color: "#FF1654",
      content: (
        <TranscriberCard
          icon={<LinkIcon style={{ width: 16, height: 16 }} />}
          buttonColor="#FF1654"
          borderColor="#FF1654"
          showButton={false}
          description={
            <>
              نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
              <br />
              و دکمه را فشار دهید
            </>
          }
          input={
            <div className="flex items-center flex-row-reverse gap-3 w-[328px] border border-[#FF1654] rounded-[50px] px-4 py-2">
              <div className="w-[30px] h-[30px] bg-[#FF1654] rounded-full flex items-center justify-center ltr">
                <LinkIcon className="w-4 h-4 text-white" />
              </div>
              <input
                type="text"
                placeholder="example.com/sample.mp3"
                className="flex-1 outline-none text-left text-[14px] placeholder:text-gray-400"
              />
            </div>
          }
        />
      ),
    },
  ];

  // مقدار تب فعال از کوئری پارامتر می‌گیریم
  const tabFromQuery = searchParams.get("tab");

  // اگر مقدار معتبر بود از اون استفاده کن، وگرنه مقدار پیش‌فرض "record"
  const activeTab = tabs.some((tab) => tab.id === tabFromQuery)
    ? tabFromQuery!
    : "record";

  // وقتی تب تغییر کرد، کوئری پارامتر رو هم آپدیت می‌کنیم
  function handleTabClick(tabId: string) {
    setSearchParams({ tab: tabId });
  }

  // همزمان با mount کامپوننت اگه tab پارامتر نداشتیم، بهش مقدار پیشفرض میدیم تو URL (optional)
  useEffect(() => {
    if (!tabFromQuery) {
      setSearchParams({ tab: "record" });
    }
  }, [tabFromQuery, setSearchParams]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white mt-1 flex flex-col items-start w-full max-w-3xl">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-36 h-12 text-base font-normal rounded-t-xl flex items-center justify-center gap-2 ${
                activeTab === tab.id ? `text-white` : "text-black"
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? tab.color : undefined,
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full flex justify-center">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>

      <div className="mt-3.5 w-full flex justify-center">
        <div className="w-full max-w-3xl flex justify-end">
          <Footer />
        </div>
      </div>
    </div>
  );
}
