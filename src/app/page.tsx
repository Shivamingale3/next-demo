"use client"; // Add this at the very top

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Interface for time units
interface TimeUnit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  // Set target date to January 1st 2025
  const targetDate = new Date("2025-01-01T00:00:00");

  // State to hold countdown values
  const [timeLeft, setTimeLeft] = useState<TimeUnit>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time difference and update state
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <Card className="p-8 space-y-6 text-center bg-zinc-900">
        <h1 className="text-4xl font-bold text-white mb-8">Available After</h1>

        {/* Flip clock container */}
        <div className="grid grid-cols-4 gap-4">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 text-white text-3xl font-mono p-4 rounded-lg w-24 flip-card">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <span className="text-white mt-2">Days</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 text-white text-3xl font-mono p-4 rounded-lg w-24 flip-card">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="text-white mt-2">Hours</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 text-white text-3xl font-mono p-4 rounded-lg w-24 flip-card">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="text-white mt-2">Minutes</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 text-white text-3xl font-mono p-4 rounded-lg w-24 flip-card">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <span className="text-white mt-2">Seconds</span>
          </div>
        </div>

        <div className="mt-8">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            Notify Me
          </Button>
        </div>
      </Card>
    </main>
  );
}
