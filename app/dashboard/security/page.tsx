"use client"

import { useState } from "react"
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  FilterIcon,
  KeyIcon,
  RefreshCwIcon,
  SearchIcon,
  ServerIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
  TicketIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sidebar } from "../components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Sample suspicious transactions data
const suspiciousTransactions = [
  {
    id: "TRX-78945",
    user: "John Doe",
    accountNumber: "1234567890",
    amount: 250000,
    type: "Transfer",
    status: "Flagged",
    reason: "Unusual amount",
    timestamp: "2023-08-15T14:30:00",
  },
  {
    id: "TRX-65412",
    user: "Jane Smith",
    accountNumber: "0987654321",
    amount: 100000,
    type: "Withdrawal",
    status: "Blocked",
    reason: "Multiple attempts",
    timestamp: "2023-08-15T12:45:00",
  },
  {
    id: "TRX-32145",
    user: "Robert Johnson",
    accountNumber: "5678901234",
    amount: 75000,
    type: "Transfer",
    status: "Investigating",
    reason: "Suspicious recipient",
    timestamp: "2023-08-14T18:20:00",
  },
  {
    id: "TRX-98765",
    user: "Sarah Williams",
    accountNumber: "4321098765",
    amount: 500000,
    type: "Deposit",
    status: "Flagged",
    reason: "Large deposit",
    timestamp: "2023-08-14T10:15:00",
  },
  {
    id: "TRX-45678",
    user: "Michael Brown",
    accountNumber: "9876543210",
    amount: 150000,
    type: "Transfer",
    status: "Cleared",
    reason: "Verified legitimate",
    timestamp: "2023-08-13T16:50:00",
  },
]

// Sample admin users data
const adminUsers = [
  {
    id: "ADM-001",
    name: "Admin User",
    email: "admin@example.com",
    role: "Super Admin",
    lastLogin: "2023-08-15T09:30:00",
    status: "Active",
    permissions: ["dashboard", "users", "transactions", "reports", "system", "security", "ticketing"],
  },
  {
    id: "ADM-002",
    name: "John Manager",
    email: "john.manager@example.com",
    role: "Manager",
    lastLogin: "2023-08-15T08:45:00",
    status: "Active",
    permissions: ["dashboard", "users", "transactions", "reports"],
  },
  {
    id: "ADM-003",
    name: "Sarah Support",
    email: "sarah.support@example.com",
    role: "Support",
    lastLogin: "2023-08-14T16:20:00",
    status: "Active",
    permissions: ["dashboard", "users", "transactions"],
  },
  {
    id: "ADM-004",
    name: "Robert Analyst",
    email: "robert.analyst@example.com",
    role: "Analyst",
    lastLogin: "2023-08-13T14:10:00",
    status: "Inactive",
    permissions: ["dashboard", "reports"],
  },
  {
    id: "ADM-005",
    name: "Emily Auditor",
    email: "emily.auditor@example.com",
    role: "Auditor",
    lastLogin: "2023-08-12T11:30:00",
    status: "Active",
    permissions: ["dashboard", "reports", "transactions"],
  },
  {
    id: "ADM-006",
    name: "Thomas Ticketing",
    email: "thomas.ticketing@example.com",
    role: "Ticketing",
    lastLogin: "2023-08-14T10:15:00",
    status: "Active",
    permissions: ["dashboard", "ticketing"],
  },
]

// Sample system logs data
const systemLogs = [
  {
    id: "LOG-001",
    type: "Login",
    user: "Admin User",
    action: "Successful login",
    ip: "192.168.1.1",
    timestamp: "2023-08-15T09:30:00",
    status: "Success",
  },
  {
    id: "LOG-002",
    type: "Transaction",
    user: "John Manager",
    action: "Approved transaction TRX-78945",
    ip: "192.168.1.2",
    timestamp: "2023-08-15T10:15:00",
    status: "Success",
  },
  {
    id: "LOG-003",
    type: "User",
    user: "Sarah Support",
    action: "Updated user profile for customer ID: USR-12345",
    ip: "192.168.1.3",
    timestamp: "2023-08-15T11:20:00",
    status: "Success",
  },
  {
    id: "LOG-004",
    type: "Login",
    user: "Unknown",
    action: "Failed login attempt",
    ip: "203.0.113.1",
    timestamp: "2023-08-15T12:05:00",
    status: "Failed",
  },
  {
    id: "LOG-005",
    type: "System",
    user: "System",
    action: "Scheduled maintenance started",
    ip: "127.0.0.1",
    timestamp: "2023-08-15T13:00:00",
    status: "Info",
  },
]

