"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Video, MessageCircle, CreditCard, Shield, ChevronLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock expert data
const expert = {
  id: 1,
  name: "Dr. Sarah Mitchell",
  field: "Business Strategy",
  hourlyRate: 150,
  image: "/placeholder.svg?height=80&width=80",
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    sessionType: "video",
    date: "2024-12-26",
    time: "2:00 PM",
    duration: "60",
    topic: "",
    description: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingName: "",
    billingEmail: "",
    agreeTerms: false,
    allowRecording: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    const sessionCost = expert.hourlyRate * (Number.parseInt(formData.duration) / 60)
    const platformFee = 15
    return sessionCost + platformFee
  }

  const handleSubmit = () => {
    // Handle booking submission
    setStep(4) // Go to confirmation
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-slate-900">ExpertConnect</span>
            </Link>
          </div>
        </header>

        {/* Confirmation Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
            <p className="text-slate-600 mb-8">
              Your session with {expert.name} has been successfully booked. You'll receive a confirmation email shortly.
            </p>

            <Card className="bg-white text-left mb-8">
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={expert.image || "/placeholder.svg"} alt={expert.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-sm text-slate-600">{expert.field}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Date:</span>
                    <p className="font-medium">December 26, 2024</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Time:</span>
                    <p className="font-medium">{formData.time}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Duration:</span>
                    <p className="font-medium">{formData.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Type:</span>
                    <p className="font-medium capitalize">{formData.sessionType} call</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Paid:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-teal-600 hover:bg-teal-700">Go to Dashboard</Button>
              </Link>
              <Button variant="outline">Add to Calendar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/experts/${expert.id}`}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Profile</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">ExpertConnect</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-teal-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-20">
            <span className="text-sm text-slate-600">Session Details</span>
            <span className="text-sm text-slate-600">Information</span>
            <span className="text-sm text-slate-600">Payment</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{expert.name}</h3>
                      <p className="text-slate-600">{expert.field}</p>
                      <p className="text-teal-600 font-medium">${expert.hourlyRate}/hour</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Session Type</Label>
                    <RadioGroup
                      value={formData.sessionType}
                      onValueChange={(value) => handleInputChange("sessionType", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="video" id="video" />
                        <Video className="h-4 w-4" />
                        <Label htmlFor="video">Video Call</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="chat" id="chat" />
                        <MessageCircle className="h-4 w-4" />
                        <Label htmlFor="chat">Chat Session</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Date</Label>
                      <div className="mt-2 p-3 border rounded-lg flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span>December 26, 2024</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Time</Label>
                      <div className="mt-2 p-3 border rounded-lg flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>{formData.time}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Duration</Label>
                    <RadioGroup
                      value={formData.duration}
                      onValueChange={(value) => handleInputChange("duration", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="30min" />
                        <Label htmlFor="30min">30 minutes - ${expert.hourlyRate / 2}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="60" id="60min" />
                        <Label htmlFor="60min">60 minutes - ${expert.hourlyRate}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="90" id="90min" />
                        <Label htmlFor="90min">90 minutes - ${expert.hourlyRate * 1.5}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="topic" className="text-base font-medium">
                      Session Topic
                    </Label>
                    <Input
                      id="topic"
                      placeholder="What would you like to discuss?"
                      value={formData.topic}
                      onChange={(e) => handleInputChange("topic", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-medium">
                      Additional Details
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide any additional context or specific questions you'd like to cover..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={!formData.topic}
                  >
                    Continue to Information
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingName" className="text-base font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="billingName"
                        placeholder="John Doe"
                        value={formData.billingName}
                        onChange={(e) => handleInputChange("billingName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingEmail" className="text-base font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="billingEmail"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.billingEmail}
                        onChange={(e) => handleInputChange("billingEmail", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowRecording"
                        checked={formData.allowRecording}
                        onCheckedChange={(checked) => handleInputChange("allowRecording", checked)}
                      />
                      <Label htmlFor="allowRecording" className="text-sm">
                        Allow session recording for future reference
                      </Label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      disabled={!formData.billingName || !formData.billingEmail}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-700">Your payment information is secure and encrypted</span>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-4 w-4" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-base font-medium">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-base font-medium">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-base font-medium">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-teal-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-teal-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      disabled={!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.agreeTerms}
                    >
                      Complete Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div>
            <Card className="bg-white sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={expert.image || "/placeholder.svg"} alt={expert.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-sm text-slate-600">{expert.field}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span>Dec 26, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span>{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span>{formData.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Type:</span>
                    <span className="capitalize">{formData.sessionType}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Session ({formData.duration} min)</span>
                    <span>${expert.hourlyRate * (Number.parseInt(formData.duration) / 60)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Platform fee</span>
                    <span>$15</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>

                <div className="text-xs text-slate-500 mt-4">
                  <p>• Free cancellation up to 24 hours before session</p>
                  <p>• Session recording available if enabled</p>
                  <p>• Follow-up chat included for 48 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
