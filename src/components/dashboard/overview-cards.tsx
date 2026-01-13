"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, CircleDollarSign, Wallet } from 'lucide-react';
import type { Transaction, Budget } from '@/lib/types';

interface OverviewCardsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function OverviewCards({ transactions, budgets }: OverviewCardsProps) {
  const { totalSpent, totalBudget, remaining } = useMemo(() => {
    const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const budget = budgets.reduce((sum, b) => sum + b.amount, 0);
    return {
      totalSpent: spent,
      totalBudget: budget,
      remaining: budget - spent,
    };
  }, [transactions, budgets]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent (This Month)</CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
          <p className="text-xs text-muted-foreground">Your total budget for this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining Funds</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${remaining < 0 ? 'text-destructive' : 'text-green-600'}`}>
            {formatCurrency(remaining)}
          </div>
          <p className="text-xs text-muted-foreground">{remaining < 0 ? 'Over budget' : 'Left to spend'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
