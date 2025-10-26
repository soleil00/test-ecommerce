import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
