import Navigation from "@/components/navigation"
import PackagingTransition from "@/components/packaging-transition"
import ProductsGrid from "@/components/products-grid"
import CalorieCalculator from "@/components/calorie-calculator"
import Footer from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <PackagingTransition />
        <ProductsGrid />
        <CalorieCalculator />
      </main>
      <Footer />
    </div>
  )
}
