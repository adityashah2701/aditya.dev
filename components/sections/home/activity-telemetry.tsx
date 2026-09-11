"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Github,
  Code2,
  Flame,
  CheckCircle2,
  GitCommit,
  Calendar,
  ExternalLink,
  Trophy,
} from "lucide-react";
import type {
  ContributionDay,
  GitHubActivityResponse,
  LeetCodeActivityResponse,
} from "@/lib/activity";

interface ActivityTelemetryProps {
  initialGithub?: GitHubActivityResponse | null;
  initialLeetcode?: LeetCodeActivityResponse | null;
}

type ActiveTab = "github" | "leetcode";

interface HoveredCellState {
  x: number;
  y: number;
  count: number;
  date: string;
  label: "contribution" | "submission";
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const THEME_COLORS = ["#221f19", "#0e4429", "#006d32", "#26a641", "#39d353"];

interface HeatmapTimelineProps {
  data: ContributionDay[];
  type: "contribution" | "submission";
  onCellEnter: (
    e: React.MouseEvent<SVGRectElement>,
    activity: { count: number; date: string },
    label: "contribution" | "submission"
  ) => void;
  onCellLeave: () => void;
}

function HeatmapTimeline({
  data,
  type,
  onCellEnter,
  onCellLeave,
}: HeatmapTimelineProps) {
  const { weeks, monthLabels, dividers, totalWidth } = useMemo(() => {
    if (!data || data.length === 0) {
      return { weeks: [], monthLabels: [], dividers: [], totalWidth: 700 };
    }

    const CELL = 11;
    const GAP = 3;
    const MONTH_GAP = 14;
    const LEFT_PAD = 28; // Space for Mon, Wed, Fri labels

    // 1. Group data strictly by calendar month (YYYY-MM)
    const monthsMap = new Map<string, ContributionDay[]>();
    for (const day of data) {
      const monthKey = day.date.substring(0, 7);
      if (!monthsMap.has(monthKey)) {
        monthsMap.set(monthKey, []);
      }
      monthsMap.get(monthKey)!.push(day);
    }

    const computedWeeks: {
      days: (ContributionDay | null)[];
      x: number;
    }[] = [];
    const computedLabels: { name: string; x: number }[] = [];
    const computedDividers: number[] = [];

    let currentX = LEFT_PAD;
    const monthEntries = Array.from(monthsMap.entries());

    for (let mIdx = 0; mIdx < monthEntries.length; mIdx++) {
      const [monthKey, mDays] = monthEntries[mIdx];
      const [, monthNum] = monthKey.split("-");
      const monthName = MONTH_NAMES[parseInt(monthNum, 10) - 1];
      const startX = currentX;

      // Build weeks for this specific month
      const monthWeeks: (ContributionDay | null)[][] = [];
      let currentWeek: (ContributionDay | null)[] = new Array(7).fill(null);

      for (let i = 0; i < mDays.length; i++) {
        const day = mDays[i];
        const [y, m, d] = day.date.split("-").map(Number);
        const dateObj = new Date(Date.UTC(y, m - 1, d));
        const dayOfWeek = dateObj.getUTCDay();

        currentWeek[dayOfWeek] = day;

        if (dayOfWeek === 6 || i === mDays.length - 1) {
          monthWeeks.push([...currentWeek]);
          currentWeek = new Array(7).fill(null);
        }
      }

      const monthWidth =
        monthWeeks.length * CELL + (monthWeeks.length - 1) * GAP;

      // Center the month label over the month columns
      computedLabels.push({
        name: monthName,
        x: startX + monthWidth / 2,
      });

      // Place each week's column
      for (let w = 0; w < monthWeeks.length; w++) {
        computedWeeks.push({
          days: monthWeeks[w],
          x: startX + w * (CELL + GAP),
        });
      }

      currentX += monthWidth;

      // Add a divider between months (not after the final month)
      if (mIdx < monthEntries.length - 1) {
        currentX += MONTH_GAP;
        computedDividers.push(currentX - MONTH_GAP / 2);
      }
    }

    return {
      weeks: computedWeeks,
      monthLabels: computedLabels,
      dividers: computedDividers,
      totalWidth: currentX + 16,
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-slate-500 font-mono text-xs">
        No activity recorded
      </div>
    );
  }

  const CELL_SIZE = 11;
  const CELL_GAP = 3;
  const TOP_OFFSET = 22;

  return (
    <div>
      <svg
        width={totalWidth}
        height={125}
        className="overflow-visible select-none"
      >
        {/* Weekday labels */}
        <text
          x={20}
          y={TOP_OFFSET + 1 * (CELL_SIZE + CELL_GAP) + 9}
          textAnchor="end"
          fill="#64748b"
          fontSize="9"
          fontFamily="var(--font-mono)"
        >
          Mon
        </text>
        <text
          x={20}
          y={TOP_OFFSET + 3 * (CELL_SIZE + CELL_GAP) + 9}
          textAnchor="end"
          fill="#64748b"
          fontSize="9"
          fontFamily="var(--font-mono)"
        >
          Wed
        </text>
        <text
          x={20}
          y={TOP_OFFSET + 5 * (CELL_SIZE + CELL_GAP) + 9}
          textAnchor="end"
          fill="#64748b"
          fontSize="9"
          fontFamily="var(--font-mono)"
        >
          Fri
        </text>

        {/* Month labels */}
        {monthLabels.map((m, idx) => (
          <text
            key={`${m.name}-${idx}`}
            x={m.x}
            y={12}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            {m.name.toUpperCase()}
          </text>
        ))}

        {/* Vertical month dividers with dashed lines */}
        {dividers.map((divX, idx) => (
          <line
            key={idx}
            x1={divX}
            y1={TOP_OFFSET - 2}
            x2={divX}
            y2={TOP_OFFSET + 7 * (CELL_SIZE + CELL_GAP) - CELL_GAP + 2}
            stroke="#35322c"
            strokeDasharray="2 2"
            strokeWidth="1"
            opacity={0.8}
          />
        ))}

        {/* Weeks & Days */}
        {weeks.map((week, wIdx) => (
          <g key={wIdx} transform={`translate(${week.x}, ${TOP_OFFSET})`}>
            {week.days.map((day, dIdx) => {
              if (!day) return null;
              const color = THEME_COLORS[day.level] || THEME_COLORS[0];
              const isZero = day.level === 0;

              return (
                <rect
                  key={day.date}
                  x={0}
                  y={dIdx * (CELL_SIZE + CELL_GAP)}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill={color}
                  stroke={isZero ? "#2b2820" : "transparent"}
                  strokeWidth="1"
                  className="cursor-pointer transition-all hover:stroke-primary hover:stroke-[1.5px] focus:outline-none"
                  onMouseEnter={(e) => onCellEnter(e, day, type)}
                  onMouseLeave={onCellLeave}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Legend below */}
      <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
        <span className="text-slate-600 hidden sm:inline">
          Dashed dividers visually partition the 12 calendar months
        </span>
        <div className="flex items-center gap-1.5 ml-auto">
          <span>Less</span>
          {THEME_COLORS.map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: c }}
              className="w-2.5 h-2.5 rounded-none border border-border-dark/60"
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityTelemetry({
  initialGithub = null,
  initialLeetcode = null,
}: ActivityTelemetryProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("github");
  const [hoveredCell, setHoveredCell] = useState<HoveredCellState | null>(null);

  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const githubData = initialGithub;
  const leetcodeData = initialLeetcode;

  const handleImmediateDismiss = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredCell(null);
  }, []);

  const handleCellEnter = useCallback(
    (
      e: React.MouseEvent<SVGRectElement>,
      activity: { count: number; date: string },
      label: "contribution" | "submission"
    ) => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const nextState: HoveredCellState = {
        x: rect.left + rect.width / 2,
        y: rect.top,
        count: activity.count,
        date: activity.date,
        label,
      };

      if (hoveredCell) {
        setHoveredCell(nextState);
      } else {
        if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = setTimeout(() => {
          setHoveredCell(nextState);
        }, 150);
      }
    },
    [hoveredCell]
  );

  const handleCellLeave = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredCell(null);
    }, 60);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    handleImmediateDismiss();
    setActiveTab(tab);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleImmediateDismiss, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleImmediateDismiss);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [handleImmediateDismiss]);

  return (
    <section aria-label="Activity Telemetry" className="mb-12 md:mb-20">
      {/* ── Section Header ── */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">02.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase font-display">
          Activity_Telemetry_Log
        </h2>
        <div className="h-px bg-border-dark flex-1 ml-4" />
      </div>

      {/* ── Card Container ── */}
      <div className="bg-surface-dark border border-border-dark hover:border-primary/40 rounded-none transition-colors duration-300 overflow-hidden">
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border-dark/60">
          {/* Tab Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabChange("github")}
              className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors rounded-none border ${
                activeTab === "github"
                  ? "bg-primary/10 border-primary/40 text-primary "
                  : "text-slate-500 hover:text-slate-300 border-transparent hover:border-border-dark"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>01 // GITHUB.LOG</span>
            </button>

            <button
              onClick={() => handleTabChange("leetcode")}
              className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors rounded-none border ${
                activeTab === "leetcode"
                  ? "bg-primary/10 border-primary/40 text-primary "
                  : "text-slate-500 hover:text-slate-300 border-transparent hover:border-border-dark"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>02 // LEETCODE.LOG</span>
            </button>
          </div>

          {/* Right Status Badge & Profile Link */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-none text-primary text-[10px] font-bold tracking-wider font-mono">
              <span className="size-1.5 rounded-none bg-primary animate-pulse" />
              ONLINE
            </div>

            <span className="text-border-dark font-mono text-xs">|</span>

            {activeTab === "github" ? (
              <a
                href="https://github.com/adityashah2701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-primary font-mono text-[11px] transition-colors group"
              >
                <span>@adityashah2701</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <a
                href="https://leetcode.com/u/adityashah27/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-primary font-mono text-[11px] transition-colors group"
              >
                <span>@adityashah27</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 md:p-6">
          {activeTab === "github" ? (
            <div>
              {/* GitHub Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Year_Commits</span>
                    <GitCommit className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {githubData?.totalContributions ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Past 365 Days
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Active_Days</span>
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {githubData?.activeDays ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Days with commits
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Current_Streak</span>
                    <Flame className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {githubData?.currentStreak ?? 0}d
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Continuous streak
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Max_Streak</span>
                    <Trophy className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {githubData?.longestStreak ?? 0}d
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Personal record
                  </div>
                </div>
              </div>

              {/* GitHub Heatmap Calendar */}
              <div className="bg-background-dark border border-border-dark rounded-none p-4">
                <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="text-primary">$</span> git log --contributions --timeline
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    Server Cached: 1 hr ISR
                  </span>
                </div>

                <div
                  className="overflow-x-auto pb-2 scrollbar-thin"
                  onMouseLeave={handleImmediateDismiss}
                  onScroll={handleImmediateDismiss}
                >
                  <div className="min-w-225 flex justify-start py-2">
                    <HeatmapTimeline
                      data={githubData?.contributions || []}
                      type="contribution"
                      onCellEnter={handleCellEnter}
                      onCellLeave={handleCellLeave}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* LeetCode Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Problems_Solved</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {leetcodeData?.solved.all ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 flex gap-1.5">
                    <span className="text-emerald-400">E:{leetcodeData?.solved.easy ?? 0}</span>
                    <span className="text-amber-400">M:{leetcodeData?.solved.medium ?? 0}</span>
                    <span className="text-rose-400">H:{leetcodeData?.solved.hard ?? 0}</span>
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Active_Streak</span>
                    <Flame className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {leetcodeData?.streak ?? 0}d
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Current daily streak
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Active_Days</span>
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {leetcodeData?.totalActiveDays ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Problem solving days
                  </div>
                </div>

                <div className="bg-background-dark border border-border-dark hover:border-primary/40 rounded-none p-3.5 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                    <span>Global_Rank</span>
                    <Trophy className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {leetcodeData?.ranking
                      ? `#${leetcodeData.ranking.toLocaleString()}`
                      : "N/A"}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Global ranking
                  </div>
                </div>
              </div>

              {/* LeetCode Heatmap Calendar */}
              <div className="bg-background-dark border border-border-dark rounded-none p-4">
                <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="text-primary">$</span> lc telemetry --submissions --heatmap
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    Total Submissions: {leetcodeData?.totalSubmissions ?? 0}
                  </span>
                </div>

                <div
                  className="overflow-x-auto pb-2 scrollbar-thin"
                  onMouseLeave={handleImmediateDismiss}
                  onScroll={handleImmediateDismiss}
                >
                  <div className="min-w-225 flex justify-start py-2">
                    <HeatmapTimeline
                      data={leetcodeData?.contributions || []}
                      type="submission"
                      onCellEnter={handleCellEnter}
                      onCellLeave={handleCellLeave}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Floating Heatmap Tooltip (Controlled Intent & Immediate Dismiss) ── */}
      {hoveredCell && (
        <div
          style={{
            position: "fixed",
            left: hoveredCell.x,
            top: hoveredCell.y - 8,
            transform: "translate(-50%, -100%)",
          }}
          className="pointer-events-none z-50 rounded-none bg-surface-dark border border-border-dark px-3 py-1.5 text-xs text-slate-200 font-mono animate-in fade-in-0 zoom-in-95 duration-75"
        >
          <div className="flex flex-col gap-0.5 text-center whitespace-nowrap">
            <span className="text-white font-semibold">
              <span className="text-primary font-bold">{hoveredCell.count}</span>{" "}
              {hoveredCell.count === 1
                ? hoveredCell.label
                : `${hoveredCell.label}s`}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {hoveredCell.date}
            </span>
          </div>
          {/* Arrow pointing down directly to the box */}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 size-2 bg-surface-dark border-r border-b border-border-dark rotate-45" />
        </div>
      )}
    </section>
  );
}
