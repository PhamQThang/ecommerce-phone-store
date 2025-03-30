import { notFound } from "next/navigation";
import OrderDetail from "@/components/client/order/OrderDetail";

const orders = [
  {
    id: 128235234000689,
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
    id: 1282352340006891,
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
      {
        name: "Củ sạc Anker Charger Gen 2 PD 30W A2639-Trắng",
        quantity: 1,
        image: "/images/gaixinh.png",
        price: 670000,
      },
    ],
  },
  {
    id: 1282352340006890,
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

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === Number(params.id));
  if (!order) return notFound();

  return <OrderDetail order={order} />;
}
