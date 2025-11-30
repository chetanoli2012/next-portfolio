"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { generateContributionData, ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

interface ContributionGraphProps {
  data?: ContributionDay[];
  className?: string;
}

const levelColors = {
  0: "bg-border",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

export default function ContributionGraph({
  data,
  className,
}: ContributionGraphProps) {
  const contributions = useMemo(() => {
    return data || generateContributionData();
  }, [data]);

  // Group by weeks
  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(day);

      if (index === contributions.length - 1) {
        result.push(currentWeek);
      }
    });

    return result;
  }, [contributions]);

  // Get month labels
  const months = useMemo(() => {
    const monthLabels: { name: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({
            name: date.toLocaleDateString("en-US", { month: "short" }),
            index: weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return monthLabels;
  }, [weeks]);

  const totalContributions = contributions.reduce(
    (sum, day) => sum + day.count,
    0
  );

  return (
    <div className={cn("", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-muted uppercase tracking-wider">
          {totalContributions.toLocaleString()} contributions in the last year
        </h3>
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  "w-3 h-3 border border-border/50",
                  levelColors[level as keyof typeof levelColors]
                )}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Graph */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block">
          {/* Month labels */}
          <div className="flex mb-2 ml-8">
            {months.map((month, index) => (
              <div
                key={index}
                className="font-mono text-xs text-muted"
                style={{
                  marginLeft:
                    index === 0
                      ? 0
                      : `${
                          (month.index - (months[index - 1]?.index || 0)) * 14 -
                          20
                        }px`,
                }}
              >
                {month.name}
              </div>
            ))}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-2">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((day, index) => (
                <div
                  key={index}
                  className="h-3 font-mono text-[10px] text-muted leading-3"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {/* Pad the first week if it doesn't start on Sunday */}
                {weekIndex === 0 &&
                  Array.from({
                    length: new Date(week[0]?.date || "").getDay(),
                  }).map((_, i) => (
                    <div key={`pad-${i}`} className="w-3 h-3" />
                  ))}

                {week.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIndex * 7 + dayIndex) * 0.002,
                      duration: 0.2,
                    }}
                    className={cn(
                      "w-3 h-3 border border-border/30 cursor-pointer transition-all hover:border-accent",
                      levelColors[day.level]
                    )}
                    title={`${day.count} contributions on ${new Date(
                      day.date
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
