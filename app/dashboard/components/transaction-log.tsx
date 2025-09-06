"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, DownloadIcon } from "lucide-react"

// Sample transaction log data
const transactionLogs = [
  {
    id: "TXN-001",
    timestamp: "2024-01-15 14:30:25",
    adminId: "ADM-001",
    adminName: "Sedi Raheem",
    userId: "USR-78945",
    userName: "Kathryn Murphy",
    type: "credit",
    amount: 5000.0,
    currency: "NGN",
    description: "Manual credit adjustment - Customer complaint resolution",
    previousBalance: 20000.5,
    newBalance: 25000.5,
    status: "completed",
  },
  {
    id: "TXN-002",
    timestamp: "2024-01-15 13:15:10",
    adminId: "ADM-002",
    adminName: "Sarah Connor",
    userId: "USR-65412",
    userName: "James Harrid",
    type: "debit",
    amount: 1500.0,
    currency: "NGN",
    description: "Manual debit - Fraudulent transaction reversal",
    previousBalance: 14000.75,
    newBalance: 12500.75,
    status: "completed",
  },
  {
    id: "TXN-003",
    timestamp: "2024-01-15 11:45:33",
    adminId: "ADM-001",
    adminName: "Sedi Raheem",
    userId: "USR-98765",
    userName: "Mia Smith",
    type: "credit-jtoken",
    amount: 100,
    currency: "JTOKEN",
    description: "JToken bonus for loyalty program",
    previousBalance: 680,
    newBalance: 780,
    status: "completed",
  },
]

export function TransactionLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")

  const filteredLogs = transactionLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || log.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium dark:text-gray-100">Manual Transaction Log</CardTitle>
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit-jtoken">Credit JTokens</SelectItem>
                <SelectItem value="debit-jtoken">Debit JTokens</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Transaction Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b dark:border-gray-700">
                <th className="pb-3 font-normal">Transaction ID</th>
                <th className="pb-3 font-normal">Timestamp</th>
                <th className="pb-3 font-normal">Admin</th>
                <th className="pb-3 font-normal">User</th>
                <th className="pb-3 font-normal">Type</th>
                <th className="pb-3 font-normal">Amount</th>
                <th className="pb-3 font-normal">Description</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="py-4 text-sm font-mono dark:text-gray-300">{log.id}</td>
                  <td className="py-4 text-sm dark:text-gray-300">{log.timestamp}</td>
                  <td className="py-4 text-sm dark:text-gray-300">{log.adminName}</td>
                  <td className="py-4 text-sm dark:text-gray-300">{log.userName}</td>
                  <td className="py-4">
                    <TransactionTypeBadge type={log.type} />
                  </td>
                  <td className="py-4 text-sm font-medium dark:text-gray-300">
                    <span className={log.type.includes("credit") ? "text-green-600" : "text-red-600"}>
                      {log.type.includes("credit") ? "+" : "-"}
                      {log.currency === "JTOKEN" ? "" : "₦"}
                      {log.amount.toLocaleString(undefined, {
                        minimumFractionDigits: log.currency === "JTOKEN" ? 0 : 2,
                        maximumFractionDigits: log.currency === "JTOKEN" ? 0 : 2,
                      })}
                      {log.currency === "JTOKEN" ? " JTokens" : ""}
                    </span>
                  </td>
                  <td className="py-4 text-sm dark:text-gray-300 max-w-[200px] truncate" title={log.description}>
                    {log.description}
                  </td>
                  <td className="py-4">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TransactionTypeBadge({ type }) {
  const typeConfig = {
    credit: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200", label: "Credit" },
    debit: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200", label: "Debit" },
    "credit-jtoken": {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-800 dark:text-blue-200",
      label: "Credit JTokens",
    },
    "debit-jtoken": {
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-800 dark:text-orange-200",
      label: "Debit JTokens",
    },
  }

  const config = typeConfig[type] || typeConfig.credit

  return <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>{config.label}</Badge>
}
