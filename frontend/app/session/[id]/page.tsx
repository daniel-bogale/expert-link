"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, VideoOff, Mic, MicOff, Monitor, MessageCircle, Phone, Settings, Send, Clock, Users } from "lucide-react"

const expert = {
  name: "Dr. Sarah Mitchell",
  field: "Business Strategy",
  image: "/placeholder.svg?height=60&width=60",
}

const chatMessages = [
  {
    id: 1,
    sender: "expert",
    message: "Hello! I'm excited to discuss your business strategy today. What specific challenges are you facing?",
    timestamp: "2:00 PM",
  },
  {
    id: 2,
    sender: "user",
    message: "Hi Dr. Mitchell! I'm struggling with our go-to-market strategy for our new SaaS product.",
    timestamp: "2:01 PM",
  },
  {
    id: 3,
    sender: "expert",
    message: "Great! Let's dive into that. Can you tell me more about your target market and current positioning?",
    timestamp: "2:02 PM",
  },
]

export default function LiveSession() {
  const [sessionTime, setSessionTime] = useState(0)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(chatMessages)

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "user" as const,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const endSession = () => {
    // Handle session end
    window.location.href = "/dashboard"
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={expert.image || "/placeholder.svg"} />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-white font-semibold">{expert.name}</h1>
            <p className="text-slate-300 text-sm">{expert.field}</p>
          </div>
          <Badge className="bg-green-100 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Live
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(sessionTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Users className="h-4 w-4" />
            <span>2 participants</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className={`${showChat ? "flex-1" : "w-full"} relative`}>
          {/* Main Video */}
          <div className="h-full bg-slate-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={expert.image || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">SM</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{expert.name}</h2>
                <p className="text-slate-300">Video call in progress</p>
              </div>
            </div>

            {/* Self Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-slate-700 rounded-lg border-2 border-slate-600">
              <div className="h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">You</p>
                </div>
              </div>
            </div>

            {/* Screen Share Indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Screen Sharing</span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Session Chat</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === "user" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-slate-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" className="bg-teal-600 hover:bg-teal-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isAudioOn ? "secondary" : "destructive"}
            size="icon"
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="rounded-full w-12 h-12"
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="icon"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="rounded-full w-12 h-12"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button
            variant={showChat ? "default" : "secondary"}
            size="icon"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>

          <Button variant="secondary" size="icon" className="rounded-full w-12 h-12">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="destructive" onClick={endSession} className="rounded-full px-6 py-3 ml-8">
            <Phone className="h-4 w-4 mr-2" />
            End Session
          </Button>
        </div>
      </div>
    </div>
  )
}
