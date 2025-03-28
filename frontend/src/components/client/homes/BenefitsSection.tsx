import { Truck, Headphones, Wallet, Gift } from "lucide-react";
import React from "react";

const benefits = [
  {
    icon: <Truck />,
    title: "Miễn Phí Giao Hàng",
    desc: "Từ Đơn Hàng Trên 1,000,000 đ",
  },
  {
    icon: <Headphones />,
    title: "Hỗ Trợ 24/7",
    desc: "Nhận Hỗ Trợ Trực Tuyến 24/7",
  },
  { icon: <Wallet />, title: "Hoàn Tiền", desc: "Hoàn Trả Trong Vòng 15 Ngày" },
  { icon: <Gift />, title: "Mã Quà Tặng", desc: "Nhận Mã Khuyến Mãi" },
];

export default function BenefitsSection() {
  return (
    <div className="bg-cyan-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-4 relative">
            <div className="h-14 w-14 bg-yellow-400 flex justify-center items-center rounded-full">
              {React.cloneElement(benefit.icon, {
                className: "h-8 w-8 text-red-500",
              })}
            </div>

            <div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="text-sm">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
