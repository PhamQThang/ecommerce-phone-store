import NewsCard from "@/components/client/news/NewsCard";
import newsData from "@/data/_news";

export default function NewsListPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Danh sách tin tức</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <NewsCard key={news.id.toString()} news={{ ...news, id: news.id.toString() }} />
        ))}
      </div>
    </div>
  );
}