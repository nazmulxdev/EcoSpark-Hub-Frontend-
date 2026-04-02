"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Leaf,
} from "lucide-react";

import { Role } from "@/types/enums";
import { getAuthSession } from "@/actions/client/auth.client";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import { authClientService } from "@/services/auth/auth.service.client";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await getAuthSession();

        if (!result) {
          setIsLoggedIn(false);
          setUserRole(null);
          return;
        }

        const { data, error } = result;

        if (error) {
          setIsLoggedIn(false);
          setUserRole(null);
        } else if (data?.user) {
          setIsLoggedIn(true);
          setUserRole(data.user.role as Role);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoggedIn(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ideas", label: "Ideas" },
    { href: "/about", label: "About Us" },
    { href: "/blogs", label: "Blogs" },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    setIsOpen(false);
    await authClientService.signOut();
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-8 h-8 bg-green-500/20 rounded-full animate-pulse" />
          <div className="ml-2 w-32 h-6 bg-green-500/20 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation - Full Width */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            isScrolled
              ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-lg"
              : "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-zinc-800/50"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
              onClick={() => setIsOpen(false)}
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

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1 bg-gray-50 dark:bg-zinc-900/50 rounded-full p-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium
                      ${
                        isActive(link.href)
                          ? "bg-green-500 text-white shadow-md"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <ModeToggle />

              {isLoggedIn ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <Link
                    href={
                      userRole === Role.ADMIN
                        ? "/admin/dashboard"
                        : userRole === Role.MEMBER
                          ? "/member/dashboard"
                          : "/dashboard"
                    }
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200 text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200 text-sm font-medium flex items-center gap-2 text-red-600 dark:text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200 text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Slide from Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-white dark:bg-zinc-950 shadow-2xl"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Leaf className="w-8 h-8 text-green-500" />
                <span className="text-xl font-bold text-green-600 dark:text-green-500">
                  EcoSpark Hub
                </span>
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="p-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        isActive(link.href)
                          ? "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-500 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-zinc-800 my-4" />

              {/* Theme Toggle Mobile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-gray-600 dark:text-gray-400">Theme</span>
                <ModeToggle />
              </motion.div>

              {/* Auth Buttons Mobile */}
              {isLoggedIn ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2 pt-4"
                >
                  <Link
                    href={
                      userRole === Role.ADMIN
                        ? "/admin/dashboard"
                        : userRole === Role.MEMBER
                          ? "/member/dashboard"
                          : "/dashboard"
                    }
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      Dashboard
                    </span>
                    <LayoutDashboard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all text-red-600 dark:text-red-500"
                  >
                    <span>Logout</span>
                    <LogOut className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2 pt-4"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      Login
                    </span>
                    <LogIn className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-green-500 text-white"
                  >
                    <span>Sign Up</span>
                    <UserPlus className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
