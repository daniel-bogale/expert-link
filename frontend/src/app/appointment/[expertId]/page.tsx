"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const expertData = {
    name: "Ethan Carter",
    title: "Product Management Expert",
    image: "/placeholder.svg?height=80&width=80",
    specialization: "Product Management",
}

const availableTimes = [
    "9:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
]

export default function AppointmentPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const handleContinue = () => {
        if (selectedDate && selectedTime) {
            // Handle appointment booking logic
            console.log("Booking appointment for:", selectedDate, selectedTime)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                ExpertConnect
                            </Link>
                            <nav className="hidden md:flex space-x-6">
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Browse
                                </Link>
                                <Link href="/experts" className="text-gray-600 hover:text-gray-900">
                                    Experts
                                </Link>
                                <Link href="/enterprise" className="text-gray-600 hover:text-gray-900">
                                    Enterprise
                                </Link>
                                <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                                    Resources
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 hover:text-gray-900">
                                Log in
                            </Link>
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link href="/experts" className="text-gray-500 hover:text-gray-700">
                                    Experts
                                </Link>
                            </li>
                            <li>
                                <span className="text-gray-500">/</span>
                            </li>
                            <li>
                                <span className="text-gray-900 font-medium">Product Management</span>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Expert Info */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={expertData.image || "/placeholder.svg"}
                                alt={expertData.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{expertData.name}</h1>
                                <p className="text-gray-600">{expertData.title}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Select Time Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Select a time</h2>

                    {/* Calendar Section */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* October 2024 */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">October 2024</h3>
                                        <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                        {/* Header */}
                                        <div className="font-medium text-gray-500 py-2">S</div>
                                        <div className="font-medium text-gray-500 py-2">M</div>
                                        <div className="font-medium text-gray-500 py-2">T</div>
                                        <div className="font-medium text-gray-500 py-2">W</div>
                                        <div className="font-medium text-gray-500 py-2">T</div>
                                        <div className="font-medium text-gray-500 py-2">F</div>
                                        <div className="font-medium text-gray-500 py-2">S</div>

                                        {/* Calendar Days */}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                            <button
                                                key={day}
                                                className={`p-2 rounded-full hover:bg-gray-100 ${day === 4 ? "bg-blue-500 text-white" : "text-gray-900"
                                                    }`}
                                                onClick={() => setSelectedDate(new Date(2024, 9, day))}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* November 2024 */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">November 2024</h3>
                                        <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                        {/* Header */}
                                        <div className="font-medium text-gray-500 py-2">S</div>
                                        <div className="font-medium text-gray-500 py-2">M</div>
                                        <div className="font-medium text-gray-500 py-2">T</div>
                                        <div className="font-medium text-gray-500 py-2">W</div>
                                        <div className="font-medium text-gray-500 py-2">T</div>
                                        <div className="font-medium text-gray-500 py-2">F</div>
                                        <div className="font-medium text-gray-500 py-2">S</div>

                                        {/* Calendar Days */}
                                        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                            <button
                                                key={day}
                                                className="p-2 rounded-full hover:bg-gray-100 text-gray-900"
                                                onClick={() => setSelectedDate(new Date(2024, 10, day))}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Available Times */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available times</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {availableTimes.map((time) => (
                                <Button
                                    key={time}
                                    variant={selectedTime === time ? "default" : "outline"}
                                    className={`${selectedTime === time ? "bg-teal-600 hover:bg-teal-700 text-white" : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="flex justify-end pt-6">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            onClick={handleContinue}
                            disabled={!selectedDate || !selectedTime}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
