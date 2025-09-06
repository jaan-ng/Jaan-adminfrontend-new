"use client"

import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  FilmIcon,
  MusicIcon,
  GlobeIcon,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export default function TicketingPage() {
  const [activeTab, setActiveTab] = useState("ticket-sales")

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Ticketing</h1>
          <div className="flex items-center gap-2">
            {activeTab === "events-cinema" ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-1" />
                    <span>Create {activeTab === "events-cinema" ? "Event" : "Movie Listing"}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Event or Movie Listing</DialogTitle>
                    <DialogDescription>Fill in the details to create a new event or movie listing</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Event name or Movie title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input id="venue" placeholder="Venue" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Ticket Price (₦)</Label>
                      <Input id="price" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <>
                <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  <span>Export</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="ticket-sales" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="ticket-sales">Ticket Sales</TabsTrigger>
            <TabsTrigger value="redemption-reports">Redemption Reports</TabsTrigger>
            <TabsTrigger value="events-cinema">Events & Cinema</TabsTrigger>
          </TabsList>

          {/* Ticket Sales Tab Content */}
          <TabsContent value="ticket-sales" className="space-y-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">All Tickets</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="concerts">Concerts</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Ticket Sales</CardTitle>
                    <CardDescription>Overview of recent ticket purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                            <th className="py-3 px-6 font-medium">Ticket ID</th>
                            <th className="py-3 px-6 font-medium">Event</th>
                            <th className="py-3 px-6 font-medium">Customer</th>
                            <th className="py-3 px-6 font-medium">Date</th>
                            <th className="py-3 px-6 font-medium">Amount</th>
                            <th className="py-3 px-6 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12345</td>
                            <td className="py-3 px-6">Avengers: Endgame</td>
                            <td className="py-3 px-6">John Doe</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 15, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 font-medium">₦2,500</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">
                                Paid
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12346</td>
                            <td className="py-3 px-6">Concert: Davido Live</td>
                            <td className="py-3 px-6">Jane Smith</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 18, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 font-medium">₦5,000</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">
                                Paid
                              </Badge>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12347</td>
                            <td className="py-3 px-6">Tech Conference 2023</td>
                            <td className="py-3 px-6">Robert Johnson</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 20, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 font-medium">₦7,500</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-0">Pending</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="movies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Movie Ticket Sales</CardTitle>
                    <CardDescription>Overview of movie ticket purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Movie ticket sales data will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Ticket Sales</CardTitle>
                    <CardDescription>Overview of event ticket purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Event ticket sales data will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="concerts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Concert Ticket Sales</CardTitle>
                    <CardDescription>Overview of concert ticket purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Concert ticket sales data will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Redemption Reports Tab Content */}
          <TabsContent value="redemption-reports" className="space-y-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="all">All Check-ins</TabsTrigger>
                <TabsTrigger value="scanned">Scanned</TabsTrigger>
                <TabsTrigger value="not-scanned">Not Scanned</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Redemption Status</CardTitle>
                    <CardDescription>Overview of ticket check-ins and redemptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                            <th className="py-3 px-6 font-medium">Ticket ID</th>
                            <th className="py-3 px-6 font-medium">Event</th>
                            <th className="py-3 px-6 font-medium">Customer</th>
                            <th className="py-3 px-6 font-medium">Purchase Date</th>
                            <th className="py-3 px-6 font-medium">Check-in Time</th>
                            <th className="py-3 px-6 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12345</td>
                            <td className="py-3 px-6">Avengers: Endgame</td>
                            <td className="py-3 px-6">John Doe</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 15, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6">7:42 PM</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 flex items-center gap-1">
                                <CheckCircleIcon className="h-3.5 w-3.5" />
                                Scanned
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12346</td>
                            <td className="py-3 px-6">Concert: Davido Live</td>
                            <td className="py-3 px-6">Jane Smith</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 18, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6">8:15 PM</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 flex items-center gap-1">
                                <CheckCircleIcon className="h-3.5 w-3.5" />
                                Scanned
                              </Badge>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6">TKT-12347</td>
                            <td className="py-3 px-6">Tech Conference 2023</td>
                            <td className="py-3 px-6">Robert Johnson</td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span>May 20, 2023</span>
                              </div>
                            </td>
                            <td className="py-3 px-6">-</td>
                            <td className="py-3 px-6">
                              <Badge className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-0 flex items-center gap-1">
                                <XCircleIcon className="h-3.5 w-3.5" />
                                Not Scanned
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scanned" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scanned Tickets</CardTitle>
                    <CardDescription>List of all scanned tickets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Scanned tickets data will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="not-scanned" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Not Scanned Tickets</CardTitle>
                    <CardDescription>List of tickets that haven't been scanned yet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Not scanned tickets data will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Events & Cinema Tab Content */}
          <TabsContent value="events-cinema" className="space-y-6">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="cinema">Cinema Listings</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <EventCard
                    title="Tech Conference 2023"
                    date="May 25, 2023"
                    time="9:00 AM"
                    venue="Tech Hub, Lagos"
                    price="₦7,500"
                    icon={<GlobeIcon className="h-5 w-5" />}
                  />
                  <EventCard
                    title="Music Festival"
                    date="June 10, 2023"
                    time="4:00 PM"
                    venue="Beach Resort, Lagos"
                    price="₦5,000"
                    icon={<MusicIcon className="h-5 w-5" />}
                  />
                  <EventCard
                    title="Business Summit"
                    date="July 5, 2023"
                    time="10:00 AM"
                    venue="Convention Center, Abuja"
                    price="₦10,000"
                    icon={<GlobeIcon className="h-5 w-5" />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="cinema" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MovieCard
                    title="Avengers: Endgame"
                    genre="Action, Adventure"
                    duration="3h 2m"
                    showtime="7:30 PM"
                    price="₦2,500"
                  />
                  <MovieCard
                    title="Black Panther: Wakanda Forever"
                    genre="Action, Adventure"
                    duration="2h 41m"
                    showtime="6:00 PM"
                    price="₦2,500"
                  />
                  <MovieCard
                    title="The Lion King"
                    genre="Animation, Adventure"
                    duration="1h 58m"
                    showtime="5:00 PM"
                    price="₦2,000"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EventCard({ title, date, time, venue, price, icon }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {date} at {time}
          </div>
          <div className="text-gray-600">Venue: {venue}</div>
          <div className="font-medium">Ticket Price: {price}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <EditIcon className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
          <TrashIcon className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function MovieCard({ title, genre, duration, showtime, price }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">
            <FilmIcon className="h-5 w-5" />
          </div>
        </div>
        <CardDescription>{genre}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Today at {showtime}
          </div>
          <div className="text-gray-600">Duration: {duration}</div>
          <div className="font-medium">Ticket Price: {price}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <EditIcon className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
          <TrashIcon className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
