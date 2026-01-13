"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Budget } from "@/lib/types";

interface BudgetGoalsProps {
  budgets: Budget[];
}

export default function BudgetGoals({ budgets }: BudgetGoalsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget Goals</CardTitle>
        <CardDescription>Your monthly progress for each category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const progress = (budget.spent / budget.amount) * 100;
            return (
              <div key={budget.category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
