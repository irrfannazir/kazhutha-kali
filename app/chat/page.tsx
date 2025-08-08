'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Send, MessageCircle } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: Date
}

const annoyingResponses = [
  "What? That doesn't make any sense. You're not explaining it right.",
  "I still don't get it. Can you be more clear?",
  "That's not what I meant. You're misunderstanding my question.",
  "Ugh, this is so confusing. Why can't you just give me a straight answer?",
  "I don't think you know what you're talking about.",
  "That's not helpful at all. Can someone else help me?",
  "You're making this way more complicated than it needs to be.",
  "I already tried that and it didn't work. What else?",
  "That's obvious. I need actual help, not basic stuff.",
  "Are you even listening to what I'm asking?",
  "This is frustrating. You're not helping at all.",
  "I don't have time for this. Just tell me the answer.",
  "That's not what Google says. Are you sure?",
  "Whatever, I'll figure it out myself.",
  "This is stupid. Why is this so hard?",
  "You're just confusing me more. Forget it.",
  "I don't understand why you can't just give me a simple answer.",
  "That doesn't work. What's your next brilliant idea?",
  "I've been trying that for hours. Obviously it's not working.",
  "Can you actually help me or not?"
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey, I need help with something. Can you explain how this works?",
      sender: 'other',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (inputValue.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay and send annoying response
    setTimeout(() => {
      const randomResponse = annoyingResponses[Math.floor(Math.random() * annoyingResponses.length)]
      const responseMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'other',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, responseMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900">Chat Room</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback className="bg-red-500 text-white">?</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Difficult Person</p>
                <p className="text-sm text-gray-500">Ask me anything... if you dare</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={sendMessage} disabled={isTyping || inputValue.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