// Sample API performance data
const apiPerformanceData = [
  { time: "00:00", responseTime: 120, errorRate: 0.5, requests: 350 },
  { time: "02:00", responseTime: 125, errorRate: 0.7, requests: 280 },
  { time: "04:00", responseTime: 130, errorRate: 0.3, requests: 200 },
  { time: "06:00", responseTime: 140, errorRate: 0.2, requests: 320 },
  { time: "08:00", responseTime: 180, errorRate: 1.2, requests: 600 },
  { time: "10:00", responseTime: 210, errorRate: 1.8, requests: 750 },
  { time: "12:00", responseTime: 230, errorRate: 2.0, requests: 820 },
  { time: "14:00", responseTime: 220, errorRate: 1.5, requests: 780 },
  { time: "16:00", responseTime: 200, errorRate: 1.0, requests: 700 },
  { time: "18:00", responseTime: 190, errorRate: 0.8, requests: 650 },
  { time: "20:00", responseTime: 160, errorRate: 0.6, requests: 500 },
  { time: "22:00", responseTime: 140, errorRate: 0.4, requests: 400 },
]

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("suspicious")
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Filter suspicious transactions based on search query
  const filteredTransactions = suspiciousTransactions.filter((transaction) => {
    return (
      transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.accountNumber.includes(searchQuery)
    )
  })

  // Filter admin users based on search query
  const filteredAdmins = adminUsers.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Filter system logs based on search query
  const filteredLogs = systemLogs.filter((log) => {
    return (
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Security & Monitoring</h1>
          <Button variant="outline" className="gap-2">
            <RefreshCwIcon className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="System Uptime"
            value="99.98%"
            change={0.02}
            trend="up"
            icon={<ServerIcon className="h-5 w-5 text-emerald-600" />}
            bgColor="bg-emerald-50"
          />
          <StatsCard
            title="Suspicious Activities"
            value="24"
            change={15}
            trend="down"
            icon={<AlertTriangleIcon className="h-5 w-5 text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <StatsCard
            title="Failed Logins"
            value="12"
            change={8}
            trend="down"
            icon={<XCircleIcon className="h-5 w-5 text-red-600" />}
            bgColor="bg-red-50"
          />
          <StatsCard
            title="Active Admins"
            value="8"
            change={2}
            trend="up"
            icon={<UsersIcon className="h-5 w-5 text-blue-600" />}
            bgColor="bg-blue-50"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="suspicious" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="suspicious">Suspicious Activities</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="performance">System Performance</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>

          {/* Suspicious Activities Tab Content */}
          <TabsContent value="suspicious">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Suspicious Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="cleared">Cleared</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <FilterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="pb-3 font-normal">Transaction</th>
                        <th className="pb-3 font-normal">User</th>
                        <th className="pb-3 font-normal">Amount</th>
                        <th className="pb-3 font-normal">Type</th>
                        <th className="pb-3 font-normal">Status</th>
                        <th className="pb-3 font-normal">Reason</th>
                        <th className="pb-3 font-normal">Time</th>
                        <th className="pb-3 font-normal">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="py-4">
                            <div className="font-medium">{transaction.id}</div>
                          </td>
                          <td className="py-4">
                            <div className="font-medium">{transaction.user}</div>
                            <div className="text-xs text-gray-500">{transaction.accountNumber}</div>
                          </td>
                          <td className="py-4 font-medium">₦{transaction.amount.toLocaleString()}</td>
                          <td className="py-4">{transaction.type}</td>
                          <td className="py-4">
                            <StatusBadge status={transaction.status} />
                          </td>
                          <td className="py-4 text-sm text-gray-600">{transaction.reason}</td>
                          <td className="py-4 text-sm">
                            {new Date(transaction.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <EyeIcon className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                                  Mark as Cleared
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <AlertCircleIcon className="h-4 w-4 mr-2" />
                                  Flag for Review
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <XCircleIcon className="h-4 w-4 mr-2" />
                                  Block Transaction
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Control Tab Content */}
          <TabsContent value="access">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Admin Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search admins..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                        <SelectItem value="ticketing">Ticketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <FilterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="pb-3 font-normal">Admin</th>
                        <th className="pb-3 font-normal">Email</th>
                        <th className="pb-3 font-normal">Role</th>
                        <th className="pb-3 font-normal">Last Login</th>
                        <th className="pb-3 font-normal">Status</th>
                        <th className="pb-3 font-normal">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredAdmins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50">
                          <td className="py-4">
                            <div className="font-medium">{admin.name}</div>
                            <div className="text-xs text-gray-500">{admin.id}</div>
                          </td>
                          <td className="py-4">{admin.email}</td>
                          <td className="py-4">
                            <RoleBadge role={admin.role} />
                          </td>
                          <td className="py-4 text-sm">
                            {new Date(admin.lastLogin).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td className="py-4">
                            <Badge
                              className={`${
                                admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              } hover:bg-green-100 border-0`}
                            >
                              {admin.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  setSelectedUser(admin)
                                  setIsUserDetailsOpen(true)
                                }}
                              >
                                Manage
                              </Button>
                              <Button
                                variant={admin.status === "Active" ? "destructive" : "outline"}
                                size="sm"
                                className="h-8"
                              >
                                {admin.status === "Active" ? "Deactivate" : "Activate"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* User Details Dialog */}
                <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Admin User Details</DialogTitle>
                      <DialogDescription>View and manage admin user permissions.</DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                      <div className="py-4">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-full flex items-center justify-center font-medium text-lg">
                            {selectedUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium text-lg">{selectedUser.name}</div>
                            <div className="text-gray-500">{selectedUser.email}</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">User ID</div>
                              <div className="font-medium">{selectedUser.id}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Role</div>
                              <div className="font-medium">{selectedUser.role}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Status</div>
                              <div className="font-medium">{selectedUser.status}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Last Login</div>
                              <div className="font-medium">{new Date(selectedUser.lastLogin).toLocaleString()}</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-500 mb-2">Permissions</div>
                            <div className="space-y-2">
                              <PermissionItem
                                name="View Dashboard"
                                description="Access to view dashboard and analytics"
                                enabled={selectedUser.permissions?.includes("dashboard")}
                                requiredRole="Any"
                              />
                              <PermissionItem
                                name="Manage Users"
                                description="Create, edit, and delete user accounts"
                                enabled={selectedUser.permissions?.includes("users")}
                                requiredRole="Super Admin, Manager, Support"
                              />
                              <PermissionItem
                                name="Process Transactions"
                                description="Approve or reject transactions"
                                enabled={selectedUser.permissions?.includes("transactions")}
                                requiredRole="Super Admin, Manager, Support, Auditor"
                              />
                              <PermissionItem
                                name="View Reports"
                                description="Access to all system reports"
                                enabled={selectedUser.permissions?.includes("reports")}
                                requiredRole="Super Admin, Manager, Analyst, Auditor"
                              />
                              <PermissionItem
                                name="System Configuration"
                                description="Change system settings and configurations"
                                enabled={selectedUser.permissions?.includes("system")}
                                requiredRole="Super Admin"
                              />
                              <PermissionItem
                                name="Security Management"
                                description="Manage security settings and access controls"
                                enabled={selectedUser.permissions?.includes("security")}
                                requiredRole="Super Admin"
                              />
                              <PermissionItem
                                name="Ticketing System"
                                description="Access to the ticketing system"
                                enabled={selectedUser.permissions?.includes("ticketing")}
                                requiredRole="Super Admin, Ticketing"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsUserDetailsOpen(false)}>
                        Close
                      </Button>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Performance Tab Content */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* API Response Time Chart */}
              <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">API Response Time</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={apiPerformanceData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#888" }}
                          domain={[0, 300]}
                          tickFormatter={(value) => `${value}ms`}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}ms`, "Response Time"]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.375rem",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="responseTime"
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

              {/* Error Rate Chart */}
              <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Error Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={apiPerformanceData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#888" }}
                          domain={[0, 3]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Error Rate"]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.375rem",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="errorRate"
                          stroke="#ef4444"
                          fill="#fee2e2"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Server Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">API Server</div>
                        <div className="text-sm text-green-600">Operational</div>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Database Server</div>
                        <div className="text-sm text-green-600">Operational</div>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Web Server</div>
                        <div className="text-sm text-green-600">Operational</div>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Cache Server</div>
                        <div className="text-sm text-amber-600">Degraded</div>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">CPU Usage</div>
                        <div className="text-sm">42%</div>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Memory Usage</div>
                        <div className="text-sm">68%</div>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Disk Usage</div>
                        <div className="text-sm">35%</div>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Network Bandwidth</div>
                        <div className="text-sm">56%</div>
                      </div>
                      <Progress value={56} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Scheduled Maintenance</div>
                        <div className="text-sm text-gray-500">Aug 20, 2023 - 02:00 AM</div>
                        <div className="text-xs text-gray-500 mt-1">Database optimization</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-800 p-2 rounded-md">
                        <CheckCircleIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Last Backup</div>
                        <div className="text-sm text-gray-500">Aug 15, 2023 - 01:00 AM</div>
                        <div className="text-xs text-gray-500 mt-1">Completed successfully</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 text-amber-800 p-2 rounded-md">
                        <RefreshCwIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">System Update</div>
                        <div className="text-sm text-gray-500">Aug 25, 2023 - 03:00 AM</div>
                        <div className="text-xs text-gray-500 mt-1">Version 2.5.0 deployment</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Logs Tab Content */}
          <TabsContent value="logs">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">System Activity Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search logs..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="login">Login</SelectItem>
                        <SelectItem value="transaction">Transaction</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <FilterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="pb-3 font-normal">Log ID</th>
                        <th className="pb-3 font-normal">Type</th>
                        <th className="pb-3 font-normal">User</th>
                        <th className="pb-3 font-normal">Action</th>
                        <th className="pb-3 font-normal">IP Address</th>
                        <th className="pb-3 font-normal">Time</th>
                        <th className="pb-3 font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="py-4">
                            <div className="font-medium">{log.id}</div>
                          </td>
                          <td className="py-4">
                            <LogTypeBadge type={log.type} />
                          </td>
                          <td className="py-4">{log.user}</td>
                          <td className="py-4 max-w-xs">
                            <div className="text-sm text-gray-600 truncate">{log.action}</div>
                          </td>
                          <td className="py-4">{log.ip}</td>
                          <td className="py-4 text-sm">
                            {new Date(log.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td className="py-4">
                            <LogStatusBadge status={log.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change, trend, icon, bgColor }) {
  return (
    <Card className={`${bgColor} border-none shadow-sm bg-white dark:bg-gray-900`}>
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2 mb-1 text-gray-800 dark:text-gray-100">{value}</div>
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

// Status Badge Component
function StatusBadge({ status }) {
  switch (status) {
    case "Flagged":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
          <AlertTriangleIcon className="h-3 w-3 mr-1" />
          Flagged
        </Badge>
      )
    case "Blocked":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Blocked
        </Badge>
      )
    case "Investigating":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
          <SearchIcon className="h-3 w-3 mr-1" />
          Investigating
        </Badge>
      )
    case "Cleared":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Cleared
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

// Role Badge Component
function RoleBadge({ role }) {
  switch (role) {
    case "Super Admin":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-0">
          <ShieldIcon className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      )
    case "Manager":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
          <UsersIcon className="h-3 w-3 mr-1" />
          Manager
        </Badge>
      )
    case "Support":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
          <UserIcon className="h-3 w-3 mr-1" />
          Support
        </Badge>
      )
    case "Analyst":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
          <SearchIcon className="h-3 w-3 mr-1" />
          Analyst
        </Badge>
      )
    case "Auditor":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0">
          <ClockIcon className="h-3 w-3 mr-1" />
          Auditor
        </Badge>
      )
    case "Ticketing":
      return (
        <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100 border-0">
          <TicketIcon className="h-3 w-3 mr-1" />
          Ticketing
        </Badge>
      )
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}

// Log Type Badge Component
function LogTypeBadge({ type }) {
  switch (type) {
    case "Login":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
          <KeyIcon className="h-3 w-3 mr-1" />
          Login
        </Badge>
      )
    case "Transaction":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
          <RefreshCwIcon className="h-3 w-3 mr-1" />
          Transaction
        </Badge>
      )
    case "User":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-0">
          <UserIcon className="h-3 w-3 mr-1" />
          User
        </Badge>
      )
    case "System":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
          <ServerIcon className="h-3 w-3 mr-1" />
          System
        </Badge>
      )
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

// Log Status Badge Component
function LogStatusBadge({ status }) {
  switch (status) {
    case "Success":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Success</Badge>
    case "Failed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">Failed</Badge>
    case "Info":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">Info</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

// Permission Item Component
function PermissionItem({ name, description, enabled, requiredRole }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500">{description}</div>
        {requiredRole && <div className="text-xs text-indigo-600 mt-1">Required role: {requiredRole}</div>}
      </div>
      <Badge
        className={`${
          enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        } hover:bg-green-100 border-0`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </Badge>
    </div>
  )
}
