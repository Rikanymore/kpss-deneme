// src/components/Countdown.tsx
"use client";
import { useState, useEffect } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 p-4 bg-slate-800 text-white rounded-lg shadow-lg justify-center my-6">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-xs uppercase text-slate-400">{key}</div>
        </div>
      ))}
    </div>
  );
}