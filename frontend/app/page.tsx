import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Business", icon: "💼", count: "150+ experts" },
  { name: "Legal", icon: "⚖️", count: "80+ experts" },
  { name: "Health", icon: "🏥", count: "200+ experts" },
  { name: "Technology", icon: "💻", count: "120+ experts" },
  { name: "Finance", icon: "💰", count: "90+ experts" },
  { name: "Marketing", icon: "📈", count: "110+ experts" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Startup Founder",
    content:
      "Found the perfect business consultant within minutes. The session was incredibly valuable and helped me pivot my strategy.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The tech experts here are top-notch. Got my architecture questions answered and learned so much in just one session.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content: "Legal advice made simple. The expert walked me through contract negotiations step by step.",
    rating: 5,
  },
]

const steps = [
  {
    step: "1",
    title: "Browse Experts",
    description: "Search through our verified experts by category, rating, and availability",
  },
  {
    step: "2",
    title: "Book a Session",
    description: "Choose your preferred time slot and book instantly with secure payment",
  },
  {
    step: "3",
    title: "Get Expert Advice",
    description: "Connect via video call and get personalized guidance from industry professionals",
  },
  {
    step: "4",
    title: "Follow Up",
    description: "Access session recordings and continue the conversation via chat",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">ExpertConnect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/experts" className="text-slate-600 hover:text-slate-900">
              Find Experts
            </Link>
            <Link href="/how-it-works" className="text-slate-600 hover:text-slate-900">
              How it Works
            </Link>
            <Link href="/become-expert" className="text-slate-600 hover:text-slate-900">
              Become an Expert
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Connect with
            <span className="text-teal-600"> Expert Advice</span>
            <br />
            in Minutes
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from verified professionals across business, legal, health, tech, and more. Book
            instantly, meet virtually.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/experts">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
                Find an Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                How it Works
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-slate-600">Verified Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">10k+</div>
              <div className="text-slate-600">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">4.9★</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Expert Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find specialists in your field of interest from our diverse network of verified professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How ExpertConnect Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Get expert advice in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Users Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real stories from people who found the expert guidance they needed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Expert Advice?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found the guidance they needed to succeed
          </p>
          <Link href="/experts">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 text-lg px-8 py-3">
              Browse Experts Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold">ExpertConnect</span>
              </div>
              <p className="text-slate-400">Connecting you with expert advice when you need it most.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/experts" className="hover:text-white">
                    Find Experts
                  </Link>
                </li>
                <li>
                  <Link href="/become-expert" className="hover:text-white">
                    Become an Expert
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ExpertConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
