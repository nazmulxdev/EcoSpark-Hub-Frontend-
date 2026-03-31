import Link from "next/link";
import { Mail, Phone, MapPin, Leaf, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      {/* Newsletter Section */}
      <div className="w-full border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get the latest sustainability ideas and news
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 group w-fit"
              >
                <Leaf className="w-8 h-8 text-green-500 transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  EcoSpark Hub
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Connecting visionary minds with sustainable solutions to build a
                regenerative future for all.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ideas"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    All Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
                  <Mail className="w-4 h-4 flex-shrink-0 group-hover:text-green-500 transition-colors" />
                  <span className="text-sm break-all">
                    hello@ecosparkhub.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
                  <Phone className="w-4 h-4 flex-shrink-0 group-hover:text-green-500 transition-colors" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
                  <MapPin className="w-4 h-4 flex-shrink-0 group-hover:text-green-500 transition-colors" />
                  <span className="text-sm">
                    123 Green Way, Eco City, 12345
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
              Made with <span className="inline-block animate-pulse">🌱</span>{" "}
              for a better planet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
