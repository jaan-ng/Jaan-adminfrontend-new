"use client"

import { useState, useEffect } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileIcon,
  FileTextIcon,
  LineChartIcon,
  SearchIcon,
  XCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  InfoIcon,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "../components/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample transaction data - updated to change Airline to Airtime
const transactions = [
  {
    id: "TRX-78945",
    user: {
      name: "Shafogrin",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 473.18,
    date: "02/08/2023",
    time: "07:42 PM",
    status: "successful",
    type: "Internet",
    details: "10 GB Data Plan",
    transactionType: "debit",
  },
  {
    id: "TRX-65412",
    user: {
      name: "Snow",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 565.86,
    date: "01/09/2023",
    time: "10:54 PM",
    status: "successful",
    type: "Cable TV",
    details: "20 GB Premium Package",
    transactionType: "debit",
  },
  {
    id: "TRX-32145",
    user: {
      name: "DMX",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 322.23,
    date: "15/12/2023",
    time: "05:23 PM",
    status: "successful",
    type: "Electricity",
    details: "10 GB Power Credit",
    transactionType: "debit",
  },
  {
    id: "TRX-98765",
    user: {
      name: "Kathryn Murphy",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 128.5,
    date: "05/08/2023",
    time: "02:15 PM",
    status: "failed",
    type: "Airtime",
    details: "Airtime Recharge",
    transactionType: "debit",
  },
  {
    id: "TRX-45678",
    user: {
      name: "James Harrid",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 899.99,
    date: "12/07/2023",
    time: "11:30 AM",
    status: "failed",
    type: "Gift Cards",
    details: "Premium Gift Card",
    transactionType: "debit",
  },
  {
    id: "TRX-23456",
    user: {
      name: "Elon Melon",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 75.25,
    date: "18/06/2023",
    time: "09:45 AM",
    status: "successful",
    type: "Internet",
    details: "5 GB Data Plan",
    transactionType: "debit",
  },
  {
    id: "TRX-87654",
    user: {
      name: "Mia Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 250.0,
    date: "22/05/2023",
    time: "03:20 PM",
    status: "failed",
    type: "Cable TV",
    details: "Standard Package",
    transactionType: "debit",
  },
  {
    id: "TRX-34567",
    user: {
      name: "James Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 1250.75,
    date: "30/04/2023",
    time: "01:10 PM",
    status: "successful",
    type: "Electricity",
    details: "Annual Plan",
    transactionType: "debit",
  },
  {
    id: "TRX-56789",
    user: {
      name: "Sarah Connor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 89.99,
    date: "15/03/2023",
    time: "08:30 AM",
    status: "failed",
    type: "Gift Cards",
    details: "Standard Gift Card",
    transactionType: "debit",
  },
  {
    id: "TRX-67890",
    user: {
      name: "John Matrix",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 499.5,
    date: "02/02/2023",
    time: "06:45 PM",
    status: "successful",
    type: "Airtime",
    details: "Airtime Recharge",
    transactionType: "credit",
  },
  {
    id: "TRX-12345",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 1000.0,
    date: "01/02/2023",
    time: "10:15 AM",
    status: "successful",
    type: "Deposit",
    details: "Account Funding",
    transactionType: "credit",
  },
  {
    id: "TRX-23451",
    user: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 750.0,
    date: "03/02/2023",
    time: "09:30 AM",
    status: "successful",
    type: "Transfer",
    details: "Incoming Transfer",
    transactionType: "credit",
  },
]

// Generate chart data from transactions
const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Initialize data structure
  const chartData = months.map((month) => ({
    name: month,
    credit: 0,
    debit: 0,
  }))

  // Populate with transaction data
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date.split("/").reverse().join("-"))
    const monthIndex = date.getMonth()

    if (transaction.transactionType === "credit") {
      chartData[monthIndex].credit += transaction.amount
    } else {
      chartData[monthIndex].debit += transaction.amount
    }
  })

  return chartData
}

// Daily transaction data for more detailed view
const dailyTransactionData = [
  { day: "Mon", credit: 2500, debit: 1800 },
  { day: "Tue", credit: 3200, debit: 2100 },
  { day: "Wed", credit: 2800, debit: 2300 },
  { day: "Thu", credit: 3500, debit: 2800 },
  { day: "Fri", credit: 4200, debit: 3100 },
  { day: "Sat", credit: 3800, debit: 2500 },
  { day: "Sun", credit: 2900, debit: 1900 },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [chartView, setChartView] = useState("monthly")
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [isCustomDateRange, setIsCustomDateRange] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 5

  // Handle date filter change
  useEffect(() => {
    if (dateFilter === "custom") {
      setIsCustomDateRange(true)
    } else {
      setIsCustomDateRange(false)
      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [dateFilter])

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesTransactionType =
      transactionTypeFilter === "all" || transaction.transactionType === transactionTypeFilter

    return matchesSearch && matchesStatus && matchesType && matchesTransactionType
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate statistics
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const successfulTransactions = transactions.filter((t) => t.status === "successful").length
  const failedTransactions = transactions.filter((t) => t.status === "failed").length

  // Calculate credit and debit totals
  const creditTransactions = transactions.filter((t) => t.transactionType === "credit")
  const debitTransactions = transactions.filter((t) => t.transactionType === "debit")
  const totalCredit = creditTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalDebit = debitTransactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Transactions</h1>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View and manage all system transactions</p>
              </TooltipContent>
            </UITooltip>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatsCard
              title="Total Transactions"
              value={transactions.length.toString()}
              change={5.39}
              trend="up"
              bgColor="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
              icon={<TrendingUpIcon className="h-5 w-5 text-red-600" />}
            />
            <StatsCard
              title="Total Amount"
              value={`₦${totalAmount.toLocaleString()}`}
              change={2.29}
              trend="up"
              bgColor="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20"
              icon={<TrendingUpIcon className="h-5 w-5 text-violet-600" />}
            />
            <StatsCard
              title="Credit Transactions"
              value={`₦${totalCredit.toLocaleString()}`}
              change={3.45}
              trend="up"
              bgColor="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
              icon={<ArrowUpIcon className="h-5 w-5 text-green-600" />}
            />
            <StatsCard
              title="Debit Transactions"
              value={`₦${totalDebit.toLocaleString()}`}
              change={1.23}
              trend="down"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
              icon={<ArrowDownIcon className="h-5 w-5 text-blue-600" />}
            />
            <StatsCard
              title="Failed Transactions"
              value={failedTransactions.toString()}
              change={0.75}
              trend="down"
              bgColor="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"
              icon={<XCircleIcon className="h-5 w-5 text-amber-600" />}
            />
          </div>

          {/* Enhanced Transaction Chart */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <CardTitle className="text-xl font-semibold dark:text-gray-100 flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[150px] h-9 text-sm border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>

                  {isCustomDateRange && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={customDateRange.start}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                        className="w-[130px] h-9 border-gray-200 dark:border-gray-700"
                      />
                      <span className="text-sm text-gray-500">to</span>
                      <Input
                        type="date"
                        value={customDateRange.end}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                        className="w-[130px] h-9 border-gray-200 dark:border-gray-700"
                      />
                      <Button size="sm" className="h-9 bg-gradient-to-r from-blue-600 to-blue-700">
                        Apply
                      </Button>
                    </div>
                  )}

                  <Select value={chartView} onValueChange={setChartView}>
                    <SelectTrigger className="w-[120px] h-9 text-sm border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-gray-200 dark:border-gray-700 bg-transparent"
                      >
                        <DownloadIcon className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <FileIcon className="h-4 w-4 mr-2" />
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileTextIcon className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LineChartIcon className="h-4 w-4 mr-2" />
                        Export as Image
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[350px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse text-gray-400">Loading chart data...</div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartView === "monthly" ? (
                      <LineChart data={generateChartData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `₦${value.toLocaleString()}`}
                        />
                        <Tooltip
                          formatter={(value, name) => [`₦${value.toLocaleString()}`, name]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.5rem",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="credit"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ r: 5, strokeWidth: 2, fill: "#10b981" }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                          name="Credit"
                        />
                        <Line
                          type="monotone"
                          dataKey="debit"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ r: 5, strokeWidth: 2, fill: "#6366f1" }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                          name="Debit"
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={dailyTransactionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `₦${value.toLocaleString()}`}
                        />
                        <Tooltip
                          formatter={(value, name) => [`₦${value.toLocaleString()}`, name]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.5rem",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="credit" fill="#10b981" name="Credit" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="debit" fill="#6366f1" name="Debit" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Transactions Table */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold dark:text-gray-100">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Enhanced Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search transactions, users, or details..."
                    className="pl-10 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px] border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="successful">Successful</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px] border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Internet">Internet</SelectItem>
                      <SelectItem value="Cable TV">Cable TV</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Airtime">Airtime</SelectItem>
                      <SelectItem value="Gift Cards">Gift Cards</SelectItem>
                      <SelectItem value="Deposit">Deposit</SelectItem>
                      <SelectItem value="Transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                    <SelectTrigger className="w-[150px] border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsExportDialogOpen(true)}
                    className="border-gray-200 dark:border-gray-700"
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                      <th className="px-4 py-3 font-medium">Transaction ID</th>
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Details</th>
                      <th className="px-4 py-3 font-medium">Date & Time</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${
                          index % 2 === 0 ? "bg-white dark:bg-gray-900/30" : "bg-gray-50/50 dark:bg-gray-800/20"
                        }`}
                      >
                        <td className="px-4 py-4 text-sm font-mono text-blue-600 dark:text-blue-400">
                          {transaction.id}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-medium dark:text-gray-300">{transaction.user.name}</span>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold">
                          <span
                            className={`${
                              transaction.transactionType === "credit"
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-900 dark:text-gray-300"
                            }`}
                          >
                            {transaction.transactionType === "credit" ? "+" : ""}₦{transaction.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm dark:text-gray-300">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm dark:text-gray-300 max-w-[200px] truncate">
                          {transaction.details}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>{transaction.date}</div>
                          <div className="text-xs text-gray-400">{transaction.time}</div>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={transaction.status} />
                        </td>
                        <td className="px-4 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                            onClick={() => {
                              setSelectedTransaction(transaction)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredTransactions.length}</span> transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200 dark:border-gray-700"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 w-9 p-0 ${
                            currentPage === page
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200 dark:border-gray-700"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Transaction Details</DialogTitle>
              </DialogHeader>
              {selectedTransaction && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</div>
                      <div className="font-mono text-blue-600 dark:text-blue-400">{selectedTransaction.id}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
                      <StatusBadge status={selectedTransaction.status} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">User</div>
                      <div className="font-medium dark:text-gray-100">{selectedTransaction.user.name}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</div>
                      <div className="text-lg font-semibold">
                        <span
                          className={
                            selectedTransaction.transactionType === "credit" ? "text-green-600" : "dark:text-gray-100"
                          }
                        >
                          {selectedTransaction.transactionType === "credit" ? "+" : ""}₦
                          {selectedTransaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</div>
                      <div className="font-medium dark:text-gray-100">{selectedTransaction.type}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Type</div>
                      <div className="font-medium dark:text-gray-100 capitalize">
                        {selectedTransaction.transactionType}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Details</div>
                    <div className="font-medium dark:text-gray-100">{selectedTransaction.details}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</div>
                      <div className="font-medium dark:text-gray-100">{selectedTransaction.date}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</div>
                      <div className="font-medium dark:text-gray-100">{selectedTransaction.time}</div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Dialog */}
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Export Transactions</DialogTitle>
                <DialogDescription>Choose your export format and options</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div>
                  <Label className="mb-3 block font-medium">Export Format</Label>
                  <Tabs defaultValue="csv" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="csv" onClick={() => setExportFormat("csv")}>
                        CSV
                      </TabsTrigger>
                      <TabsTrigger value="pdf" onClick={() => setExportFormat("pdf")}>
                        PDF
                      </TabsTrigger>
                      <TabsTrigger value="excel" onClick={() => setExportFormat("excel")}>
                        Excel
                      </TabsTrigger>
                      <TabsTrigger value="print" onClick={() => setExportFormat("print")}>
                        Print
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div>
                  <Label className="mb-3 block font-medium">Date Range</Label>
                  <div className="grid grid-cols-1 gap-4">
                    <Select defaultValue="today">
                      <SelectTrigger className="border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block font-medium">Include Columns</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "col-id", label: "Transaction ID" },
                      { id: "col-user", label: "User" },
                      { id: "col-amount", label: "Amount" },
                      { id: "col-type", label: "Type" },
                      { id: "col-details", label: "Details" },
                      { id: "col-date", label: "Date & Time" },
                      { id: "col-status", label: "Status" },
                      { id: "col-transaction-type", label: "Transaction Type" },
                    ].map((col) => (
                      <div key={col.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={col.id}
                          defaultChecked
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <Label htmlFor={col.id} className="text-sm font-normal">
                          {col.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-700"
                  onClick={() => {
                    console.log(`Exporting as ${exportFormat}`)
                    setIsExportDialogOpen(false)
                  }}
                >
                  Export Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  )
}

// Enhanced Stats Card Component
function StatsCard({ title, value, change, trend, bgColor, icon }) {
  return (
    <Card className={`${bgColor} border-0 shadow-md hover:shadow-lg transition-shadow duration-200`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</div>
            <div className="text-2xl font-bold mb-2 dark:text-gray-100">{value}</div>
            <div className="flex items-center">
              {trend === "up" ? (
                <TrendingUpIcon className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {change}%
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Status Badge Component
function StatusBadge({ status }) {
  if (status === "successful") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit dark:bg-green-900 dark:text-green-200 px-3 py-1">
        <CheckCircleIcon className="h-3 w-3" />
        Successful
      </Badge>
    )
  } else if (status === "failed") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1 w-fit dark:bg-red-900 dark:text-red-200 px-3 py-1">
        <XCircleIcon className="h-3 w-3" />
        Failed
      </Badge>
    )
  }
  return null
}
