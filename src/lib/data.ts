import { Car, ShoppingBag, Utensils, Ticket, Home, Shirt, Gift, HeartPulse } from 'lucide-react';
import type { Category, Transaction, Budget, User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const user: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user-avatar/100/100',
};

export const categories: Omit<Category, 'icon'>[] = [
  { name: 'Food', iconName: 'Utensils' },
  { name: 'Transport', iconName: 'Car' },
  { name: 'Shopping', iconName: 'ShoppingBag' },
  { name: 'Entertainment', iconName: 'Ticket' },
  { name: 'Housing', iconName: 'Home' },
  { name: 'Clothing', iconName: 'Shirt' },
  { name: 'Gifts', iconName: 'Gift' },
  { name: 'Health', iconName: 'HeartPulse' },
];

export const transactions: Transaction[] = [
  { id: '1', category: 'Food', description: 'Groceries', amount: 75.60, date: '2024-07-20' },
  { id: '2', category: 'Transport', description: 'Gasoline', amount: 40.00, date: '2024-07-20' },
  { id: '3', category: 'Entertainment', description: 'Movie tickets', amount: 30.00, date: '2024-07-19' },
  { id: '4', category: 'Shopping', description: 'New headphones', amount: 150.00, date: '2024-07-18' },
  { id: '5', category: 'Food', description: 'Restaurant', amount: 55.20, date: '2024-07-17' },
  { id: '6', category: 'Housing', description: 'Rent', amount: 1200.00, date: '2024-07-15' },
  { id: '7', category: 'Health', description: 'Pharmacy', amount: 25.00, date: '2024-07-14' },
  { id: '8', category: 'Transport', description: 'Subway pass', amount: 100.00, date: '2024-07-12' },
  { id: '9', category: 'Food', description: 'Coffee shop', amount: 12.50, date: '2024-07-11' },
  { id: '10', category: 'Clothing', description: 'T-shirt', amount: 22.99, date: '2024-07-10' },
];

const calculateSpent = (category: string) => {
  return transactions
    .filter(t => t.category === category)
    .reduce((acc, t) => acc + t.amount, 0);
};

export const budgets: Budget[] = [
  { category: 'Food', amount: 400, spent: calculateSpent('Food') },
  { category: 'Transport', amount: 200, spent: calculateSpent('Transport') },
  { category: 'Shopping', amount: 250, spent: calculateSpent('Shopping') },
  { category: 'Entertainment', amount: 150, spent: calculateSpent('Entertainment') },
  { category: 'Housing', amount: 1200, spent: calculateSpent('Housing') },
  { category: 'Clothing', amount: 100, spent: calculateSpent('Clothing') },
  { category: 'Gifts', amount: 50, spent: calculateSpent('Gifts') },
  { category: 'Health', amount: 100, spent: calculateSpent('Health') },
];