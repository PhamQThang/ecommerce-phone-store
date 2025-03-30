"use client";

import { useState } from 'react';

const OrderStatus: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả');

  const statuses = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chờ xác nhận', value: 'pending' },
    { label: 'Đã xác nhận', value: 'confirmed' },
    { label: 'Đang vận chuyển', value: 'shipping' },
    { label: 'Đã giao hàng', value: 'delivered' },
    { label: 'Đã hủy', value: 'cancelled' },
  ];

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    console.log(`Selected status: ${status}`);
  };

  return (
    <div className="flex space-x-4 p-4">
      {statuses.map((status) => (
        <button
          key={status.value}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === status.label
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleStatusClick(status.label)}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default OrderStatus;