import React from "react";
import OrderPaymentInfo from "./OrderPaymentInfo";

interface OrderItem {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

const OrderDetail = ({ order }: { order: Order }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Chi tiết đơn hàng #{order.id}</h2>
      <p className="text-gray-500">Ngày đặt: {order.date}</p>
      <p className="text-gray-500">
        Tổng tiền: <span className="text-red-500 font-bold">{order.total.toLocaleString()}đ</span>
      </p>

      <h3 className="text-xl font-semibold mt-6">Danh sách sản phẩm</h3>
      <div className="border p-4 rounded-lg mt-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">Số lượng: {item.quantity}</p>
              <p className="text-red-500 font-bold">{item.price.toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <OrderPaymentInfo total={0} discount={0} />
      </div>
    </div>
  );
};

export default OrderDetail;
