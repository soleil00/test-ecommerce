"use client"

import { useAppSelector } from "@/lib/hooks"
import { ProductCard } from "./product-card"

export function ProductGrid() {
  const { items: products, selectedCategory } = useAppSelector((state) => state.products)

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">{selectedCategory ? selectedCategory : "All Products"}</h2>
        <p className="text-muted-foreground text-center">Discover our curated collection of premium products</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
