import { useState } from "react";

const filters = ["Tất cả", "Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đã giao hàng", "Đã hủy"];

const OrderFilters = () => {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  return (
    <div className="flex gap-2 mt-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg ${activeFilter === filter ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default OrderFilters;
