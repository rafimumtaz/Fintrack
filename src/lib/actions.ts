'use server';

import { getBudgetRecommendation } from '@/ai/flows/budget-recommendation';
import { budgets, transactions } from '@/lib/data';

const financialGoals = {
  goal: "Save 15% of monthly income for a down payment on a house.",
  income: 5000
};

export async function getAIRecommendations() {
  try {
    const spendingData = JSON.stringify(transactions);
    const currentBudget = JSON.stringify(budgets);
    const goals = JSON.stringify(financialGoals);
    
    const result = await getBudgetRecommendation({
      spendingData,
      currentBudget,
      financialGoals: goals,
    });
    
    const recommendations = JSON.parse(result.recommendations);
    
    return { success: true, data: recommendations };
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    return { success: false, error: "Failed to get AI recommendations. Please try again later." };
  }
}
