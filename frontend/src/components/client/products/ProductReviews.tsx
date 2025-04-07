"use client";
import { useState } from "react";
import RatingBreakdown from "./RatingBreakdown";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./RviewList";

const reviews = [
  { user: "Yến", date: "22/1/2025 22:00", rating: 5, comment: "Nhân viên tư vấn chưa tốt..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 3, comment: "Gọi bữa 1 bạn nữ tư vấn tốt hơn..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 4, comment: "Nhân viên tư vấn chưa tốt..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 3, comment: "Gọi bữa 1 bạn nữ tư vấn tốt hơn..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 4, comment: "Nhân viên tư vấn chưa tốt..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 3, comment: "Gọi bữa 1 bạn nữ tư vấn tốt hơn..." }
];

const breakdown = { 5: 9, 4: 6, 3: 0, 2: 0, 1: 0 };

const filters = [
  { label: "Tất cả", count: 15, active: true },
  { label: "Có hình ảnh", count: 3, active: false },
  { label: "Đã mua hàng", count: 10, active: false }
];

const ProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");

  const filteredReviews = selectedFilter === "Tất cả"
    ? reviews
    : selectedFilter === "Có hình ảnh"
    ? reviews.filter(review => review.comment.includes("hình ảnh")) // Example logic for "Có hình ảnh"
    : selectedFilter === "Đã mua hàng"
    ? reviews.filter(review => review.user) // Example logic for "Đã mua hàng"
    : selectedFilter.includes("★")
    ? reviews.filter(review => review.rating === parseInt(selectedFilter[0]))
    : reviews;

  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-bold">Đánh giá & nhận xét sản phẩm</h2>
      <div className="flex gap-3 mt-4 flex-row">
        <RatingSummary rating={4.6} totalReviews={15} />
        <RatingBreakdown breakdown={breakdown} setFilter={setSelectedFilter} />
      </div>
      <div className="mt-4">
        <ReviewFilters filters={filters} setFilter={setSelectedFilter} />
      </div>
      <div className="mt-4">
        <ReviewList reviews={filteredReviews} />
      </div>
    </div>
  );
};

export default ProductReviews;
