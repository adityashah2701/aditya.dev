"use client";

import { useEffect, useState } from "react";

export default function TimeLocationWidget() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // To prevent hydration mismatch, set initial time in a microtask, or wait for next tick.
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // Initial paint tick
    setTimeout(() => setTime(new Date()), 0);
    return () => clearInterval(timer);
  }, []);

  return (
    <dl className="flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between text-xs">
        <dt className="text-slate-500">LOCAL_TIME</dt>
        <dd className="text-primary font-bold tracking-wider">
          {time
            ? time.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Kolkata",
              })
            : "00:00:00"}
        </dd>
      </div>

      <div className="flex items-center justify-between text-xs">
        <dt className="text-slate-500">LOCATION</dt>
        <dd className="text-slate-300 uppercase">Navi_Mumbai</dd>
      </div>
    </dl>
  );
}
