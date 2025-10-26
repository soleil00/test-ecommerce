export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">Discover Amazing Products</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
            Shop the latest trends and find everything you need in our carefully curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Shop Now
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
