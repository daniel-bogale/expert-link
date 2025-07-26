"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Scale,
  Heart,
  Laptop,
  DollarSign,
  GraduationCap,
  Search,
  Calendar,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth_wrapper"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src="/globe.svg" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold text-gray-900">ExpertConnect</span>
            </div>
            <nav className="flex items-center space-x-6 text-base font-semibold">
              <Link href="/category" className="text-gray-600 hover:text-gray-900">
                Category
              </Link>
              <Link href="/staff" className="text-gray-600 hover:text-gray-900">
                Staff
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                How it works
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="default" className="bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/register">
                      Find an Expert
                    </Link>
                  </Button>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900">
                    Log In
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Connect with Top Experts in Minutes</h1>
              <p className="text-xl text-gray-600 mb-8">
                Get instant access to verified experts across multiple domains. Schedule live consultations or chat with
                our intelligent assistants.
              </p>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">
                Find an Expert
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/globe.svg"
                alt="Expert consultation illustration"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expert Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore Expert Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Business */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
                <p className="text-gray-600">
                  Strategy, planning, operations, and growth consulting from experienced business professionals.
                </p>
              </CardContent>
            </Card>

            {/* Legal */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal</h3>
                <p className="text-gray-600">
                  Legal advice, contract review, and consultation from qualified attorneys and legal experts.
                </p>
              </CardContent>
            </Card>

            {/* Health */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Health</h3>
                <p className="text-gray-600">
                  Medical advice, wellness coaching, and health consultations from certified professionals.
                </p>
              </CardContent>
            </Card>

            {/* Tech */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tech</h3>
                <p className="text-gray-600">
                  Software development, IT consulting, and technology guidance from industry experts.
                </p>
              </CardContent>
            </Card>

            {/* Finance */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Finance</h3>
                <p className="text-gray-600">
                  Investment advice, financial planning, and wealth management from certified advisors.
                </p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600">
                  Academic tutoring, career guidance, and educational consulting from qualified educators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/file.svg"
                  alt="Sarah's profile"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sarah's Business Breakthrough</h3>
                <p className="text-gray-600 text-sm">
                  "I got a marketing expert who helped me develop a strategy that increased my sales by 300% in just 3
                  months."
                </p>
              </CardContent>
            </Card>

            {/* Story 2 */}
            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/window.svg"
                  alt="Mark's profile"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mark's Legal Victory</h3>
                <p className="text-gray-600 text-sm">
                  "The legal expert I consulted helped me understand my contract dispute and guided me to a favorable
                  resolution."
                </p>
              </CardContent>
            </Card>

            {/* Story 3 */}
            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/globe.svg"
                  alt="Emily's profile"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emily's Health Transformation</h3>
                <p className="text-gray-600 text-sm">
                  "The health expert gave me personalized advice that helped me achieve my wellness goals in record
                  time."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Simple Steps to Expert Advice</h3>
            <p className="text-gray-600">Our platform makes it easy to connect with the right expert for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Expert</h3>
              <p className="text-gray-600">
                Browse through our verified experts and find the perfect match for your specific needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule a Session</h3>
              <p className="text-gray-600">
                Book a convenient time slot that works for both you and your chosen expert.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Expert Advice</h3>
              <p className="text-gray-600">
                Connect with your expert through live video calls or chat for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">ExpertConnect</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-300 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-400">© 2024 ExpertConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
