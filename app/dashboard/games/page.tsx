"use client"

import { useState } from "react"
import { BarChart3, Download, Filter, Gift, RotateCw, Search, Settings, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "../components/sidebar"
import { Badge } from "@/components/ui/badge"

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState("spin-win")

  // Sample data for Spin and Win games
  const spinWinGames = [
    {
      id: "SW001",
      name: "Daily Spin",
      active: true,
      plays: 12543,
      uniqueUsers: 8721,
      totalJTokensAwarded: 45250,
      conversionRate: "32%",
      startDate: "2023-05-01",
      endDate: "2023-06-01",
      prizes: [
        { name: "5 JTokens", probability: "45%", awarded: 5432 },
        { name: "10 JTokens", probability: "30%", awarded: 3216 },
        { name: "25 JTokens", probability: "15%", awarded: 1254 },
        { name: "50 JTokens", probability: "8%", awarded: 843 },
        { name: "100 JTokens", probability: "2%", awarded: 210 },
      ],
    },
    {
      id: "SW002",
      name: "Weekend Bonus Spin",
      active: true,
      plays: 8432,
      uniqueUsers: 5621,
      totalJTokensAwarded: 62150,
      conversionRate: "28%",
      startDate: "2023-05-05",
      endDate: "2023-06-30",
      prizes: [
        { name: "10 JTokens", probability: "40%", awarded: 3254 },
        { name: "25 JTokens", probability: "30%", awarded: 2541 },
        { name: "50 JTokens", probability: "20%", awarded: 1632 },
        { name: "100 JTokens", probability: "8%", awarded: 654 },
        { name: "250 JTokens", probability: "2%", awarded: 165 },
      ],
    },
    {
      id: "SW003",
      name: "New User Welcome Spin",
      active: true,
      plays: 3254,
      uniqueUsers: 3254,
      totalJTokensAwarded: 32540,
      conversionRate: "100%",
      startDate: "2023-04-15",
      endDate: "2023-12-31",
      prizes: [
        { name: "10 JTokens", probability: "0%", awarded: 0 },
        { name: "25 JTokens", probability: "50%", awarded: 1627 },
        { name: "50 JTokens", probability: "40%", awarded: 1302 },
        { name: "100 JTokens", probability: "10%", awarded: 325 },
      ],
    },
  ]

  // Sample recent winners
  const recentWinners = [
    { user: "John D.", prize: "100 JTokens", game: "Daily Spin", time: "2 minutes ago" },
    { user: "Sarah M.", prize: "50 JTokens", game: "Weekend Bonus Spin", time: "15 minutes ago" },
    { user: "Michael T.", prize: "25 JTokens", game: "Daily Spin", time: "32 minutes ago" },
    { user: "Emma W.", prize: "250 JTokens", game: "Weekend Bonus Spin", time: "1 hour ago" },
    { user: "Robert K.", prize: "10 JTokens", game: "Daily Spin", time: "1 hour ago" },
    { user: "Jessica P.", prize: "50 JTokens", game: "New User Welcome Spin", time: "2 hours ago" },
    { user: "David L.", prize: "25 JTokens", game: "Daily Spin", time: "3 hours ago" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Games</h1>
            <p className="text-muted-foreground">Manage and track game performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search games..." className="pl-9 w-full sm:w-[250px]" />
            </div>
            <Button>
              <Gift className="mr-2 h-4 w-4" /> Create New Game
            </Button>
          </div>
        </div>

        <Tabs defaultValue="spin-win" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="spin-win">Spin & Win</TabsTrigger>
            <TabsTrigger value="scratch-card">Scratch Cards</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          </TabsList>

          <TabsContent value="spin-win" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Plays</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24,229</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">↑ 12%</span> vs last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Unique Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">17,596</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">↑ 8%</span> vs last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">JTokens Awarded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">139,940</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-red-500 font-medium">↓ 3%</span> vs last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32.5%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">↑ 5%</span> vs last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle>Spin & Win Games</CardTitle>
                      <CardDescription>Manage and track all spin and win games</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 divide-y">
                      {spinWinGames.map((game) => (
                        <div key={game.id} className="p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{game.name}</h3>
                                <Badge variant={game.active ? "default" : "secondary"}>
                                  {game.active ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">ID: {game.id}</div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 mt-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Plays:</span>{" "}
                                  <span className="font-medium">{game.plays.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Users:</span>{" "}
                                  <span className="font-medium">{game.uniqueUsers.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">JTokens:</span>{" "}
                                  <span className="font-medium">{game.totalJTokensAwarded.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Conversion:</span>{" "}
                                  <span className="font-medium">{game.conversionRate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                <BarChart3 className="mr-2 h-4 w-4" /> Analytics
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                <Settings className="mr-2 h-4 w-4" /> Configure
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Games
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Winners</CardTitle>
                  <CardDescription>Latest prize winners across all games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentWinners.map((winner, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {winner.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{winner.user}</div>
                          <div className="text-sm text-muted-foreground">
                            Won <span className="text-indigo-600 font-medium">{winner.prize}</span> on {winner.game}
                          </div>
                          <div className="text-xs text-gray-400">{winner.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Winners
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prize Distribution</CardTitle>
                <CardDescription>Overview of prizes awarded across all Spin & Win games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">5-10 JTokens</div>
                      <div className="text-muted-foreground">8,686 awards</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">65% of total awards</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">25 JTokens</div>
                      <div className="text-muted-foreground">3,422 awards</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">25% of total awards</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">50 JTokens</div>
                      <div className="text-muted-foreground">1,129 awards</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">8% of total awards</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">100+ JTokens</div>
                      <div className="text-muted-foreground">354 awards</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "2%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">2% of total awards</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scratch-card" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scratch Cards</CardTitle>
                <CardDescription>Coming soon - Scratch card games management</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RotateCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Scratch Cards Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    We're working on adding scratch card games to our platform. Check back soon for updates!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quizzes</CardTitle>
                <CardDescription>Coming soon - Quiz games management</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RotateCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Quiz Games Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    We're working on adding interactive quiz games to our platform. Check back soon for updates!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboards</CardTitle>
                <CardDescription>Coming soon - Game leaderboards management</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Leaderboards Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    We're working on adding leaderboards to track top players across all games. Check back soon for
                    updates!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
