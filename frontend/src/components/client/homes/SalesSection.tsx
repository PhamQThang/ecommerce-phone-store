"use client";

import ProductCard from "./ProductCard";
import CountdownTimer from "./CountdownTimer";
import products from "@/data/_products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SalesSection() {
  const salesProducts = products.filter(
    (product) => product.discountPercentage > 0
  );

  const displayedProducts = salesProducts.slice(0, 4);

  return (
    <div className="w-full container mx-auto py-6 px-3 sm:py-8 lg:py-10">
      <div className="w-full py-2">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h2 className="text-md md:text-lg font-bold">
              Khuyến mãi đặc biệt
            </h2>
            <Link className="block sm:hidden" href="/sales">
              <Button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
                Xem tất cả <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="w-full flex justify-center sm:flex-1">
            <CountdownTimer />
          </div>

          <Link className="sm:block hidden" href="/sales">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
              Xem tất cả <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} {...product} newPrice={Number(product.newPrice)} oldPrice={Number(product.oldPrice)} />
        ))}
      </div>
    </div>
  );
}
