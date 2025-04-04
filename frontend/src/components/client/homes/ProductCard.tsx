import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  images?: string[]; // Mảng ảnh (có thể undefined)
  category: string;
  title: string;
  newPrice: number;
  oldPrice?: number;
  discountPercentage: number;
  rating: number;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  images = [],
  category,
  title,
  newPrice,
  oldPrice,
  discountPercentage,
  rating,
}) => {
  const isValidPrice = (price: number | undefined) =>
    price !== undefined && !isNaN(price) && price >= 0;

  if (!isValidPrice(newPrice)) {
    console.error(`Invalid newPrice for product ID: ${id}`);
    newPrice = 0; // Gán giá trị mặc định nếu không hợp lệ
  }

  if (!isValidPrice(oldPrice)) {
    console.error(`Invalid oldPrice for product ID: ${id}`);
    oldPrice = undefined; // Bỏ qua oldPrice nếu không hợp lệ
  }

  const formatPrice = (price: number | undefined) =>
    price !== undefined
      ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "Không xác định";

  const thumbnail = images.length > 0 ? images[0] : "/image/default.png"; // Lấy ảnh đầu tiên hoặc mặc định
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
      <Link href={`/client/products/${id}`} className="block">
        <div className="relative">
          <Image
            src={thumbnail}
            alt={title}
            width={200}
            height={200}
            className="mx-auto object-contain"
            priority
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
              -{discountPercentage}%
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 font-medium mt-2">{category}</p>
        <h3 className="text-md font-bold mt-1 line-clamp-2">{title}</h3>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <p className="text-red-500 font-bold">{formatPrice(newPrice)}</p>
          {oldPrice && (
            <p className="text-gray-400 line-through">{formatPrice(oldPrice)}</p>
          )}
        </div>
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-yellow-500 ${i < rating ? "" : "opacity-30"}`}>⭐</span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
