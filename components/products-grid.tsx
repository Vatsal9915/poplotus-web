"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Heart, Gift, ShoppingCart, Plus } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"
import { useWishlist } from "./wishlist-context"
import ProductDetailsPopup from "./product-details-popup"
import Product3DViewer from "./product-3d-viewer"
import WishlistNotification from "./wishlist-notification"

const ourProducts = [
  {
    id: "cream-onion-40g",
    name: "Cream & Onion Makhana",
    description:
      "Creamy and savory blend with the perfect hint of onion. A sophisticated flavor that's both comforting and exciting.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    price: 299,
    weight: "40g",
    tags: ["New", "Popular"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "cheese-90g",
    name: "Cheese Makhana",
    description:
      "Rich, cheesy goodness that melts in your mouth. Perfect for cheese lovers seeking a healthy alternative.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    price: 329,
    weight: "90g",
    tags: ["Bestseller", "Savory"],
    nutritionHighlights: ["High Protein", "Low Fat", "Gluten Free"],
  },
  {
    id: "pink-salt-250g",
    name: "Himalayan Pink Salt",
    description: "Pure makhana with premium Himalayan pink salt. Simple elegance with mineral-rich goodness.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    price: 349,
    weight: "250g",
    tags: ["Premium", "Natural"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "tomato-chilli-90g",
    name: "Tomato Chilli Makhana",
    description: "Tangy tomato with a spicy kick. Bold flavors that awaken your taste buds with every bite.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    price: 319,
    weight: "90g",
    tags: ["Spicy", "Bold"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "pudina-40g",
    name: "Pudina Makhana",
    description:
      "Fresh mint flavor that's refreshing and invigorating. Perfect for a cool, crispy snacking experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    price: 299,
    weight: "40g",
    tags: ["Fresh", "Cooling"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "peri-peri-90g",
    name: "Peri Peri Makhana",
    description:
      "Fiery peri peri spices for those who love heat. An intense flavor journey that's absolutely addictive.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    price: 329,
    weight: "90g",
    tags: ["Hot", "Spicy"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "raw-makhana-250g",
    name: "Raw Makhana",
    description: "Pure, natural lotus seeds in their original form. Perfect for home cooking or healthy snacking.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/raw%20makhana-npD1T7NkCGwKO4yOMcJ5vNPkmtKACt.png",
    price: 249,
    weight: "250g",
    tags: ["Natural", "Versatile"],
    nutritionHighlights: ["100% Natural", "Vegan", "Gluten-free", "High Protein"],
  },
]

const giftingProducts = [
  {
    id: "discovery-box",
    name: "Flavor Discovery Box",
    description:
      "Experience all six premium flavors in one elegant gift box. Perfect for sharing or discovering your favorite.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample-5F5Y6dW7CHMY7bJ4pXMgbEm41Xh0uY.png",
    price: 599,
    weight: "6 x 10g",
    tags: ["Gift Box", "Bestseller"],
    nutritionHighlights: ["All Flavors", "Gift Ready", "Premium Packaging"],
  },
]

export default function ProductsGrid() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false)
  const [wishlistNotification, setWishlistNotification] = useState<{ show: boolean; productName: string }>({
    show: false,
    productName: "",
  })

  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
      setWishlistNotification({ show: true, productName: product.name })
    }
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.weight,
    })
  }

  const handleEnquire = (product: any) => {
    setSelectedProduct(product)
    setIsPopupOpen(true)
  }

  const handleQuickView = (product: any) => {
    setSelectedProduct(product)
    setIs3DViewerOpen(true)
  }

  const ProductCard = ({ product, showGiftIcon = false }: { product: any; showGiftIcon?: boolean }) => (
    <Card
      key={product.id}
      className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
          />

          {hoveredProduct === product.id && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300"></div>
          )}

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.tags.map((tag: string) => (
              <Badge key={tag} className="bg-gold text-white text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group/heart"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isInWishlist(product.id)
                  ? "fill-red-500 text-red-500 animate-pulse"
                  : "text-gray-600 hover:text-red-500 group-hover/heart:scale-110"
              }`}
            />
          </button>

          {/* Gift icon for gifting products */}
          {showGiftIcon && (
            <div className="absolute bottom-4 left-4">
              <Gift className="w-6 h-6 text-gold animate-pulse" />
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl font-semibold text-gray-900">{product.name}</h3>
            <div className="text-right">
              <p className="font-bold text-gold text-lg">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.weight}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{product.description}</p>

          {/* Nutrition highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.nutritionHighlights.map((highlight: string) => (
                <span key={highlight} className="text-xs bg-beige/30 text-gray-700 px-2 py-1 rounded-full">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleAddToCart(product)} className="flex-1 bg-gold hover:bg-gold/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={() => handleEnquire(product)}
              variant="outline"
              className="flex-1 border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
            >
              {product.tags.includes("Sample") ? "Order Sample" : "Enquire"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Products Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Premium makhana in exciting flavors, crafted with the finest ingredients for your healthy snacking
                pleasure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ourProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Gifting Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <Gift className="w-8 h-8 inline-block mr-3 text-gold" />
                Gifting
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Thoughtfully curated gift boxes perfect for sharing the joy of healthy snacking with your loved ones
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {giftingProducts.map((product) => (
                <ProductCard key={product.id} product={product} showGiftIcon={true} />
              ))}
            </div>
          </section>

          {/* Order Samples Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <ShoppingCart className="w-8 h-8 inline-block mr-3 text-gold" />
                Order Samples
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Not sure which flavor to choose? Try our sample sizes to discover your perfect match before ordering
                full packs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sample products will be mapped here */}
            </div>
          </section>

          {/* Call to action */}
          <div className="text-center mt-16 bg-beige/20 rounded-2xl p-12">
            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Still can't decide?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start with our Flavor Discovery Box to experience all our premium varieties, or contact our team for
              personalized recommendations based on your taste preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  handleAddToCart({
                    id: "discovery-box",
                    name: "Flavor Discovery Box",
                    price: 599,
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample-5F5Y6dW7CHMY7bJ4pXMgbEm41Xh0uY.png",
                    weight: "6 x 10g",
                  })
                }
                className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg"
              >
                Shop Discovery Box
              </Button>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                Get Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailsPopup product={selectedProduct} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <Product3DViewer product={selectedProduct} isOpen={is3DViewerOpen} onClose={() => setIs3DViewerOpen(false)} />
      <WishlistNotification
        show={wishlistNotification.show}
        productName={wishlistNotification.productName}
        onClose={() => setWishlistNotification({ show: false, productName: "" })}
      />
    </>
  )
}
