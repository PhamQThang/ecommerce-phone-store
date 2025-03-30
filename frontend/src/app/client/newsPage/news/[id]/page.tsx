import NewsDetail from "@/components/client/news/NewsDetail";
import newsData from "@/data/_news";

interface NewsPageProps {
  params: { id: string };
}

const NewsPage: React.FC<NewsPageProps> = ({ params }) => {
  const newsItem = newsData.find((news) => news.id === Number(params.id));

  if (!newsItem) {
    return <p className="text-center text-red-500">Bài viết không tồn tại!</p>;
  }

  return <NewsDetail {...newsItem} />;
};

export default NewsPage;
