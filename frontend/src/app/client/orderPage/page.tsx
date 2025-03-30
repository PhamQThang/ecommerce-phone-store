import OrderList from "@/components/client/order/OrderList";
import OrderStatus from "@/components/client/order/OrderStatus";
import Image from "next/image";
export default function OrdersPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center p-4 ">
        <Image
          src="/images/gaixinh.png"
          alt="Avatar"
          className="w-14 h-14 rounded-full border"
          width={56}
          height={56}
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-pink-600">NGUYỄN TUẤN VŨ</h3>
          <p className="text-gray-500 text-sm">03******142</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-semibold">1</p>
          <p className="text-gray-500 text-sm">đơn hàng</p>
        </div>
      </div>
      <OrderStatus />
      <OrderList />
    </div>
  );
}
