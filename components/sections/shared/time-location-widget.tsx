"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function TimeLocationWidget() {
  const [time, setTime] = useState<Date | null>(null);
  const { isMobile, openMobile } = useSidebar();
  const shouldRunClock = !isMobile || openMobile;

  useEffect(() => {
    if (!shouldRunClock) {
      return;
    }

    const timer = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [shouldRunClock]);

  return (
    <div className="flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">LOCAL_TIME</span>
        <span className="text-primary font-bold tracking-wider">
          {time
            ? time.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Kolkata",
              })
            : "00:00:00"}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">LOCATION</span>
        <span className="text-slate-300 uppercase">Navi_Mumbai</span>
      </div>
    </div>
  );
}
