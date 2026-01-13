// budget-recommendation.ts
'use server';
/**
 * @fileOverview Provides AI-powered recommendations for budget adjustments based on spending habits.
 *
 * - getBudgetRecommendation - A function that provides budget adjustment recommendations.
 * - BudgetRecommendationInput - The input type for the getBudgetRecommendation function.
 * - BudgetRecommendationOutput - The return type for the getBudgetRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetRecommendationInputSchema = z.object({
  spendingData: z.string().describe('Historical spending data in JSON format, including categories and amounts.'),
  currentBudget: z.string().describe('Current budget allocations in JSON format, including categories and amounts.'),
  financialGoals: z.string().describe('User specified financial goals in JSON format.'),
});
export type BudgetRecommendationInput = z.infer<typeof BudgetRecommendationInputSchema>;

const BudgetRecommendationOutputSchema = z.object({
  recommendations: z.string().describe('AI-powered recommendations for budget adjustments in JSON format, with explanations.'),
});
export type BudgetRecommendationOutput = z.infer<typeof BudgetRecommendationOutputSchema>;

export async function getBudgetRecommendation(input: BudgetRecommendationInput): Promise<BudgetRecommendationOutput> {
  return budgetRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetRecommendationPrompt',
  input: {schema: BudgetRecommendationInputSchema},
  output: {schema: BudgetRecommendationOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending habits, current budget, and financial goals to provide personalized budget adjustment recommendations.

Spending Data: {{{spendingData}}}
Current Budget: {{{currentBudget}}}
Financial Goals: {{{financialGoals}}}

Based on this information, provide clear and actionable recommendations for adjusting the budget. Explain the reasoning behind each recommendation.

Format the recommendations as a JSON object with explanations.
`,
});

const budgetRecommendationFlow = ai.defineFlow(
  {
    name: 'budgetRecommendationFlow',
    inputSchema: BudgetRecommendationInputSchema,
    outputSchema: BudgetRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
