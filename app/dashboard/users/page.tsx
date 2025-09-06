"use client"

import { useState, useEffect } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  SearchIcon,
  TrashIcon,
  UserPlusIcon,
  XIcon,
  FileIcon,
  SettingsIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PrinterIcon,
  CreditCardIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "../components/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { HistoryIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { TransactionLog } from "../components/transaction-log"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample user data
const users = [
  {
    id: "USR-78945",
    name: "Kathryn Murphy",
    email: "kathryn.murphy@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Super Admin",
    status: "Active",
    lastActive: "2 hours ago",
    joinDate: "15 Jan 2023",
    phone: "+234 803 456 7890",
    kycStatus: "Verified",
    idNumber: "NG-ID-12345678",
    accountNumber: "2345678901",
    accountBalance: 25000.5,
    jTokenBalance: 450,
  },
  {
    id: "USR-65412",
    name: "James Harrid",
    email: "james.harrid@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "User",
    status: "Active",
    lastActive: "5 hours ago",
    joinDate: "22 Feb 2023",
    phone: "+234 805 123 4567",
    kycStatus: "Not Verified",
    idNumber: "NG-ID-23456789",
    accountNumber: "3456789012",
    accountBalance: 12500.75,
    jTokenBalance: 120,
  },
  {
    id: "USR-32145",
    name: "Elon Melon",
    email: "elon.melon@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "User",
    status: "Suspended",
    lastActive: "2 days ago",
    joinDate: "10 Mar 2023",
    phone: "+234 701 987 6543",
    kycStatus: "Verified",
    idNumber: "NG-ID-34567890",
    accountNumber: "4567890123",
    accountBalance: 5000.0,
    jTokenBalance: 0,
  },
  {
    id: "USR-98765",
    name: "Mia Smith",
    email: "mia.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "User",
    status: "Active",
    lastActive: "1 hour ago",
    joinDate: "05 Apr 2023",
    phone: "+234 802 345 6789",
    kycStatus: "Verified",
    idNumber: "NG-ID-45678901",
    accountNumber: "5678901234",
    accountBalance: 35750.25,
    jTokenBalance: 780,
  },
  {
    id: "USR-45678",
    name: "James Doe",
    email: "james.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "User",
    status: "Suspended",
    lastActive: "1 week ago",
    joinDate: "18 May 2023",
    phone: "+234 703 456 7890",
    kycStatus: "Not Verified",
    idNumber: "NG-ID-56789012",
    accountNumber: "6789012345",
    accountBalance: 0.0,
    jTokenBalance: 0,
  },
  {
    id: "USR-23456",
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Manager",
    status: "Active",
    lastActive: "3 hours ago",
    joinDate: "30 Jun 2023",
    phone: "+234 809 876 5432",
    kycStatus: "Verified",
    idNumber: "NG-ID-67890123",
    accountNumber: "7890123456",
    accountBalance: 150000.0,
    jTokenBalance: 1250,
  },
  {
    id: "USR-87654",
    name: "John Matrix",
    email: "john.matrix@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support",
    status: "Active",
    lastActive: "Just now",
    joinDate: "12 Jul 2023",
    phone: "+234 808 765 4321",
    kycStatus: "Verified",
    idNumber: "NG-ID-78901234",
    accountNumber: "8901234567",
    accountBalance: 8250.5,
    jTokenBalance: 320,
  },
  {
    id: "USR-34567",
    name: "Dutch Schaefer",
    email: "dutch.schaefer@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Analyst",
    status: "Suspended",
    lastActive: "3 days ago",
    joinDate: "25 Aug 2023",
    phone: "+234 705 432 1098",
    kycStatus: "Not Verified",
    idNumber: "NG-ID-89012345",
    accountNumber: "9012345678",
    accountBalance: 500.25,
    jTokenBalance: 50,
  },
  {
    id: "USR-56789",
    name: "Ellen Ripley",
    email: "ellen.ripley@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Auditor",
    status: "Active",
    lastActive: "4 hours ago",
    joinDate: "09 Sep 2023",
    phone: "+234 806 543 2109",
    kycStatus: "Verified",
    idNumber: "NG-ID-90123456",
    accountNumber: "0123456789",
    accountBalance: 27500.0,
    jTokenBalance: 600,
  },
  {
    id: "USR-67890",
    name: "John Rambo",
    email: "john.rambo@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ticketing",
    status: "Suspended",
    lastActive: "2 weeks ago",
    joinDate: "14 Oct 2023",
    phone: "+234 704 321 0987",
    kycStatus: "Not Verified",
    idNumber: "NG-ID-01234567",
    accountNumber: "1234567890",
    accountBalance: 0.0,
    jTokenBalance: 0,
  },
]

