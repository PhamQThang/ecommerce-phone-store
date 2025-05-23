"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import products from "@/data/_products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedPhonesSection() {
  const featuredPhones = products.filter(
    (product) => product.discountPercentage === 0
  );

  return (
    <div className="w-full container mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-4 sm:gap-0">
        <h2 className="text-md md:text-lg font-bold">Điện thoại nổi bật</h2>

        <Link href="/featured-phones">
          <Button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
            Xem tất cả <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {featuredPhones.map((product) => (
          <ProductCard key={product.id} {...product} newPrice={Number(product.newPrice)} oldPrice={Number(product.oldPrice)} />
        ))}
      </div>
    </div>
  );
}
