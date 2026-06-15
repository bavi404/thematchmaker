"use client";

import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { useToast } from "@/components/providers/toast-provider";

interface TopNavbarProps {
  title?: string;
  onMenuClick?: () => void;
}

export function TopNavbar({ title = "Dashboard", onMenuClick }: TopNavbarProps) {
  const router = useRouter();
  const { showToast } = useToast();

  function handleSignOut() {
    logout();
    showToast("Signed out successfully");
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-rose-100/60 bg-white/80 px-4 backdrop-blur-md lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-rose-600 hover:bg-rose-50 hover:text-rose-800 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading text-lg font-semibold text-rose-950 lg:text-xl">
          {title}
        </h1>
      </div>

      <div className="hidden max-w-sm flex-1 md:flex">
        <label htmlFor="global-search" className="sr-only">
          Search clients and matches
        </label>
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-300"
            aria-hidden
          />
          <Input
            id="global-search"
            placeholder="Search clients, matches..."
            className="h-9 rounded-xl border-rose-100 bg-rose-50/50 pl-9 text-sm placeholder:text-rose-300 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-rose-600 hover:bg-rose-50 hover:text-rose-800"
          aria-label="Notifications, 1 unread"
        >
          <Bell className="h-4 w-4" aria-hidden />
          <span
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500"
            aria-hidden
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-9 gap-2 rounded-xl px-2 hover:bg-rose-50"
                aria-label="Account menu"
              />
            }
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-gradient-to-br from-rose-400 to-amber-400 text-[10px] font-semibold text-white">
                SM
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-rose-900 sm:inline">
              Sarah Mitchell
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sarah Mitchell</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
