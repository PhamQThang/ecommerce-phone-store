import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  const hasDiscount = product.discountPercentage > 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full h-40 sm:h-48 md:h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "contain" }}
          className="p-2"
        />
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
            -{product.discountPercentage}%
          </div>
        )}
      </div>
      {/* Thông tin sản phẩm */}
      <div className="p-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        {/* Đánh giá sao */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        {/* Giá sản phẩm */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(product.discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
