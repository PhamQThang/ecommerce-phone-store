"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface News {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

export default function NewsCard({ news }: { news: News }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-lg p-0">
      <CardContent className="p-0">
        {/* Cập nhật link để trỏ đến /newsPage/[id] */}
        <Link href={`/client/newsPage/news/${news.id}`}>
          <div className="relative w-full h-48 cursor-pointer">
            <Image
              src={news.image}
              alt={news.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </Link>
        <div className="p-4">
          <p className="text-sm text-gray-500">{news.date}</p>
          <h3 className="text-lg font-semibold my-2">{news.title}</h3>
          <p className="text-sm text-gray-700">{news.description}</p>
          {/* Cập nhật link "Đọc thêm" để trỏ đến /newsPage/[id] */}
          <Link href={`/client/newsPage/news/${news.id}`} className="text-blue-500 hover:underline mt-3 block">
            Đọc thêm →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}