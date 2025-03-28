"use client";

import { useState } from "react";

const product = {
  name: "Samsung Galaxy A36 5G - 8GB/128GB",
  price: 7990000,
  oldPrice: 8290000,
  sku: "SSA36DEN",
  versions: ["Galaxy A36", "Galaxy A56"],
  colors: [
    { name: "Xanh", price: 7990000, image: "/images/ip.png" },
    { name: "Tím", price: 7990000, image: "/images/ip.png" },
    { name: "Đen", price: 7990000, image: "/images/ip.png" },
  ],
  memberPrice: 7894000,
  installment: "30,699 đ/ngày",
  images: ["/images/ip.png", "/images/ip.png", "/images/ip.png"],
};

export default function PhoneDetail() {
  const [selectedVersion, setSelectedVersion] = useState(product.versions[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[2]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-80 rounded-lg"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => (
              <img key={index} src={img} className="w-16 rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-red-500 text-2xl font-bold">
            {product.price.toLocaleString()} đ
          </p>
          <p className="line-through text-gray-400">
            {product.oldPrice.toLocaleString()} đ
          </p>
          <p className="text-gray-500">SKU: {product.sku}</p>

          <div className="mt-4">
            <p className="font-semibold">Lựa chọn phiên bản</p>
            <div className="flex gap-2 mt-2">
              {product.versions.map((version) => (
                <button
                  key={version}
                  onClick={() => setSelectedVersion(version)}
                  className={`border px-4 py-2 rounded-lg ${selectedVersion === version ? "border-green-500" : "border-gray-300"}`}
                >
                  {version}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Lựa chọn màu</p>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 rounded-lg ${selectedColor.name === color.name ? "border-green-500" : "border-gray-300"}`}
                >
                  {color.name} ({color.price.toLocaleString()} đ)
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-green-600 font-bold text-lg">
              {product.memberPrice.toLocaleString()} đ
            </p>
            <p className="text-gray-500 text-sm">+32,000 Điểm thưởng</p>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-lg font-semibold">Trả góp 0% từ</p>
            <p className="text-green-600 text-xl font-bold">
              {product.installment}
            </p>
            <p className="text-gray-500 text-sm">
              (Kỳ hạn 6 tháng, trả trước 30%)
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button className="bg-red-500 text-white py-3 rounded-lg text-lg font-semibold">
              MUA NGAY
            </button>
            <button className="bg-green-500 text-white py-3 rounded-lg text-lg font-semibold">
              TRẢ GÓP 0%
            </button>
            <button className="bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold">
              TRẢ GÓP QUA THẺ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
