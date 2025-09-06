"use client"

import { useState } from "react"
import { Sidebar } from "../../components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PlusIcon, EditIcon, TrashIcon, FilmIcon, MusicIcon, GlobeIcon } from "lucide-react"
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

export default function EventsAndCinemaPage() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Events & Cinema</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  <span>Create {activeTab === "events" ? "Event" : "Movie Listing"}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New {activeTab === "events" ? "Event" : "Movie Listing"}</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new {activeTab === "events" ? "event" : "movie listing"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder={activeTab === "events" ? "Event name" : "Movie title"} />
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
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full" onValueChange={setActiveTab}>
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
