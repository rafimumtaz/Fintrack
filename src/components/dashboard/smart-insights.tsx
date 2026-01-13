"use client";

import { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { getAIRecommendations } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AIRecommendation } from '@/lib/types';

export default function SmartInsights() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await getAIRecommendations();
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error ?? "An unknown error occurred.");
      }
    } catch (e: any) {
      setError(e.message || "Failed to fetch recommendations.");
    } finally {
      setLoading(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
          <CardDescription>
            Get AI-powered recommendations to optimize your budget based on your spending habits.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            <div className="text-center">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Ready to analyze your finances?</p>
            </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGetRecommendations} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Analyzing...' : 'Get Recommendations'}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Your AI Budget Recommendations</DialogTitle>
            <DialogDescription>
              Here are some suggestions to help you reach your financial goals faster.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 my-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && Array.isArray(result) && result.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card">
                  <h4 className="font-semibold text-primary">{rec.category}</h4>
                  <p className="text-sm font-medium text-accent-foreground mt-1">{rec.suggestion}</p>
                  <p className="text-sm text-muted-foreground mt-2">{rec.reasoning}</p>
                </div>
              ))}
               {result && !Array.isArray(result) && (
                 <Alert>
                  <AlertTitle>Insights Received</AlertTitle>
                  <AlertDescription>
                    <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
