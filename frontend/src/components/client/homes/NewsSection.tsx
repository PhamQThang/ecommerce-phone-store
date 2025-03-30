import newsData from "@/data/_news";
import NewsCard from "@/components/client/news/NewsCard";
export default function NewsSection() {
  return (
    <div className="container w-full mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Tin Tức & Blog</h2>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {newsData.map((news) => (
          <NewsCard key={news.id} news={{ ...news, id: news.id.toString() }} />
        ))}
      </div>
    </div>
  );
}
