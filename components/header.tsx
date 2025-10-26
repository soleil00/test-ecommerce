"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleCart } from "@/lib/features/cart/cartSlice"
import { setSelectedCategory } from "@/lib/features/products/productsSlice"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useAppSelector((state) => state.cart)
  const { categories, selectedCategory } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category === "All" ? null : category))
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">ModernStore</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  (category === "All" && !selectedCategory) || selectedCategory === category
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => dispatch(toggleCart())} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Cart
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    (category === "All" && !selectedCategory) || selectedCategory === category
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
              <Link
                href="/cart"
                className="text-left px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Cart ({itemCount})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
