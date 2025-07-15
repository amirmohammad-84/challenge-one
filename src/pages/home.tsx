import CardsTabs from '../components/CardsTabs';
import '../index.css';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* <Sidebar /> */}
        <div className="flex-1 p-4 lg:p-8 flex flex-col">

            {/* متن بالای کارت‌ها - وسط چین و فاصله از بالا 86 */}
            <div className="mt-12 mb-6 text-center">
                <h1
                    className="text-3xl font-extrabold font-yekan"
                    style={{ color: 'rgba(0, 186, 159, 1)'}}
                >
                    تبدیل گفتار به متن
                </h1>
                <p
                    className="text-lg  font-normal mt-2 max-w-xl mx-auto"
                    style={{ color: 'rgba(150, 150, 150, 1)' }}
                >
                    آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف، <br />
                    زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
                </p>
            </div>

            <CardsTabs />
        </div>
    </div>
  );
}
