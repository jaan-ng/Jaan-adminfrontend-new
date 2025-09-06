"use client"

import { Sidebar } from "../../components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DownloadIcon, FilterIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function RedemptionReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Redemption Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
              <FilterIcon className="h-4 w-4 mr-1" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
              <DownloadIcon className="h-4 w-4 mr-1" />
              <span>Export</span>
            </Button>
          </div>
        </div>

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
      </div>
    </div>
  )
}
