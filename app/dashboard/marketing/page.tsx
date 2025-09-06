"use client"

import { useState } from "react"
import { Bell, Edit, LinkIcon, Megaphone, Plus, Trash2, Upload, Mail, MessageSquare, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "../components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MarketingPage() {
  const { toast } = useToast()
  const [bannerImages, setBannerImages] = useState([
    {
      id: 1,
      url: "/placeholder.svg?height=200&width=400",
      link: "https://example.com/feature1",
      buttonText: "Explore Feature 1",
      productId: "prod_001",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=200&width=400",
      link: "https://example.com/feature2",
      buttonText: "Try Feature 2",
      productId: "prod_002",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=200&width=400",
      link: "https://example.com/feature3",
      buttonText: "Learn More",
      productId: "prod_003",
    },
  ])
  const [referralAmounts, setReferralAmounts] = useState({
    signup: "50 JTokens",
    firstTransaction: "100 JTokens",
  })
  const [editingReferral, setEditingReferral] = useState(false)
  const [tempReferralAmounts, setTempReferralAmounts] = useState(referralAmounts)
  const [surveyQuestions, setSurveyQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      question: "How satisfied are you with our service?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    },
    { id: 2, type: "text", question: "What improvements would you like to see?", options: [] },
  ])

  const handleSaveBanner = () => {
    toast({
      title: "Banner updated",
      description: "The banner has been updated successfully.",
    })
  }

  const handleSaveReferral = () => {
    setReferralAmounts(tempReferralAmounts)
    setEditingReferral(false)
    toast({
      title: "Referral amounts updated",
      description: "The referral JToken amounts have been updated successfully.",
    })
  }

  const handleAddBanner = () => {
    if (bannerImages.length < 6) {
      const newId = Math.max(...bannerImages.map((img) => img.id)) + 1
      setBannerImages([
        ...bannerImages,
        {
          id: newId,
          url: "/placeholder.svg?height=200&width=400",
          link: "https://example.com/new-feature",
          buttonText: "Explore",
          productId: "",
        },
      ])
      toast({
        title: "Banner added",
        description: "A new banner has been added. Please customize it.",
      })
    } else {
      toast({
        title: "Maximum banners reached",
        description: "You can only have up to 6 banners.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteBanner = (id: number) => {
    setBannerImages(bannerImages.filter((img) => img.id !== id))
    toast({
      title: "Banner deleted",
      description: "The banner has been deleted successfully.",
    })
  }

  const handleCreateEmailCampaign = () => {
    toast({
      title: "Email campaign created",
      description: "Your email campaign has been created successfully.",
    })
  }

  const handleCreateSMSCampaign = () => {
    toast({
      title: "SMS campaign created",
      description: "Your SMS campaign has been created successfully.",
    })
  }

  const handleAddSurveyQuestion = (type) => {
    const newId = surveyQuestions.length > 0 ? Math.max(...surveyQuestions.map((q) => q.id)) + 1 : 1
    const newQuestion = {
      id: newId,
      type,
      question: type === "multiple-choice" ? "New multiple choice question" : "New text question",
      options: type === "multiple-choice" ? ["Option 1", "Option 2", "Option 3"] : [],
    }
    setSurveyQuestions([...surveyQuestions, newQuestion])
    toast({
      title: "Question added",
      description: `A new ${type} question has been added to your survey.`,
    })
  }

  const handleDeleteQuestion = (id) => {
    setSurveyQuestions(surveyQuestions.filter((q) => q.id !== id))
    toast({
      title: "Question deleted",
      description: "The question has been removed from your survey.",
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Marketing</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns and promotions</p>
        </div>

        <Tabs defaultValue="banners" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="banners">App Banners</TabsTrigger>
            <TabsTrigger value="referrals">Referral Program</TabsTrigger>
            <TabsTrigger value="notifications">In-App Notifications</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="banners" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>App Homepage Banners</CardTitle>
                <CardDescription>
                  Manage the banners that appear on the app homepage. You can add up to 6 banners.
                </CardDescription>
                <Button onClick={handleAddBanner} className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" /> Add Banner
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {bannerImages.map((banner) => (
                    <Card key={banner.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={banner.url || "/placeholder.svg"}
                          alt={`Banner ${banner.id}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Banner</DialogTitle>
                                <DialogDescription>Update the banner image and link details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor={`banner-image-${banner.id}`}>Banner Image</Label>
                                  <div className="flex items-center gap-2">
                                    <Input id={`banner-image-${banner.id}`} defaultValue={banner.url} />
                                    <Button variant="outline" size="icon">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor={`banner-link-${banner.id}`}>Link URL</Label>
                                  <Input id={`banner-link-${banner.id}`} defaultValue={banner.link} />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor={`banner-button-${banner.id}`}>Button Text</Label>
                                  <Input id={`banner-button-${banner.id}`} defaultValue={banner.buttonText} />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor={`product-id-${banner.id}`}>Product ID</Label>
                                  <Input
                                    id={`product-id-${banner.id}`}
                                    defaultValue={banner.productId}
                                    placeholder="Enter product ID to link banner"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleSaveBanner}>Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                            onClick={() => handleDeleteBanner(banner.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardFooter className="flex flex-col items-start gap-2 p-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <LinkIcon className="mr-1 h-3 w-3" />
                          <span className="truncate max-w-[200px]">{banner.link}</span>
                        </div>
                        <div className="text-sm">Button: {banner.buttonText}</div>
                        {banner.productId && (
                          <div className="text-xs text-muted-foreground">Product ID: {banner.productId}</div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Referral Program Settings</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto md:ml-0"
                    onClick={() => setEditingReferral(!editingReferral)}
                  >
                    {editingReferral ? (
                      "Cancel"
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>Configure your app's referral program rewards using JTokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Signup Bonus</Label>
                      {editingReferral ? (
                        <Input
                          value={tempReferralAmounts.signup}
                          onChange={(e) => setTempReferralAmounts({ ...tempReferralAmounts, signup: e.target.value })}
                        />
                      ) : (
                        <div className="rounded-md border p-2">{referralAmounts.signup}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>First Transaction Bonus</Label>
                      {editingReferral ? (
                        <Input
                          value={tempReferralAmounts.firstTransaction}
                          onChange={(e) =>
                            setTempReferralAmounts({ ...tempReferralAmounts, firstTransaction: e.target.value })
                          }
                        />
                      ) : (
                        <div className="rounded-md border p-2">{referralAmounts.firstTransaction}</div>
                      )}
                    </div>
                  </div>

                  {editingReferral && (
                    <Button onClick={handleSaveReferral} className="mt-4">
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>In-App Notifications</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Notification
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Notification</DialogTitle>
                        <DialogDescription>Create a new in-app notification to be sent to users</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="notification-title">Title</Label>
                          <Input id="notification-title" placeholder="Notification title" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="notification-message">Message</Label>
                          <Textarea id="notification-message" placeholder="Notification message" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="notification-link">Link (Optional)</Label>
                          <Input id="notification-link" placeholder="https://example.com" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Target Audience</Label>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="all-users" name="audience" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="all-users" className="text-sm font-normal">
                              All Users
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="new-users" name="audience" className="h-4 w-4" />
                            <Label htmlFor="new-users" className="text-sm font-normal">
                              New Users ({`<`} 30 days)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="inactive-users" name="audience" className="h-4 w-4" />
                            <Label htmlFor="inactive-users" className="text-sm font-normal">
                              Inactive Users ({`>`} 30 days)
                            </Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Send Notification</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>Create and manage in-app notifications for your users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Bell className="mt-1 h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">New Feature: Quick Transfers</h3>
                            <p className="text-sm text-muted-foreground">
                              We've added a new feature to make transfers faster and easier.
                            </p>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <span>Sent to: All Users</span>
                              <span className="mx-2">•</span>
                              <span>May 1, 2023</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Megaphone className="mt-1 h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">Weekend Promo: 50% Off Transaction Fees</h3>
                            <p className="text-sm text-muted-foreground">
                              Enjoy 50% off all transaction fees this weekend only!
                            </p>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <span>Sent to: All Users</span>
                              <span className="mx-2">•</span>
                              <span>April 28, 2023</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaigns</CardTitle>
                <CardDescription>Create and manage email and SMS campaigns to engage with your users</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-4">
                    <TabsTrigger value="email">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="sms">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      SMS Campaigns
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                      <h3 className="text-lg font-medium">Email Campaigns</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Create Email Campaign
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Create Email Campaign</DialogTitle>
                            <DialogDescription>Set up a new email campaign to engage with your users</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="campaign-name">Campaign Name</Label>
                              <Input id="campaign-name" placeholder="Enter campaign name" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="sender-info">Sender Information</Label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Input id="sender-name" placeholder="Sender Name (e.g. Company Name)" />
                                <Input id="sender-email" placeholder="Sender Email" type="email" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                This will appear as the sender of your email campaign
                              </p>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="campaign-subject">Email Subject</Label>
                              <Input id="campaign-subject" placeholder="Enter email subject" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="campaign-content">Email Content</Label>
                              <Textarea
                                id="campaign-content"
                                placeholder="Enter email content"
                                className="min-h-[200px]"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email-template">Email Template</Label>
                              <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 w-full">
                                  <Input id="template-upload" type="file" accept=".html,.htm" className="flex-1" />
                                  <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                  </Button>
                                </div>
                                <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-900 text-sm">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">Saved Templates</span>
                                    <Button variant="ghost" size="sm">
                                      Manage
                                    </Button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                        <Mail className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">Welcome Email</p>
                                        <p className="text-xs text-muted-foreground">Basic</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                        <Mail className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">Monthly Newsletter</p>
                                        <p className="text-xs text-muted-foreground">Standard</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Target Audience</Label>
                              <div className="space-y-3">
                                <Select defaultValue="all">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select primary segment" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="new">New Users (Last 30 days)</SelectItem>
                                    <SelectItem value="inactive">Inactive Users (No login for 30+ days)</SelectItem>
                                    <SelectItem value="active">Active Users (Logged in last 7 days)</SelectItem>
                                    <SelectItem value="power">Power Users (High transaction volume)</SelectItem>
                                    <SelectItem value="low-balance">Low Balance Users</SelectItem>
                                    <SelectItem value="high-balance">High Balance Users</SelectItem>
                                    <SelectItem value="no-transaction">Users with No Transactions</SelectItem>
                                    <SelectItem value="referral">Users from Referral Program</SelectItem>
                                    <SelectItem value="custom">Custom Segment</SelectItem>
                                  </SelectContent>
                                </Select>

                                <div className="rounded-md border p-3">
                                  <p className="text-sm font-medium mb-2">Additional Filters</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-region" />
                                      <Label htmlFor="filter-region" className="text-sm font-normal">
                                        Filter by Region
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-age" />
                                      <Label htmlFor="filter-age" className="text-sm font-normal">
                                        Filter by Age Group
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-devices" />
                                      <Label htmlFor="filter-devices" className="text-sm font-normal">
                                        Filter by Device Type
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-custom" />
                                      <Label htmlFor="filter-custom" className="text-sm font-normal">
                                        Custom User Attributes
                                      </Label>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline" className="mt-3">
                                    Configure Filters
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Schedule</Label>
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                  <Label htmlFor="schedule-date" className="text-xs">
                                    Date
                                  </Label>
                                  <Input id="schedule-date" type="date" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="schedule-time" className="text-xs">
                                    Time
                                  </Label>
                                  <Input id="schedule-time" type="time" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" className="mr-2">
                              Save as Draft
                            </Button>
                            <Button onClick={handleCreateEmailCampaign}>Create Campaign</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium">Monthly Newsletter</h3>
                            <p className="text-sm text-muted-foreground">
                              Monthly updates and promotions sent to all subscribers
                            </p>
                            <div className="mt-1 flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                              <span>Recipients: 12,543</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Last Sent: May 1, 2023</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Open Rate: 32%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Duplicate
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium">Welcome Series</h3>
                            <p className="text-sm text-muted-foreground">Automated welcome emails for new users</p>
                            <div className="mt-1 flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                              <span>Recipients: Automated</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Status: Active</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Open Rate: 45%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Duplicate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none bg-green-50 text-green-700 border-green-200"
                            >
                              Active
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sms" className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                      <h3 className="text-lg font-medium">SMS Campaigns</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Create SMS Campaign
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Create SMS Campaign</DialogTitle>
                            <DialogDescription>Set up a new SMS campaign to engage with your users</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="sms-campaign-name">Campaign Name</Label>
                              <Input id="sms-campaign-name" placeholder="Enter campaign name" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="sms-sender-info">Sender Information</Label>
                              <div className="grid grid-cols-1 gap-3">
                                <Input id="sms-sender-id" placeholder="Sender ID (e.g. CompanyName, phone number)" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                This will appear as the sender of your SMS campaign
                              </p>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="sms-message">SMS Message</Label>
                              <Textarea
                                id="sms-message"
                                placeholder="Enter SMS message (160 characters max)"
                                className="min-h-[100px]"
                                maxLength={160}
                              />
                              <p className="text-xs text-muted-foreground">
                                Characters: <span id="char-count">0</span>/160
                              </p>
                            </div>
                            <div className="grid gap-2">
                              <Label>Target Audience</Label>
                              <div className="space-y-3">
                                <Select defaultValue="all">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select primary segment" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="new">New Users (Last 30 days)</SelectItem>
                                    <SelectItem value="inactive">Inactive Users (No login for 30+ days)</SelectItem>
                                    <SelectItem value="active">Active Users (Logged in last 7 days)</SelectItem>
                                    <SelectItem value="power">Power Users (High transaction volume)</SelectItem>
                                    <SelectItem value="low-balance">Low Balance Users</SelectItem>
                                    <SelectItem value="high-balance">High Balance Users</SelectItem>
                                    <SelectItem value="no-transaction">Users with No Transactions</SelectItem>
                                    <SelectItem value="referral">Users from Referral Program</SelectItem>
                                    <SelectItem value="custom">Custom Segment</SelectItem>
                                  </SelectContent>
                                </Select>

                                <div className="rounded-md border p-3">
                                  <p className="text-sm font-medium mb-2">Additional Filters</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-region" />
                                      <Label htmlFor="filter-region" className="text-sm font-normal">
                                        Filter by Region
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-age" />
                                      <Label htmlFor="filter-age" className="text-sm font-normal">
                                        Filter by Age Group
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-devices" />
                                      <Label htmlFor="filter-devices" className="text-sm font-normal">
                                        Filter by Device Type
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="filter-custom" />
                                      <Label htmlFor="filter-custom" className="text-sm font-normal">
                                        Custom User Attributes
                                      </Label>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline" className="mt-3">
                                    Configure Filters
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Schedule</Label>
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                  <Label htmlFor="sms-schedule-date" className="text-xs">
                                    Date
                                  </Label>
                                  <Input id="sms-schedule-date" type="date" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="sms-schedule-time" className="text-xs">
                                    Time
                                  </Label>
                                  <Input id="sms-schedule-time" type="time" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" className="mr-2">
                              Save as Draft
                            </Button>
                            <Button onClick={handleCreateSMSCampaign}>Create Campaign</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium">Flash Sale Alert</h3>
                            <p className="text-sm text-muted-foreground">
                              Quick notification about limited-time offers
                            </p>
                            <div className="mt-1 flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                              <span>Recipients: 8,721</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Last Sent: April 15, 2023</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Response Rate: 12%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Duplicate
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium">Transaction Confirmation</h3>
                            <p className="text-sm text-muted-foreground">
                              Automated SMS sent after successful transactions
                            </p>
                            <div className="mt-1 flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                              <span>Recipients: Automated</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Status: Active</span>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span>Delivery Rate: 98%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Duplicate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none bg-green-50 text-green-700 border-green-200"
                            >
                              Active
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Survey Creation Section */}
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Survey Creation</h3>
                      <p className="text-sm text-muted-foreground">Create and manage customer feedback surveys</p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleAddSurveyQuestion("multiple-choice")}
                      >
                        <PieChart className="mr-2 h-4 w-4" />
                        Add Multiple Choice
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleAddSurveyQuestion("text")}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Add Text Question
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Satisfaction Survey</CardTitle>
                      <CardDescription>Gather feedback about your products and services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {surveyQuestions.map((question, index) => (
                          <div key={question.id} className="p-4 border rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <h4 className="font-medium">{question.question}</h4>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="ml-8">
                              {question.type === "multiple-choice" ? (
                                <div className="space-y-2">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      <RadioGroup defaultValue="option-1">
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value={`option-${optIndex + 1}`}
                                            id={`option-${question.id}-${optIndex}`}
                                          />
                                          <Label htmlFor={`option-${question.id}-${optIndex}`}>{option}</Label>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <Textarea placeholder="Enter your answer here..." className="mt-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id="send-email" />
                        <Label htmlFor="send-email">Send via email</Label>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none">
                          Save as Draft
                        </Button>
                        <Button className="flex-1 sm:flex-none">Publish Survey</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
