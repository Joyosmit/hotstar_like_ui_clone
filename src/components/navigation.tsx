"use client"

import { Search, Bell, User, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { useState } from "react"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold hidden sm:block">HOTSTAR</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              HOMEPAGE
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              PREMIUM
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              LIVE
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              CATEGORIES
            </a>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hidden sm:flex">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm hidden sm:block">COINS</span>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              HOMEPAGE
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              PREMIUM
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              LIVE
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
              CATEGORIES
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
