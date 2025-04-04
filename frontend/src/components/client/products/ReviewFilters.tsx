"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ProductReviewDialog from "./ProductReviewDialog";
import React from "react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ rating, totalReviews }) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    setIsReviewDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center">

      <Button
        variant="default"
        className="mt-4"
        onClick={() => setIsReviewDialogOpen(true)}
      >
        Viết đánh giá
      </Button>
      <ProductReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

interface ReviewFiltersProps {
  filters: { label: string; count: number; active: boolean }[];
  setFilter: (filter: string) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ filters, setFilter }) => {
  const starFilters = [5, 4, 3, 2, 1];

  const handleFilterClick = (label: string) => {
    setFilter(label);
  };

  return (
    <div>
      <h3 className="text-sm font-bold mb-2">Lọc theo</h3>
      <div className="flex gap-2 mb-4">
        {filters.map(filter => (
          <Button
            key={filter.label}
            className={`px-3 py-1 rounded-full border transition-colors ${filter.active
                ? "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                : "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              }`}
            onClick={() => handleFilterClick(filter.label)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {starFilters.map(star => (
          <Button
            key={star}
            className="flex items-center px-3 py-1 rounded-full border bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setFilter(`${star}★`)}
          >
            {star}★
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ReviewFilters;

