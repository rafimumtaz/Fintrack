"use client";
import * as LucideIcons from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Transaction, Category } from "@/lib/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
  categories: Omit<Category, 'icon'>[];
}

const iconMap = LucideIcons as unknown as Record<string, React.FC<LucideIcons.LucideProps>>;

export default function RecentTransactions({ transactions, categories }: RecentTransactionsProps) {
  const categoryMap = new Map(categories.map(c => [c.name, iconMap[c.iconName]]));
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>A list of your most recent expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.slice(0, 10).map((transaction) => {
                const Icon = categoryMap.get(transaction.category);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                           {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <div className="font-medium">{transaction.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatDate(transaction.date)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
