import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Dữ liệu mẫu cho bài viết
const newsData = [
  {
    id: 1,
    title: "Xu hướng thương mại điện tử năm 2025",
    description:
      "Tìm hiểu về các xu hướng nổi bật trong ngành thương mại điện tử sắp tới.",
    image: "/images/gaixinh.png",
    date: "28 Tháng 3, 2025",
    link: "/tin-tuc/xu-huong-thuong-mai-dien-tu-2025",
  },
  {
    id: 2,
    title: "Làm sao để tối ưu SEO cho cửa hàng online?",
    description:
      "Những mẹo giúp bạn đưa trang web lên top tìm kiếm nhanh chóng.",
    image: "/images/gaixinh.png",
    date: "25 Tháng 3, 2025",
    link: "/tin-tuc/toi-uu-seo-cua-hang-online",
  },
  {
    id: 3,
    title: "Cách xây dựng thương hiệu bền vững",
    description: "Học hỏi cách tạo dựng thương hiệu mạnh mẽ và lâu dài.",
    image: "/images/gaixinh.png",
    date: "20 Tháng 3, 2025",
    link: "/tin-tuc/xay-dung-thuong-hieu-ben-vung",
  },
  {
    id: 4,
    title: "Cách xây dựng thương hiệu bền vững",
    description: "Học hỏi cách tạo dựng thương hiệu mạnh mẽ và lâu dài.",
    image: "/images/gaixinh.png",
    date: "20 Tháng 3, 2025",
    link: "/tin-tuc/xay-dung-thuong-hieu-ben-vung",
  },
];

export default function NewsSection() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Tin Tức & Blog</h2>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {newsData.map((news) => (
          <Card
            key={news.id}
            className="hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-lg p-0"
          >
            <CardContent className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{news.date}</p>
                <h3 className="text-lg font-semibold my-2">{news.title}</h3>
                <p className="text-sm text-gray-700">{news.description}</p>
                <Link
                  href={news.link}
                  className="text-blue-500 hover:underline mt-3 block"
                >
                  Đọc thêm →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
