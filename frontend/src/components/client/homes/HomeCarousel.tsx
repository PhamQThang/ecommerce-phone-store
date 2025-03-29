"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function HomeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const banners = [
    {
      src: "/images/image.png",
      alt: "Banner 1 - iPhone Promotion",
    },
    {
      src: "/images/image.png",
      alt: "Banner 2 - Samsung Galaxy Sale",
    },
    {
      src: "/images/image.png",
      alt: "Banner 3 - Xiaomi New Release",
    },
    {
      src: "/images/image.png",
      alt: "Banner 4 - Oppo Special Offer",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full max-w-7xl mx-auto py-3 px-3">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className=""
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full p-1 sm:p-2" />
        <CarouselNext className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full p-1 sm:p-2" />
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            className={`h-3 rounded-full transition-colors duration-200 ${
              current === index + 1 ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
