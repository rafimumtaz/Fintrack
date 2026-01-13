import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TrendingUp className="h-7 w-7 text-sidebar-primary" />
      <h1 className="text-2xl font-bold text-sidebar-primary font-headline">
        FinTrack
      </h1>
    </div>
  );
}
