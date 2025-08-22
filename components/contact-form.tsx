"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { ...formData, file })
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+91 81004 97917</p>
                  <p className="text-gray-600">+91 90074 08609</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@poplotus.in</p>
                  <p className="text-gray-600">support@poplotus.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    Nutralike Superfoods Pvt. Ltd.
                    <br />
                    7, Bangur Avenue, Block D
                    <br />
                    Kolkata, West Bengal - 700055
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 border-gray-300 focus:border-gold focus:ring-gold"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 border-gray-300 focus:border-gold focus:ring-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-gold focus:ring-gold"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-gold focus:ring-gold min-h-32"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="file" className="text-gray-700 font-medium">
                      Attach File (Optional)
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gold transition-colors">
                      <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="file" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">{file ? file.name : "Click to upload or drag and drop"}</p>
                        <p className="text-sm text-gray-500 mt-1">PDF, DOC, JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-white py-3 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Experience Our Brand</h2>
            <p className="text-gray-600 mt-2">Interactive 3D visualization of our premium makhana products</p>
          </div>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://my.spline.design/claritystream-IOe7gTloZ13C1PFWgO3UhOM6/"
              width="100%"
              height="100%"
              frameBorder="0"
              title="PopLotus 3D Experience"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
