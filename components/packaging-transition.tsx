"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const products = [
  {
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    color: "from-red-400 to-orange-400",
  },
  {
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    color: "from-pink-400 to-teal-400",
  },
  {
    name: "Tomato Chilli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Pudina",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    color: "from-green-400 to-emerald-400",
  },
  {
    name: "Cream & Onion",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    color: "from-green-300 to-teal-300",
  },
]

export default function PackagingTransition() {
  const [currentProduct, setCurrentProduct] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Premium Flavors</h2>
          <p className="text-lg text-amber-700 mb-12">Discover the perfect taste for every craving</p>

          {/* Product Transition */}
          <div className="relative mb-12">
            <div className="relative w-80 h-96 md:w-96 md:h-[28rem] mx-auto">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentProduct
                      ? "opacity-100 scale-100 rotate-0"
                      : index === (currentProduct - 1 + products.length) % products.length
                        ? "opacity-0 scale-95 -rotate-12"
                        : "opacity-0 scale-90 rotate-12"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-20 blur-3xl scale-110 animate-pulse`}
                    ></div>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`PopLotus ${product.name} Makhana`}
                      fill
                      className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-2xl font-semibold text-amber-800">{products[currentProduct].name}</p>
            </div>
          </div>

          {/* Product Dots */}
          <div className="flex justify-center space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProduct ? "bg-gold scale-125" : "bg-gold/30 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
