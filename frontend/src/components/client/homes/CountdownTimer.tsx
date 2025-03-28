"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  // Thời gian kết thúc khuyến mãi: 2 ngày kể từ hiện tại
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      {["days", "hours", "minutes", "seconds"].map((unit, index) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-md sm:text-2xl font-bold text-black bg-gray-300 px-4 rounded-lg ">
            {timeLeft[unit as keyof typeof timeLeft]
              .toString()
              .padStart(2, "0")}
          </span>
          <span className="text-xs text-gray-600 mt-1 sm:text-sm">
            {unit === "days"
              ? "Ngày"
              : unit === "hours"
                ? "Giờ"
                : unit === "minutes"
                  ? "Phút"
                  : "Giây"}
          </span>
        </div>
      ))}
    </div>
  );
}
