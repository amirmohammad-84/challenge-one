import TranscriberTabs from "../components/common/transcribe/TranscriberTabs";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1
        className="text-3xl font-extrabold font-yekan"
        style={{ color: "rgba(0, 186, 159, 1)" }}
      >
        تبدیل گفتار به متن
      </h1>
      <p
        className="text-lg font-normal mt-2"
        style={{ color: "rgba(150, 150, 150, 1)" }}
      >
        آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،
        <br />
        زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
      </p>

      <div className="mt-12">
        <TranscriberTabs />
      </div>
    </div>
  );
}
