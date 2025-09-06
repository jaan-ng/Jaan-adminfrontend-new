"use client"

import { useState } from "react"
import { TrendingUpIcon, UsersIcon, LineChartIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sidebar } from "../components/sidebar"
import { UserRegistrationChart } from "../components/user-registration-chart"

// Sample data for charts
const monthlyData = [
  { month: "Jan", transactions: 3500, revenue: 12500000, users: 1200 },
  { month: "Feb", transactions: 3800, revenue: 13200000, users: 1300 },
  { month: "Mar", transactions: 4100, revenue: 14800000, users: 1400 },
  { month: "Apr", transactions: 4300, revenue: 15500000, users: 1500 },
  { month: "May", transactions: 4600, revenue: 16700000, users: 1600 },
  { month: "Jun", transactions: 4900, revenue: 17900000, users: 1700 },
  { month: "Jul", transactions: 5200, revenue: 19200000, users: 1800 },
  { month: "Aug", transactions: 5500, revenue: 20500000, users: 1900 },
  { month: "Sep", transactions: 5800, revenue: 21800000, users: 2000 },
  { month: "Oct", transactions: 6100, revenue: 23100000, users: 2100 },
  { month: "Nov", transactions: 6400, revenue: 24400000, users: 2200 },
  { month: "Dec", transactions: 6700, revenue: 25700000, users: 2300 },
]

const serviceData = [
  { name: "Internet", value: 45 },
  { name: "Airtime", value: 30 },
  { name: "Gift Cards", value: 25 },
  { name: "Cable TV", value: 40 },
  { name: "Electricity", value: 35 },
]

// Mobile app downloads data
const appDownloadsData = [
  { month: "Jan", android: 15000, ios: 12000 },
  { month: "Feb", android: 17000, ios: 13500 },
  { month: "Mar", android: 19000, ios: 15000 },
  { month: "Apr", android: 21000, ios: 16500 },
  { month: "May", android: 23000, ios: 18000 },
  { month: "Jun", android: 25000, ios: 19500 },
  { month: "Jul", android: 27000, ios: 21000 },
  { month: "Aug", android: 29000, ios: 22500 },
  { month: "Sep", android: 31000, ios: 24000 },
  { month: "Oct", android: 33000, ios: 25500 },
  { month: "Nov", android: 35000, ios: 27000 },
  { month: "Dec", android: 37000, ios: 28500 },
]

// App usage statistics
const appUsageData = [
  { name: "Daily Active Users", value: 45000 },
  { name: "Monthly Active Users", value: 120000 },
  { name: "Avg. Session Duration", value: "8.5 mins" },
  { name: "Transactions per User", value: 3.2 },
]

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#8b5cf6", "#f59e0b"]

// Sample reports data
const reports = [
  {
    id: "RPT-001",
    name: "Monthly Transaction Summary",
    type: "Transactions",
    format: "PDF",
    lastGenerated: "2023-08-15",
    size: "1.2 MB",
  },
  {
    id: "RPT-002",
    name: "User Growth Analysis",
    type: "Users",
    format: "CSV",
    lastGenerated: "2023-08-10",
    size: "3.5 MB",
  },
  {
    id: "RPT-003",
    name: "Revenue Breakdown by Service",
    type: "Revenue",
    format: "Excel",
    lastGenerated: "2023-08-05",
    size: "2.8 MB",
  },
  {
    id: "RPT-004",
    name: "Quarterly Performance Report",
    type: "Performance",
    format: "PDF",
    lastGenerated: "2023-07-01",
    size: "4.2 MB",
  },
  {
    id: "RPT-005",
    name: "User Engagement Metrics",
    type: "Users",
    format: "CSV",
    lastGenerated: "2023-07-15",
    size: "1.8 MB",
  },
  {
    id: "RPT-006",
    name: "Mobile App Analytics",
    type: "Mobile",
    format: "PDF",
    lastGenerated: "2023-08-18",
    size: "2.4 MB",
  },
]

function InsightCard({ title, value, change, trend, icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2 mb-1 text-gray-800">{value}</div>
            <div className="flex items-center text-sm">
              {trend === "up" ? (
                <ArrowUpIcon className="h-4 w-4 text-emerald-600 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-rose-600 mr-1" />
              )}
              <span className={trend === "up" ? "text-emerald-600" : "text-rose-600"}>{change}%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function InsightsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [activeTab, setActiveTab] = useState("overview")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter reports based on search query
  const filteredReports = reports.filter((report) => {
    return (
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Insights & Analytics</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="user-analytics">User Analytics</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Analytics</TabsTrigger>
            <TabsTrigger value="app-downloads">App Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InsightCard
                title="Total Users"
                value="42,502"
                change={12.5}
                trend="up"
                icon={<UsersIcon className="h-5 w-5 text-blue-600" />}
              />
              <InsightCard
                title="Active Users"
                value="28,350"
                change={8.2}
                trend="up"
                icon={<UsersIcon className="h-5 w-5 text-green-600" />}
              />
              <InsightCard
                title="Conversion Rate"
                value="3.2%"
                change={0.5}
                trend="up"
                icon={<TrendingUpIcon className="h-5 w-5 text-purple-600" />}
              />
              <InsightCard
                title="Avg. Session"
                value="4m 32s"
                change={1.3}
                trend="down"
                icon={<LineChartIcon className="h-5 w-5 text-orange-600" />}
              />
            </div>

            <UserRegistrationChart />
          </TabsContent>

          <TabsContent value="user-analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Analytics</CardTitle>
                <CardDescription>Detailed analysis of user acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">User growth analytics visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Analytics</CardTitle>
                <CardDescription>Detailed analysis of transaction volume and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Transaction analytics visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app-downloads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Downloads</CardTitle>
                <CardDescription>Analysis of app installations across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Android Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">24,521</div>
                      <div className="flex items-center text-sm text-green-600">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>15.3% vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">iOS Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">18,932</div>
                      <div className="flex items-center text-sm text-green-600">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>12.7% vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">App download trends visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Format date function
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
