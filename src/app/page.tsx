import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Wallet,
  Settings,
  Receipt,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { transactions, budgets, user, categories } from '@/lib/data';
import { AddExpenseSheet } from '@/components/dashboard/add-expense-sheet';
import OverviewCards from '@/components/dashboard/overview-cards';
import SpendingChart from '@/components/dashboard/spending-chart';
import BudgetGoals from '@/components/dashboard/budget-goals';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import SmartInsights from '@/components/dashboard/smart-insights';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Transactions">
                <Receipt />
                Transactions
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Budgets">
                <Wallet />
                Budgets
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar?.imageUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm overflow-hidden">
              <span className="font-semibold text-sidebar-foreground truncate">{user.name}</span>
              <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold font-headline">Dashboard</h2>
          </div>
          <AddExpenseSheet categories={categories}>
            <Button>
              <Plus className="mr-2" />
              Add Expense
            </Button>
          </AddExpenseSheet>
        </header>
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <OverviewCards transactions={transactions} budgets={budgets} />
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SpendingChart transactions={transactions} />
            </div>
            <div>
              <BudgetGoals budgets={budgets} />
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <RecentTransactions transactions={transactions} categories={categories} />
            <SmartInsights />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
