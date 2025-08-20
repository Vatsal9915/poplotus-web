"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { useWishlist } from "./wishlist-context"
import CartDropdown from "./cart-dropdown"
import WishlistDropdown from "./wishlist-dropdown"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Blogs & Recipes", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { totalItems } = useCart()
  const { wishlistCount } = useWishlist()

  const handleNavClick = () => {
    setIsMenuOpen(false)
    // Scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group" onClick={handleNavClick}>
              <span className="font-serif text-2xl font-bold text-gray-900 group-hover:text-gold transition-colors duration-300">
                PopLotus
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-gray-700 hover:text-gold transition-all duration-300 relative group py-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              {/* Action buttons container with consistent spacing */}
              <div className="flex items-center space-x-3">
                {/* Wishlist button */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300"
                >
                  <Heart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Shop Now button with consistent height */}
                <Link href="/products" onClick={handleNavClick}>
                  <Button className="relative bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold text-white font-semibold px-6 py-2 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 overflow-hidden group border border-gold/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Sparkles className="w-4 h-4 animate-pulse relative z-10" />
                    <span className="relative z-10">Shop Now</span>
                    <ShoppingBag className="w-4 h-4 relative z-10" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gold transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-gold hover:bg-gold/5 rounded-lg transition-all duration-300"
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/products" onClick={handleNavClick}>
                  <Button className="w-full mt-2 bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-4 h-4" />
                    Shop Now
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDropdown isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  )
}