// Sample data for user registrations
const generateRegistrationData = () => {
  const today = new Date()
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return hours.map((hour) => {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`
    return {
      hour: formattedHour,
      registrations: Math.floor(Math.random() * 15) + 1,
    }
  })
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState("today")
  const [registrationData, setRegistrationData] = useState([])
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [isCustomDateRange, setIsCustomDateRange] = useState(false)
  const itemsPerPage = 5
  const { toast } = useToast()

  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportColumns, setExportColumns] = useState({
    name: true,
    email: true,
    accountNumber: true,
    balance: true,
    phone: true,
    kycStatus: true,
    role: true,
    status: true,
  })

  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [transactionType, setTransactionType] = useState("credit")
  const [transactionAmount, setTransactionAmount] = useState("")
  const [transactionDescription, setTransactionDescription] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("users")

  useEffect(() => {
    setRegistrationData(generateRegistrationData())
  }, [])

  useEffect(() => {
    if (dateFilter === "custom") {
      setIsCustomDateRange(true)
    } else {
      setIsCustomDateRange(false)
      console.log(`Fetching data for ${dateFilter} period`)
    }
  }, [dateFilter])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const activeUsers = users.filter((u) => u.status === "Active").length
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length
  const adminUsers = users.filter((u) => u.role === "Admin").length
  const verifiedUsers = users.filter((u) => u.kycStatus === "Verified").length
  const totalUserFunds = users.reduce((sum, user) => sum + user.accountBalance, 0)

  const handleExport = (format) => {
    console.log(`Exporting users in ${format} format with columns:`, exportColumns)
    setExportDialogOpen(false)
  }

  const validateTransaction = () => {
    if (!selectedUser || !transactionAmount || Number.parseFloat(transactionAmount) <= 0) {
      toast({
        title: "Invalid transaction",
        description: "Please enter a valid amount.",
        variant: "destructive",
      })
      return false
    }

    const amount = Number.parseFloat(transactionAmount)
    const isDebit = transactionType.includes("debit")
    const isJToken = transactionType.includes("jtoken")

    if (isDebit) {
      const currentBalance = isJToken ? selectedUser.jTokenBalance : selectedUser.accountBalance
      if (amount > currentBalance) {
        toast({
          title: "Insufficient funds",
          description: `Cannot debit ₦${amount.toLocaleString()} from account with balance of ₦${currentBalance.toLocaleString()}`,
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  const handleTransactionSubmit = () => {
    if (!validateTransaction()) return
    setShowConfirmDialog(true)
  }

  const executeTransaction = () => {
    const amount = Number.parseFloat(transactionAmount)
    const isCredit = transactionType.includes("credit")
    const isJToken = transactionType.includes("jtoken")

    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: isJToken ? 0 : 2,
      maximumFractionDigits: isJToken ? 0 : 2,
    })

    // Here you would typically make an API call to update the user's balance
    console.log("Executing transaction:", {
      userId: selectedUser.id,
      type: transactionType,
      amount,
      description: transactionDescription,
      adminId: "current-admin-id", // This would come from auth context
    })

    toast({
      title: "Transaction successful",
      description: `${isCredit ? "Credited" : "Debited"} ${isJToken ? "" : "₦"}${formattedAmount}${isJToken ? " JTokens" : ""} ${isCredit ? "to" : "from"} ${selectedUser.name}'s account.`,
    })

    setIsTransactionDialogOpen(false)
    setShowConfirmDialog(false)
    setTransactionAmount("")
    setTransactionDescription("")
  }

  const calculateNewBalance = () => {
    if (!selectedUser || !transactionAmount) return 0

    const amount = Number.parseFloat(transactionAmount) || 0
    const isCredit = transactionType.includes("credit")
    const isJToken = transactionType.includes("jtoken")
    const currentBalance = isJToken ? selectedUser.jTokenBalance : selectedUser.accountBalance

    return currentBalance + (isCredit ? amount : -amount)
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">User Management</h1>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlusIcon className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account by filling out the form below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" placeholder="Email address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                      <SelectItem value="Auditor">Auditor</SelectItem>
                      <SelectItem value="Ticketing">Ticketing</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input id="password" type="password" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" placeholder="Phone number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kyc" className="text-right">
                    KYC Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select KYC status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Not Verified">Not Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    ID Number
                  </Label>
                  <Input id="id" placeholder="ID number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={users.length.toString()}
            change={8.12}
            trend="up"
            bgColor="bg-violet-50"
          />
          <StatsCard
            title="Total User Funds"
            value={`₦${totalUserFunds.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            change={5.39}
            trend="up"
            bgColor="bg-blue-50"
          />
          <StatsCard
            title="Active Users"
            value={activeUsers.toString()}
            change={3.25}
            trend="up"
            bgColor="bg-green-50"
          />
          <StatsCard
            title="Verified Users"
            value={verifiedUsers.toString()}
            change={2.1}
            trend="up"
            bgColor="bg-amber-50"
          />
        </div>

        {/* User Registration Chart */}
        <div className="mb-8">
          <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">
                User Registration History
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[150px] h-8 text-sm">
                    <SelectValue placeholder="Select range" />
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
                      className="w-[130px] h-8 text-sm"
                    />
                    <span className="text-sm">to</span>
                    <Input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                      className="w-[130px] h-8 text-sm"
                    />
                    <Button size="sm" className="h-8">
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={registrationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                      formatter={(value) => [`${value} Users`, "Registrations"]}
                      labelFormatter={(label) => `Time: ${label}`}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="registrations"
                      name="New Registrations"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Log</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Users Table */}
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium dark:text-gray-100">All Users</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Analyst">Analyst</SelectItem>
                        <SelectItem value="Auditor">Auditor</SelectItem>
                        <SelectItem value="Ticketing">Ticketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <DownloadIcon className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                          <SettingsIcon className="h-4 w-4 mr-2" />
                          Export Options
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExport("csv")}>
                          <FileIcon className="h-4 w-4 mr-2" />
                          Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport("pdf")}>
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Export as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport("excel")}>
                          <FileSpreadsheetIcon className="h-4 w-4 mr-2" />
                          Export as Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport("print")}>
                          <PrinterIcon className="h-4 w-4 mr-2" />
                          Print
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b dark:border-gray-700">
                        <th className="pb-3 font-normal">User</th>
                        <th className="pb-3 font-normal">Username</th>
                        <th className="pb-3 font-normal">Account No.</th>
                        <th className="pb-3 font-normal">Balance</th>
                        <th className="pb-3 font-normal">JToken Balance</th>
                        <th className="pb-3 font-normal">Phone</th>
                        <th className="pb-3 font-normal">KYC Status</th>
                        <th className="pb-3 font-normal">Role</th>
                        <th className="pb-3 font-normal">Status</th>
                        <th className="pb-3 font-normal">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                      {paginatedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="py-4">
                            <div>
                              <div className="font-medium dark:text-gray-200">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-medium dark:text-gray-300">{user.id}</td>
                          <td className="py-4 text-sm font-mono dark:text-gray-300">{user.accountNumber}</td>
                          <td className="py-4 text-sm font-medium dark:text-gray-300">
                            ₦
                            {user.accountBalance.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="py-4 text-sm font-medium dark:text-gray-300">
                            {user.jTokenBalance.toLocaleString()}
                          </td>
                          <td className="py-4 text-sm dark:text-gray-300">{user.phone}</td>
                          <td className="py-4">
                            <KycStatusBadge status={user.kycStatus} />
                          </td>
                          <td className="py-4">
                            <RoleBadge role={user.role} />
                          </td>
                          <td className="py-4">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setIsTransactionDialogOpen(true)
                                  }}
                                >
                                  <CreditCardIcon className="h-4 w-4 mr-2" />
                                  Credit/Debit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setIsTransactionHistoryOpen(true)
                                  }}
                                >
                                  <HistoryIcon className="h-4 w-4 mr-2" />
                                  Transaction History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <TrashIcon className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionLog />
          </TabsContent>
        </Tabs>

        {/* Manual Credit/Debit Dialog */}
        <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manual Balance Adjustment</DialogTitle>
              <DialogDescription>
                {selectedUser && `Manually adjust the balance for ${selectedUser.name} (${selectedUser.id})`}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Transaction Type
                  </Label>
                  <div className="col-span-3">
                    <Select value={transactionType} onValueChange={setTransactionType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit (Add Funds)</SelectItem>
                        <SelectItem value="debit">Debit (Remove Funds)</SelectItem>
                        <SelectItem value="credit-jtoken">Credit JTokens</SelectItem>
                        <SelectItem value="debit-jtoken">Debit JTokens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="current-balance" className="text-right">
                    Current Balance
                  </Label>
                  <div className="col-span-3 text-sm font-medium">
                    {transactionType.includes("jtoken")
                      ? `${selectedUser.jTokenBalance.toLocaleString()} JTokens`
                      : `₦${selectedUser.accountBalance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-amount" className="text-right">
                    Amount
                  </Label>
                  <div className="col-span-3 relative">
                    {!transactionType.includes("jtoken") && (
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₦</span>
                    )}
                    <Input
                      id="transaction-amount"
                      type="number"
                      step={transactionType.includes("jtoken") ? "1" : "0.01"}
                      min="0"
                      placeholder={transactionType.includes("jtoken") ? "0" : "0.00"}
                      className={transactionType.includes("jtoken") ? "" : "pl-7"}
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="transaction-description"
                    placeholder="Enter transaction description (required)"
                    className="col-span-3"
                    value={transactionDescription}
                    onChange={(e) => setTransactionDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-balance" className="text-right">
                    New Balance
                  </Label>
                  <div className="col-span-3 text-sm font-medium">
                    {transactionType.includes("jtoken")
                      ? `${calculateNewBalance().toLocaleString()} JTokens`
                      : `₦${calculateNewBalance().toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </div>
                </div>

                {/* Warning for debit transactions */}
                {transactionType.includes("debit") && transactionAmount && (
                  <div className="col-span-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                    <AlertTriangleIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <strong>Warning:</strong> This will debit funds from the user's account. Please ensure this action
                      is authorized and documented.
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleTransactionSubmit}
                disabled={
                  !transactionAmount || Number.parseFloat(transactionAmount) <= 0 || !transactionDescription.trim()
                }
                className={
                  transactionType.includes("credit") ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }
              >
                {transactionType === "credit"
                  ? "Credit Account"
                  : transactionType === "debit"
                    ? "Debit Account"
                    : transactionType === "credit-jtoken"
                      ? "Credit JTokens"
                      : "Debit JTokens"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5 text-blue-600" />
                Confirm Transaction
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3">
                  <p>Please review the transaction details before proceeding:</p>
                  {selectedUser && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">User:</span>
                        <span>
                          {selectedUser.name} ({selectedUser.id})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Transaction Type:</span>
                        <span className="capitalize">{transactionType.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Amount:</span>
                        <span className={transactionType.includes("credit") ? "text-green-600" : "text-red-600"}>
                          {transactionType.includes("credit") ? "+" : "-"}
                          {transactionType.includes("jtoken") ? "" : "₦"}
                          {Number.parseFloat(transactionAmount || "0").toLocaleString(undefined, {
                            minimumFractionDigits: transactionType.includes("jtoken") ? 0 : 2,
                            maximumFractionDigits: transactionType.includes("jtoken") ? 0 : 2,
                          })}
                          {transactionType.includes("jtoken") ? " JTokens" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Current Balance:</span>
                        <span>
                          {transactionType.includes("jtoken")
                            ? `${selectedUser.jTokenBalance.toLocaleString()} JTokens`
                            : `₦${selectedUser.accountBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">New Balance:</span>
                        <span className="font-bold">
                          {transactionType.includes("jtoken")
                            ? `${calculateNewBalance().toLocaleString()} JTokens`
                            : `₦${calculateNewBalance().toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="font-medium">Description:</span>
                        <p className="text-sm mt-1">{transactionDescription}</p>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone. The transaction will be logged for audit purposes.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={executeTransaction}
                className={
                  transactionType.includes("credit") ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }
              >
                Confirm Transaction
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Other existing dialogs remain the same... */}
        {/* Transaction History Dialog */}
        <Dialog open={isTransactionHistoryOpen} onOpenChange={setIsTransactionHistoryOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Transaction History</DialogTitle>
              <DialogDescription>
                {selectedUser && `Viewing transactions for ${selectedUser.name} (${selectedUser.id})`}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Account Balance:{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ₦
                      {selectedUser.accountBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="credit">Credit</SelectItem>
                        <SelectItem value="debit">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="today">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Date range" />
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
                <div className="border rounded-md overflow-hidden dark:border-gray-700">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Transaction ID</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          2023-05-15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          TRX-78945
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Credit</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Deposit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">+₦5,000.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Successful</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          2023-05-10
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          TRX-65412
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Debit</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Withdrawal</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">-₦2,500.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Successful</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Showing 2 of 24 transactions</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Export Options Dialog */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Options</DialogTitle>
              <DialogDescription>Select the columns and format for export.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Export Format</Label>
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
              <div className="grid gap-2">
                <Label>Select Columns</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(exportColumns).map(([key, checked]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`col-${key}`}
                        checked={checked}
                        onChange={(e) => setExportColumns({ ...exportColumns, [key]: e.target.checked })}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <Label htmlFor={`col-${key}`} className="text-sm font-normal capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleExport(exportFormat)}>Export</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change, trend, bgColor }) {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="pt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
        <div className="text-2xl font-bold mt-2 mb-2 dark:text-gray-100">{value}</div>
        <div className="flex items-center">
          {trend === "up" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {change > 0 ? change : "No change"}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// Role Badge Component
function RoleBadge({ role }) {
  const roleConfig = {
    "Super Admin": { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-200" },
    Manager: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200" },
    Support: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200" },
    Analyst: { bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-800 dark:text-amber-200" },
    Auditor: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" },
    Ticketing: { bg: "bg-pink-100 dark:bg-pink-900", text: "text-pink-800 dark:text-pink-200" },
    Admin: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200" },
    User: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" },
  }

  const config = roleConfig[role] || roleConfig["User"]
  return <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>{role}</Badge>
}

// Status Badge Component
function StatusBadge({ status }) {
  if (status === "Active") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit dark:bg-green-900 dark:text-green-200">
        <CheckIcon className="h-3 w-3" />
        Active
      </Badge>
    )
  } else if (status === "Suspended") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1 w-fit dark:bg-red-900 dark:text-red-200">
        <XIcon className="h-3 w-3" />
        Suspended
      </Badge>
    )
  }
  return null
}

function KycStatusBadge({ status }) {
  if (status === "Verified") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit dark:bg-green-900 dark:text-green-200">
        <CheckIcon className="h-3 w-3" />
        Verified
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1 w-fit dark:bg-amber-900 dark:text-amber-200">
        <XIcon className="h-3 w-3" />
        Not Verified
      </Badge>
    )
  }
}
