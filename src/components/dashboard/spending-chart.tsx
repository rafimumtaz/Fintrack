"use client";

import * as React from "react";
import { Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Transaction } from "@/lib/types";

interface SpendingChartProps {
  transactions: Transaction[];
}

export default function SpendingChart({ transactions }: SpendingChartProps) {
  const chartData = React.useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([category, total]) => ({
        category,
        total,
        fill: `hsl(var(--chart-${(Object.keys(categoryTotals).indexOf(category) % 5) + 1}))`,
      }))
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  const chartConfig = React.useMemo(() => {
    return chartData.reduce((acc, item) => {
      acc[item.category] = { label: item.category };
      return acc;
    }, {} as any);
  }, [chartData]);

  const totalSpent = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.total, 0),
    [chartData]
  );
  
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeCategoryData = chartData[activeIndex];


  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Visual breakdown of your expenses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={(props) => (
                <g>
                   <Sector {...props} cornerRadius={5} />
                   <Sector {...props} cornerRadius={5} outerRadius={props.outerRadius! + 10} innerRadius={props.innerRadius! - 10} fill={props.fill} fillOpacity={0.2} />
                </g>
              )}
              onMouseOver={(_, index) => setActiveIndex(index)}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col items-center justify-center p-4 gap-2 border-t text-sm">
        <div className="font-medium">
          {activeCategoryData.category}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tighter">
            {activeCategoryData.total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          <span className="text-muted-foreground">
            ({((activeCategoryData.total / totalSpent) * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
    </Card>
  );
}
