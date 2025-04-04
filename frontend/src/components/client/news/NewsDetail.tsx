import Image from "next/image";
import Link from "next/link";

interface NewsDetailProps {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ title, description, image, date }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">{date}</p>
      <div className="relative w-full h-auto mb-6 flex justify-center">
        <Image 
          src={image} 
          alt={title} 
          layout="intrinsic" 
          className="rounded-lg object-cover" 
          width={800} 
          height={500} 
        />
      </div>
      <p className="text-lg text-gray-700">{description}</p>
      <Link href="/newsPage" className="text-blue-500 hover:underline mt-6 block">
        ← Quay lại danh sách tin tức
      </Link>
    </div>
  );
};

export default NewsDetail;
