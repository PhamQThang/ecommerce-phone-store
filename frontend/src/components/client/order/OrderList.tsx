import OrderItem from "./OrderItem";

const orders = [
  {
    id: "0128235234000689",
    date: "13/04/2023 17:42",
    total: 670000,
    status: "Đã giao hàng",
    items: [
      {
        name: "Củ sạc Anker Charger Gen 2 PD 30W A2639-Trắng",
        quantity: 1,
        image: "/images/gaixinh.png",
        price: 670000,
      },
    ],
  },
  {
    id: "01282352340006891",
    date: "13/04/2023 17:42",
    total: 670000,
    status: "Đã giao hàng",
    items: [
      {
        name: "Củ sạc Anker Charger Gen 2 PD 30W A2639-Trắng",
        quantity: 1,
        image: "/images/gaixinh.png",
        price: 670000,
      },
    ],
  },
  {
    id: "01282352340006890",
    date: "13/04/2023 17:42",
    total: 670000,
    status: "Đã giao hàng",
    items: [
      {
        name: "Củ sạc Anker Charger Gen 2 PD 30W A2639-Trắng",
        quantity: 1,
        image: "/images/gaixinh.png",
        price: 670000,
      },
    ],
  },
];

export default function OrderList() {
  return (
    <div className="container mx-auto p-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}
