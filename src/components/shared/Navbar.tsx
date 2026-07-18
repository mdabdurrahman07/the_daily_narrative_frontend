"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../../../public/TDN.png";
import { IUser } from "@/app/(public)/_types/types";

/** The authenticated user payload consumed by the navbar. */
type NavUser = IUser["data"];

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  /** Brand text shown on the left (used as mobile sheet title). */
  brand?: string;
  /** Navigation links. Falls back to sensible defaults. */
  links?: NavLink[];
  /** Signed-in user shown in the profile menu. Omit to render a logged-out state. */
  user?: NavUser;
  /** Href for the profile page link. */
  profileHref?: string;
  /** Href for the dashboard link. */
  dashboardHref?: string;
  /** Called when the user selects "Log out". */
  onLogout?: () => void | Promise<void>;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function useIsActive(pathname: string | null) {
  return React.useCallback(
    (href: string) => {
      if (!pathname) return false;
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );
}

function getInitials(user: NavUser) {
  const source = user.name?.trim() || user.email;
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("") || "U";
}

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  const toggle = React.useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="relative"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

function UserAvatar({
  user,
  size = "default",
}: {
  user: NavUser;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Avatar size={size}>
      {user.profile?.profilePhoto ? (
        <AvatarImage src={user.profile.profilePhoto} alt={user.name} />
      ) : null}
      <AvatarFallback>{getInitials(user)}</AvatarFallback>
    </Avatar>
  );
}

const linkClasses = (active: boolean) =>
  cn(
    "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
    "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
    active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
  );

export function Navbar({
  brand = "TDN",
  links = DEFAULT_LINKS,
  user,
  profileHref = "/profile",
  dashboardHref = "/dashboard",
  onLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const isActive = useIsActive(pathname);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: brand + desktop nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            <Image
              src={logo}
              alt="TDN - The Daily Narrative - Blogging platform for everyone"
              width={50}
              height={40}
            />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild className={linkClasses(active)}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: theme toggle + profile menu + mobile trigger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hidden rounded-full md:inline-flex"
                  aria-label="Open profile menu"
                >
                  <UserAvatar user={user} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-60">
                <div className="flex items-center gap-3 p-2">
                  <UserAvatar user={user} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={profileHref} className="flex items-center gap-2">
                    <User className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={onLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex w-72 flex-col gap-0 p-0"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
                <SheetTitle className="text-base font-semibold">
                  {brand}
                </SheetTitle>
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close navigation menu"
                  >
                    <X className="size-5" />
                  </Button>
                </SheetClose>
              </SheetHeader>

              <div className="flex flex-col gap-1 p-4">
                {links.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              {/* Mobile profile section */}
              <div className="mt-auto border-t border-border p-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-1 pb-3">
                      <UserAvatar user={user} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <SheetClose asChild>
                        <Link
                          href={profileHref}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <User className="size-4" />
                          Profile
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={dashboardHref}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Link>
                      </SheetClose>
                      <SheetClose
                        onClick={onLogout}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </SheetClose>
                    </div>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Log in
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
