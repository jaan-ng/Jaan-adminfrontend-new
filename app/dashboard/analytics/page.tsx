"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  CalendarIcon,
  ChevronDownIcon,
  DownloadIcon,
  LineChartIcon,
  PieChartIcon,
  RefreshCcwIcon,
  UsersIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar } from "../components/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Sample data for analytics
const serviceData = [
  { name: "Internet", value: 45 },
  { name: "Airtime", value: 30 },
  { name: "Gift Cards", value: 25 },
  { name: "Cable TV", value: 40 },
  { name: "Electricity", value: 35 },
]

const monthlyData = [
  { month: "Jan", users: 1200, transactions: 3500, revenue: 12500 },
  { month: "Feb", users: 1300, transactions: 3800, revenue: 13200 },
  { month: "Mar", users: 1400, transactions: 4100, revenue: 14800 },
  { month: "Apr", users: 1500, transactions: 4300, revenue: 15500 },
  { month: "May", users: 1600, transactions: 4600, revenue: 16700 },
  { month: "Jun", users: 1700, transactions: 4900, revenue: 17900 },
  { month: "Jul", users: 1800, transactions: 5200, revenue: 19200 },
  { month: "Aug", users: 1900, transactions: 5500, revenue: 20500 },
  { month: "Sep", users: 2000, transactions: 5800, revenue: 21800 },
  { month: "Oct", users: 2100, transactions: 6100, revenue: 23100 },
  { month: "Nov", users: 2200, transactions: 6400, revenue: 24400 },
  { month: "Dec", users: 2300, transactions: 6700, revenue: 25700 },
]

const dailyData = [
  { day: "Mon", users: 320, transactions: 850, revenue: 3200 },
  { day: "Tue", users: 350, transactions: 920, revenue: 3500 },
  { day: "Wed", users: 380, transactions: 980, revenue: 3800 },
  { day: "Thu", users: 410, transactions: 1050, revenue: 4100 },
  { day: "Fri", users: 440, transactions: 1120, revenue: 4400 },
  { day: "Sat", users: 470, transactions: 1190, revenue: 4700 },
  { day: "Sun", users: 500, transactions: 1260, revenue: 5000 },
]

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#8b5cf6", "#f59e0b"]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")
  const [activeTab, setActiveTab] = useState("overview")

  // Choose data based on selected period
  const chartData = selectedPeriod === "Daily" ? dailyData : monthlyData

  // Calculate statistics
  const totalUsers = chartData.reduce((sum, item) => sum + item.users, 0)
  const totalTransactions = chartData.reduce((sum, item) => sum + item.transactions, 0)
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0)
  const averageOrderValue = totalRevenue / totalTransactions

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Analytics & Insights</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
              <RefreshCcwIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
                  <span>{selectedPeriod}</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedPeriod("Daily")}>Daily</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Monthly")}>Monthly</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Date Range</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatsCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            change={5.39}
            trend="up"
            icon={<UsersIcon className="h-5 w-5 text-indigo-600" />}
            bgColor="bg-indigo-50"
          />
          <StatsCard
            title="Transactions"
            value={totalTransactions.toLocaleString()}
            change={3.25}
            trend="up"
            icon={<BarChart3Icon className="h-5 w-5 text-pink-600" />}
            bgColor="bg-pink-50"
          />
          <StatsCard
            title="Revenue"
            value={`₦${(totalRevenue / 1000).toFixed(1)}k`}
            change={7.12}
            trend="up"
            icon={<LineChartIcon className="h-5 w-5 text-emerald-600" />}
            bgColor="bg-emerald-50"
          />
          <StatsCard
            title="Avg. Order Value"
            value={`₦${averageOrderValue.toFixed(2)}`}
            change={1.8}
            trend="down"
            icon={<PieChartIcon className="h-5 w-5 text-violet-600" />}
            bgColor="bg-violet-50"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Line Chart */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {activeTab === "overview" || activeTab === "users"
                  ? "User Growth"
                  : activeTab === "transactions"
                    ? "Transaction Volume"
                    : "Revenue Trend"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey={selectedPeriod === "Daily" ? "day" : "month"}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#888" }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                      formatter={(value) => [
                        `${value}`,
                        activeTab === "revenue" ? "Revenue" : activeTab === "transactions" ? "Transactions" : "Users",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={
                        activeTab === "revenue" ? "revenue" : activeTab === "transactions" ? "transactions" : "users"
                      }
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {activeTab === "overview" || activeTab === "transactions"
                  ? "Transaction Comparison"
                  : activeTab === "users"
                    ? "User Activity"
                    : "Revenue by Period"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey={selectedPeriod === "Daily" ? "day" : "month"}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#888" }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                      formatter={(value) => [
                        `${value}`,
                        activeTab === "revenue" ? "Revenue" : activeTab === "users" ? "Users" : "Transactions",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                    />
                    <Bar
                      dataKey={activeTab === "revenue" ? "revenue" : activeTab === "users" ? "users" : "transactions"}
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Distribution */}
          <Card className="border shadow-sm lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Service Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Usage"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="border shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Top Services</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="py-3 px-6 font-medium">Service</th>
                      <th className="py-3 px-6 font-medium">Transactions</th>
                      <th className="py-3 px-6 font-medium">Revenue</th>
                      <th className="py-3 px-6 font-medium">Growth</th>
                      <th className="py-3 px-6 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium">Internet</td>
                      <td className="py-3 px-6">4,521</td>
                      <td className="py-3 px-6 font-medium">₦1,245,320</td>
                      <td className="py-3 px-6 text-green-600">+12.5%</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Growing</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium">Airtime</td>
                      <td className="py-3 px-6">3,845</td>
                      <td className="py-3 px-6 font-medium">₦985,120</td>
                      <td className="py-3 px-6 text-green-600">+8.2%</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Growing</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium">Cable TV</td>
                      <td className="py-3 px-6">2,954</td>
                      <td className="py-3 px-6 font-medium">₦875,450</td>
                      <td className="py-3 px-6 text-amber-600">+2.1%</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">Stable</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium">Electricity</td>
                      <td className="py-3 px-6">2,542</td>
                      <td className="py-3 px-6 font-medium">₦754,320</td>
                      <td className="py-3 px-6 text-green-600">+5.8%</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Growing</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium">Gift Cards</td>
                      <td className="py-3 px-6">1,854</td>
                      <td className="py-3 px-6 font-medium">₦542,120</td>
                      <td className="py-3 px-6 text-red-600">-1.2%</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">Declining</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change, trend, icon, bgColor }) {
  return (
    <Card className={`${bgColor} border-none shadow-sm`}>
      <CardContent className="p-6 relative">
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
          <div className="p-2 rounded-lg bg-white/80">{icon}</div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100/80 to-transparent rounded-tl-full -mb-8 -mr-8 opacity-70"></div>
      </CardContent>
    </Card>
  )
}
