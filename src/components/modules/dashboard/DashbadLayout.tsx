"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserPlus,
  Lightbulb,
  Eye,
  BookOpen,
  Settings,
  LogOut,
  TrendingUp,
  FileText,
  Star,
  UserCheck,
  Tag,
  Bell,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/types/enums";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface DashboardClientLayoutProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  userRole: string;
}

export function DashboardClientLayout({
  children,
  user,
  userRole,
}: DashboardClientLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation items based on user role
  const getNavItems = (): NavItem[] => {
    if (userRole === Role.ADMIN) {
      return [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Users", href: "/admin/dashboard/users", icon: Users },
        { name: "Members", href: "/admin/dashboard/members", icon: UserCheck },
        {
          name: "Manage Ideas",
          href: "/admin/dashboard/ideas",
          icon: Lightbulb,
        },
        { name: "Categories", href: "/admin/dashboard/categories", icon: Tag },
        { name: "Blog", href: "/admin/dashboard/blog", icon: BookOpen },
        {
          name: "Analytics",
          href: "/admin/dashboard/analytics",
          icon: TrendingUp,
        },
      ];
    }

    if (userRole === Role.MEMBER) {
      return [
        { name: "Overview", href: "/member/dashboard", icon: LayoutDashboard },
        { name: "My Ideas", href: "/member/dashboard/ideas", icon: Lightbulb },
        {
          name: "Create Idea",
          href: "/member/dashboard/create",
          icon: FileText,
        },
        { name: "Drafts", href: "/member/dashboard/drafts", icon: Eye },
        { name: "Watchlist", href: "/member/dashboard/watchlist", icon: Star },
        {
          name: "Analytics",
          href: "/member/dashboard/analytics",
          icon: TrendingUp,
        },
        {
          name: "Settings",
          href: "/member/dashboard/settings",
          icon: Settings,
        },
      ];
    }

    // Regular user
    return [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      {
        name: "Become Member",
        href: "/dashboard/become-member",
        icon: UserPlus,
      },
      { name: "Watchlist", href: "/dashboard/watchlist", icon: Star },
      { name: "My Activity", href: "/dashboard/activity", icon: TrendingUp },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully", { id: toastId });
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          },
          onError: (error) => {
            console.error("Sign out error:", error);
            toast.error("Failed to sign out", { id: toastId });
            setIsLoggingOut(false);
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Something went wrong", { id: toastId });
      setIsLoggingOut(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href === "/member/dashboard" && pathname === "/member/dashboard")
      return true;
    if (href === "/admin/dashboard" && pathname === "/admin/dashboard")
      return true;
    if (
      href !== "/dashboard" &&
      href !== "/member/dashboard" &&
      href !== "/admin/dashboard" &&
      pathname.startsWith(href)
    )
      return true;
    return false;
  };

  const getUserDisplayName = () => {
    if (userRole === Role.ADMIN) return "Admin";
    if (userRole === Role.MEMBER) return "Member";
    return "User";
  };

  const getUserBadge = () => {
    if (userRole === Role.ADMIN) return "Administrator";
    if (userRole === Role.MEMBER) return "Premium Member";
    return "Free User";
  };

  const getUserInitial = () => {
    if (userRole === Role.ADMIN) return "A";
    if (userRole === Role.MEMBER) return "M";
    return "U";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Sidebar - Desktop */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800
          transition-all duration-300 z-30
          ${isSidebarOpen ? "w-72" : "w-20"}
          hidden lg:block
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Leaf className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
              </motion.div>
              <span className="text-lg lg:text-xl font-bold text-green-600 dark:text-green-500">
                EcoSpark Hub
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                {getUserInitial()}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {getUserBadge()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      active
                        ? "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    }
                    ${!isSidebarOpen && "justify-center"}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && (
                    <>
                      <span className="flex-1 text-sm font-medium">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-500">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50
                ${!isSidebarOpen && "justify-center"}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && (
                <span className="text-sm font-medium">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-900 z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 group flex-shrink-0"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Leaf className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                    </motion.div>
                    <span className="text-lg lg:text-xl font-bold text-green-600 dark:text-green-500">
                      EcoSpark Hub
                    </span>
                  </Link>

                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                      {getUserInitial()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name || getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getUserBadge()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                          ${
                            active
                              ? "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-500"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-sm font-medium">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-500">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all disabled:opacity-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300
          ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}
        `}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1" />
              <div className="flex items-center space-x-4">
                <Button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all relative">
                  <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
