"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({ order }: { order: any }) => {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center mt-4 shadow">
      <div className="flex items-center gap-4">
        <Image src={order.items[0].image} alt={order.items[0].name} className="w-16 h-16 rounded-md" width={50} height={50}/>
        <div>
          <p className="font-medium">{order.items[0].name}</p>
          <p className="text-red-500 font-bold">{order.total.toLocaleString()}đ</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-500">{order.date}</p>
        <div className="mt-2 flex gap-2">
          <Link href={`/client/orderPage/order/${order.id}`}>
            <Button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
