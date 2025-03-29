"use client";

import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const orders = [
  {
    id: "12345",
    date: "2023-04-13T17:42:00",
    status: "Đã giao hàng",
    total: 670000,
    product: {
      name: "Củ sạc Anker Charger Gen 2 PD 30W A2639 - Trắng",
      image: "/images/gaixinh.png",
      extra: "và 1 sản phẩm khác",
    },
  },
  {
    id: "123456",
    date: "2023-04-13T17:42:00",
    status: "Đã giao hàng",
    total: 670000,
    product: {
      name: "Củ sạc Anker Charger Gen 2 PD 30W A2639 - Trắng",
      image: "/images/gaixinh.png",
      extra: "và 1 sản phẩm khác",
    },
  },
  {
    id: "123457",
    date: "2023-04-13T17:42:00",
    status: "Đã giao hàng",
    total: 670000,
    product: {
      name: "Củ sạc Anker Charger Gen 2 PD 30W A2639 - Trắng",
      image: "/images/gaixinh.png",
      extra: "và 1 sản phẩm khác",
    },
  },
];

const OrderPage = () => {
  const [filter, setFilter] = useState("Tất cả");

  const statusList = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã giao hàng",
    "Đã hủy",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Thông tin khách hàng */}
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
        <Image
          src="/images/gaixinh.png"
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="font-bold text-lg text-pink-600">NGUYỄN TUẤN VŨ</h2>
          <p className="text-gray-500">03*****142 👁️</p>
          <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm">
            SNULL
          </span>
        </div>
      </div>

      {/* Tổng quan đơn hàng */}
      <div className="grid grid-cols-2 gap-4 mt-4 bg-white p-4 rounded-lg shadow">
        <div className="text-center">
          <p className="text-xl font-bold">1</p>
          <p className="text-gray-500">Đơn hàng</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">0đ</p>
          <p className="text-gray-500">Tổng tiền tích lũy từ 01/01/2024</p>
        </div>
      </div>

      {/* Bộ lọc trạng thái đơn hàng */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {statusList.map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded border ${
              filter === status
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        {orders.map((order) => (
          <div key={order.id} className="border-b pb-4 mb-4 last:border-none">
            <div className="flex justify-between text-sm text-gray-500">
              <span>📅 {format(new Date(order.date), "dd/MM/yyyy HH:mm")}</span>
            </div>
            <div className="flex gap-4 mt-2">
              <Image
                src={order.product.image}
                alt={order.product.name}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{order.product.name}</h3>
                <p className="text-gray-500">{order.product.extra}</p>
                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
                  {order.status}
                </span>
                <div className="mt-2 text-red-500 font-bold">{order.total.toLocaleString()}đ</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Link
                href={`/order/${order.id}/invoice`}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Xem hóa đơn
              </Link>
              <Link
                href={`/order/${order.id}`}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
