"use client";

import React, { useState } from "react";
import products from "@/data/_products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/client/cart/CartItem";

const CartPage = () => {
  const [cart, setCart] = useState(
    products.map((p) => ({ ...p, quantity: 1, isChecked: true, newPrice: String(p.newPrice) }))
  );

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleSelect = (id: string, isChecked: boolean) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, isChecked } : item))
    );
  };

  const totalPrice = cart.reduce((acc, item) => {
    if (!item.isChecked) return acc;

    // Chuyển đổi giá từ string -> number (loại bỏ ký tự không phải số)
    return acc + Number(item.newPrice) * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto mb-8 px-1 grid w-full gap-2">
      {/* Giỏ hàng */}
      <div className="mx-auto p-4 mt-5 bg-white rounded-lg shadow-lg  w-full h-auto border-color-200">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
        <div className="grid gap-4 mt-10">
          <div className="grid grid-cols-12 font-bold text-gray-700 border-b pb-2 mb-4 text-center">
            <p className="col-span-5 hidden sm:flex justify-center">Tên sản phẩm</p>
            <p className="col-span-2 text-center hidden sm:flex justify-center">Giá</p>
            <p className="col-span-2 text-center hidden sm:flex justify-center">Số lượng</p>
            <p className="col-span-2 text-center hidden sm:flex justify-center">Tạm tính</p>
          </div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>
      </div>

      {/* Thông tin giỏ hàng */}
      <div className="mx-auto p-4 mt-5 bg-white rounded-lg shadow-lg  w-full h-[200px]">
        <h2 className="text-2xl font-bold mb-4">Thông tin giỏ hàng</h2>
        <div className="mt-4 flex justify-between">
          <p>Tạm tính:</p>
          <p>{totalPrice.toLocaleString()} ₫</p>
        </div>
        <div className="mt-4 flex w-full">
            <Link href="/client/payment" className="w-full">
                <Button className="w-full bg-red-500 text-white">
                    Tiến Hành Thanh Toán
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
