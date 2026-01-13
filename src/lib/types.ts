import type { LucideIcon } from "lucide-react";

export type Transaction = {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
};

export type Budget = {
  category: string;
  amount: number;
  spent: number;
};

export type Category = {
  name: string;
  iconName: string;
  icon: LucideIcon;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type AIRecommendation = {
  category: string;
  suggestion: string;
  reasoning: string;
}