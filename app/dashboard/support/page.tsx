"use client"

import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MailIcon,
  MessageSquareIcon,
  SendIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  BarChart2Icon,
  ThumbsUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  RefreshCwIcon,
} from "lucide-react"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("email")
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [selectedSocial, setSelectedSocial] = useState(null)
  const [activePlatform, setActivePlatform] = useState("all")
  const [socialResponse, setSocialResponse] = useState("")

  // Sample data for emails
  const emails = [
    {
      id: 1,
      from: "John Smith",
      email: "john.smith@example.com",
      subject: "Issue with payment processing",
      message: "Hello, I've been trying to make a payment but keep getting an error. Can you help?",
      time: "10:23 AM",
      date: "Today",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      from: "Sarah Johnson",
      email: "sarah.j@example.com",
      subject: "Account access problem",
      message: "I can't log into my account. I've tried resetting my password but I'm not receiving the reset email.",
      time: "Yesterday",
      date: "May 4",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      from: "Michael Brown",
      email: "michael.b@example.com",
      subject: "Refund request",
      message: "I would like to request a refund for my recent purchase. The product doesn't meet my expectations.",
      time: "2:45 PM",
      date: "May 3",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      from: "Emily Davis",
      email: "emily.d@example.com",
      subject: "Product inquiry",
      message: "I'm interested in your premium plan but have some questions before I upgrade.",
      time: "11:30 AM",
      date: "May 2",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      from: "David Wilson",
      email: "david.w@example.com",
      subject: "Feature request",
      message: "I love your product but would like to suggest a new feature that would be really helpful.",
      time: "9:15 AM",
      date: "May 1",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Sample data for live chats
  const chats = [
    {
      id: 1,
      name: "Alex Thompson",
      lastMessage: "How do I change my subscription plan?",
      time: "Just now",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        { id: 1, sender: "user", message: "Hi, I need help with my subscription", time: "10:20 AM" },
        {
          id: 2,
          sender: "agent",
          message: "Hello Alex! I'd be happy to help you with your subscription. What seems to be the issue?",
          time: "10:22 AM",
        },
        { id: 3, sender: "user", message: "How do I change my subscription plan?", time: "10:23 AM" },
      ],
    },
    {
      id: 2,
      name: "Jessica Miller",
      lastMessage: "Thanks for your help!",
      time: "5m ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        { id: 1, sender: "user", message: "I can't find how to download my invoice", time: "9:45 AM" },
        {
          id: 2,
          sender: "agent",
          message: "Hi Jessica, you can find your invoices in the Account section under Billing History.",
          time: "9:47 AM",
        },
        { id: 3, sender: "user", message: "Found it! Thanks for your help!", time: "9:50 AM" },
      ],
    },
    {
      id: 3,
      name: "Robert Garcia",
      lastMessage: "Is there a mobile app available?",
      time: "15m ago",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "Hello, do you offer any discounts for annual subscriptions?",
          time: "9:30 AM",
        },
        {
          id: 2,
          sender: "agent",
          message: "Hi Robert! Yes, we offer a 20% discount for annual subscriptions compared to monthly billing.",
          time: "9:32 AM",
        },
        { id: 3, sender: "user", message: "Great! And is there a mobile app available?", time: "9:35 AM" },
      ],
    },
  ]

  // Sample data for social media messages
  const socialMessages = [
    {
      id: 1,
      platform: "twitter",
      username: "@customer_jane",
      name: "Jane Customer",
      message: "@YourCompany Your new feature is amazing! Just what I needed for my project.",
      time: "25m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      platform: "facebook",
      username: "Mark Rogers",
      name: "Mark Rogers",
      message: "Having trouble with the latest update. The app keeps crashing when I try to upload files.",
      time: "1h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      platform: "instagram",
      username: "@tech_enthusiast",
      name: "Tech Enthusiast",
      message: "Love the new UI design! Much more intuitive than before.",
      time: "3h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      platform: "linkedin",
      username: "Sarah Professional",
      name: "Sarah Professional",
      message: "Interested in enterprise solutions. Can someone from your team contact me?",
      time: "5h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Sample data for surveys and feedback
  const surveys = [
    {
      id: 1,
      title: "Customer Satisfaction Survey",
      responses: 245,
      completion: 68,
      averageRating: 4.2,
      status: "active",
    },
    {
      id: 2,
      title: "Product Feedback",
      responses: 189,
      completion: 75,
      averageRating: 3.8,
      status: "active",
    },
    {
      id: 3,
      title: "Website Usability",
      responses: 312,
      completion: 92,
      averageRating: 4.5,
      status: "completed",
    },
    {
      id: 4,
      title: "New Feature Feedback",
      responses: 78,
      completion: 45,
      averageRating: 4.0,
      status: "active",
    },
  ]

  // Sample data for support metrics
  const metrics = {
    averageResponseTime: "1h 23m",
    ticketsResolved: 87,
    customerSatisfaction: 92,
    openTickets: 34,
    agentsOnline: 8,
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <TwitterIcon className="h-4 w-4 text-blue-400" />
      case "facebook":
        return <FacebookIcon className="h-4 w-4 text-blue-600" />
      case "instagram":
        return <InstagramIcon className="h-4 w-4 text-pink-500" />
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-blue-700" />
      default:
        return <MessageSquareIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Support Center</h1>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>{metrics.agentsOnline} Agents Online</span>
                </div>
              </Badge>
              <Button size="sm" className="gap-2">
                <RefreshCwIcon className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="text-2xl font-bold">{metrics.averageResponseTime}</p>
                  </div>
                  <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tickets Resolved</p>
                    <p className="text-2xl font-bold">{metrics.ticketsResolved}</p>
                  </div>
                  <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Customer Satisfaction</p>
                    <p className="text-2xl font-bold">{metrics.customerSatisfaction}%</p>
                  </div>
                  <div className="h-10 w-10 bg-yellow-50 rounded-full flex items-center justify-center">
                    <ThumbsUpIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Open Tickets</p>
                    <p className="text-2xl font-bold">{metrics.openTickets}</p>
                  </div>
                  <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertCircleIcon className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Agents Online</p>
                    <p className="text-2xl font-bold">{metrics.agentsOnline}</p>
                  </div>
                  <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Support Interface */}
          <Tabs defaultValue="email" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="email" className="gap-2">
                <MailIcon className="h-4 w-4" />
                Email Inbox
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquareIcon className="h-4 w-4" />
                Live Chat
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-2">
                <TwitterIcon className="h-4 w-4" />
                Social Media
              </TabsTrigger>
              <TabsTrigger value="feedback" className="gap-2">
                <BarChart2Icon className="h-4 w-4" />
                Surveys & Feedback
              </TabsTrigger>
            </TabsList>

            {/* Email Tab */}
            <TabsContent value="email" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inbox</CardTitle>
                    <CardDescription>Manage customer emails</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Input placeholder="Search emails..." className="mb-2 mx-4" />
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <div className="px-2">
                          {emails.map((email) => (
                            <div
                              key={email.id}
                              className={`p-3 mb-1 rounded-md cursor-pointer transition-colors ${selectedEmail?.id === email.id ? "bg-indigo-50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
                              onClick={() => setSelectedEmail(email)}
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={email.avatar || "/placeholder.svg"} alt={email.from} />
                                  <AvatarFallback>{email.from.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium truncate ${email.unread ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}
                                    >
                                      {email.from}
                                    </p>
                                    <p className="text-xs text-gray-500">{email.time}</p>
                                  </div>
                                  <p className="text-sm truncate text-gray-500">{email.subject}</p>
                                  <p className="text-xs truncate text-gray-400">{email.message.substring(0, 50)}...</p>
                                </div>
                                {email.unread && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm lg:col-span-2">
                  {selectedEmail ? (
                    <>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{selectedEmail.subject}</CardTitle>
                            <CardDescription>
                              From: {selectedEmail.from} &lt;{selectedEmail.email}&gt;
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-gray-500">
                            {selectedEmail.date} {selectedEmail.time}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[calc(100vh-450px)]">
                          <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                              <p className="text-gray-700 dark:text-gray-300">{selectedEmail.message}</p>
                            </div>
                            <div className="border-t pt-4">
                              <h4 className="text-sm font-medium mb-2">Previous messages</h4>
                              <div className="space-y-3">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                  <p className="text-xs text-gray-500 mb-1">Yesterday, 2:45 PM</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Thank you for reaching out. We're looking into this issue and will get back to you
                                    shortly.
                                  </p>
                                </div>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                                  <p className="text-xs text-gray-500 mb-1">Yesterday, 1:30 PM</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedEmail.message}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="w-full space-y-4">
                          <Textarea placeholder="Type your reply..." className="min-h-[100px]" />
                          <div className="flex flex-col sm:flex-row justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="flex-grow sm:flex-grow-0">
                                Save Draft
                              </Button>
                              <Button variant="outline" size="sm" className="flex-grow sm:flex-grow-0">
                                Templates
                              </Button>
                            </div>
                            <Button className="gap-2">
                              <SendIcon className="h-4 w-4" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-350px)]">
                      <div className="text-center">
                        <MailIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Select an email</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                          Choose an email from the inbox to view its contents and reply
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            {/* Live Chat Tab */}
            <TabsContent value="chat" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Chats</CardTitle>
                    <CardDescription>Manage customer conversations</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Input placeholder="Search chats..." className="mb-2 mx-4" />
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <div className="px-2">
                          {chats.map((chat) => (
                            <div
                              key={chat.id}
                              className={`p-3 mb-1 rounded-md cursor-pointer transition-colors ${selectedChat?.id === chat.id ? "bg-indigo-50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
                              onClick={() => setSelectedChat(chat)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium truncate ${chat.unread ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}
                                    >
                                      {chat.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{chat.time}</p>
                                  </div>
                                  <p className="text-xs truncate text-gray-400">{chat.lastMessage}</p>
                                </div>
                                {chat.unread && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm lg:col-span-2">
                  {selectedChat ? (
                    <>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{selectedChat.name}</CardTitle>
                              <CardDescription>Online now</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <PhoneIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[calc(100vh-450px)]">
                          <div className="space-y-4 p-2">
                            {selectedChat.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] p-3 rounded-lg ${
                                    message.sender === "user"
                                      ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                      : "bg-indigo-500 text-white"
                                  }`}
                                >
                                  <p className="text-sm">{message.message}</p>
                                  <p className="text-xs mt-1 opacity-70 text-right">{message.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="w-full space-y-4">
                          <div className="relative">
                            <Input placeholder="Type your message..." className="pr-20" />
                            <Button className="absolute right-0 top-0 rounded-l-none">
                              <SendIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="flex-grow sm:flex-grow-0">
                                Quick Responses
                              </Button>
                              <Button variant="outline" size="sm" className="flex-grow sm:flex-grow-0">
                                Transfer Chat
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              End Chat
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-350px)]">
                      <div className="text-center">
                        <MessageSquareIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Select a conversation</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                          Choose a chat from the list to view the conversation
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Social Media</CardTitle>
                    <CardDescription>Monitor mentions and messages</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="flex p-2 mx-2 mb-2">
                        <Button
                          variant={activePlatform === "all" ? "default" : "outline"}
                          size="sm"
                          className="rounded-r-none flex-1"
                          onClick={() => setActivePlatform("all")}
                        >
                          All
                        </Button>
                        <Button
                          variant={activePlatform === "twitter" ? "default" : "outline"}
                          size="sm"
                          className="rounded-none border-l-0 flex-1"
                          onClick={() => setActivePlatform("twitter")}
                        >
                          <TwitterIcon className="h-4 w-4 text-blue-400 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant={activePlatform === "facebook" ? "default" : "outline"}
                          size="sm"
                          className="rounded-none border-l-0 flex-1"
                          onClick={() => setActivePlatform("facebook")}
                        >
                          <FacebookIcon className="h-4 w-4 text-blue-600 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant={activePlatform === "instagram" ? "default" : "outline"}
                          size="sm"
                          className="rounded-l-none border-l-0 flex-1"
                          onClick={() => setActivePlatform("instagram")}
                        >
                          <InstagramIcon className="h-4 w-4 text-pink-500 mr-2" />
                          Instagram
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <div className="px-2">
                          {socialMessages
                            .filter((message) => activePlatform === "all" || message.platform === activePlatform)
                            .map((message) => (
                              <div
                                key={message.id}
                                className={`p-3 mb-1 rounded-md cursor-pointer transition-colors ${selectedSocial?.id === message.id ? "bg-indigo-50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
                                onClick={() => setSelectedSocial(message)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="h-9 w-9">
                                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.name} />
                                      <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full flex items-center justify-center">
                                      {getPlatformIcon(message.platform)}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                                        {message.name}
                                      </p>
                                      <p className="text-xs text-gray-500">{message.time}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{message.username}</p>
                                    <p className="text-xs truncate text-gray-400">
                                      {message.message.substring(0, 50)}...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm lg:col-span-2">
                  {selectedSocial ? (
                    <>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={selectedSocial.avatar || "/placeholder.svg"}
                                  alt={selectedSocial.name}
                                />
                                <AvatarFallback>{selectedSocial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full flex items-center justify-center">
                                {getPlatformIcon(selectedSocial.platform)}
                              </div>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{selectedSocial.name}</CardTitle>
                              <CardDescription>{selectedSocial.username}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {selectedSocial.platform}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
                          <p className="text-gray-700 dark:text-gray-300">{selectedSocial.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{selectedSocial.time}</p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Response</h4>
                          <Textarea
                            placeholder="Type your response..."
                            className="min-h-[100px]"
                            value={socialResponse}
                            onChange={(e) => setSocialResponse(e.target.value)}
                          />
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Templates
                              </Button>
                              <Select>
                                <SelectTrigger className="w-[180px] h-9">
                                  <SelectValue placeholder="Response Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="public">Public Reply</SelectItem>
                                  <SelectItem value="dm">Direct Message</SelectItem>
                                  <SelectItem value="internal">Internal Note</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              className="gap-2"
                              onClick={() => {
                                if (socialResponse.trim()) {
                                  alert(
                                    `Response sent to ${selectedSocial.name} on ${selectedSocial.platform}: ${socialResponse}`,
                                  )
                                  setSocialResponse("")
                                }
                              }}
                              disabled={!socialResponse.trim()}
                            >
                              <SendIcon className="h-4 w-4" />
                              Send Response
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-350px)]">
                      <div className="text-center">
                        <TwitterIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          Select a social message
                        </h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                          Choose a message from the list to view and respond
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            {/* Surveys & Feedback Tab */}
            <TabsContent value="feedback" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Surveys</CardTitle>
                    <CardDescription>Monitor customer feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {surveys.map((survey) => (
                        <div key={survey.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{survey.title}</h3>
                            <Badge
                              variant="outline"
                              className={
                                survey.status === "active" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                              }
                            >
                              {survey.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Responses:</span>
                              <span className="font-medium">{survey.responses}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Completion Rate:</span>
                              <span className="font-medium">{survey.completion}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Average Rating:</span>
                              <span className="font-medium">{survey.averageRating}/5</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${survey.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Feedback Analytics</CardTitle>
                    <CardDescription>Customer satisfaction insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Sentiment Analysis</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Positive</span>
                              <span>68%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Neutral</span>
                              <span>22%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-gray-400 h-2 rounded-full" style={{ width: "22%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Negative</span>
                              <span>10%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Feature Satisfaction</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>User Interface</span>
                              <span>4.5/5</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Performance</span>
                              <span>4.2/5</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Support</span>
                              <span>4.7/5</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Common Feedback Topics</h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">User Interface</Badge>
                          <Badge className="bg-green-50 text-green-700 hover:bg-green-100">Performance</Badge>
                          <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100">Mobile App</Badge>
                          <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">Pricing</Badge>
                          <Badge className="bg-red-50 text-red-700 hover:bg-red-100">Bug Reports</Badge>
                          <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">Feature Requests</Badge>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Create New Survey</h3>
                        <p className="text-sm text-gray-500 mb-4">Launch a new customer feedback campaign</p>
                        <Button className="w-full">Create Survey</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
