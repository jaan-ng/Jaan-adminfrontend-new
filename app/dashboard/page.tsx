"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  RefreshCcwIcon,
  BarChart3Icon,
  CreditCardIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar } from "./components/sidebar"
// import { EditIcon } from 'lucide-react' // Import EditIcon

// Import the EnhancedChart component
import { TransactionVolumeChart } from "./components/transaction-volume-chart"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200 bg-transparent">
              <RefreshCcwIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1 text-gray-600 border-gray-200 bg-transparent">
                  <span>Last 24 Hours</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 24 Hours</DropdownMenuItem>
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatsCard title="Total Transactions" value="6,452" change={5.39} trend="up" icon={<TransactionIcon />} />
          <StatsCard title="User Counts" value="42,502" change={0.65} trend="down" icon={<UsersIcon />} />
          <StatsCard title="Total Revenue" value="$56,201" change={2.29} trend="up" icon={<RevenueIcon />} />
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-gray-500">API Balances</div>
                  <div className="text-2xl font-bold mt-2 mb-1 text-gray-800">₦5,275</div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Baxitech:</span>
                      <span className="font-medium">₦2,150</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Vtpass:</span>
                      <span className="font-medium">₦1,825</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Vendify:</span>
                      <span className="font-medium">₦1,300</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-gray-50">{<ApiIcon />}</div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100/80 to-transparent rounded-tl-full -mb-8 -mr-8 opacity-70"></div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-5">
          {/* Transaction Volume Chart */}
          <TransactionVolumeChart />

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="font-medium">New Users Today</div>
                </div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-gray-500 mt-1">+12% from yesterday</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-50">
                    <CreditCardIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="font-medium">Successful Transactions</div>
                </div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-sm text-gray-500 mt-1">+5% from yesterday</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <BarChart3Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="font-medium">Conversion Rate</div>
                </div>
                <div className="text-2xl font-bold">3.2%</div>
                <div className="text-sm text-gray-500 mt-1">+0.5% from last week</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
            <CardHeader className="pb-2 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-gray-800">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                      <th className="py-3 px-6 font-medium">Username</th>
                      <th className="py-3 px-6 font-medium">Services</th>
                      <th className="py-3 px-6 font-medium">Amount</th>
                      <th className="py-3 px-6 font-medium">Details</th>
                      <th className="py-3 px-6 font-medium">Status</th>
                      <th className="py-3 px-6 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6">Shafogrin</td>
                      <td className="py-3 px-6 text-gray-600">02/08/2023</td>
                      <td className="py-3 px-6 font-medium">₦473.18</td>
                      <td className="py-3 px-6 text-gray-600">10 GB</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">Completed</Badge>
                      </td>
                      <td className="py-3 px-6 text-gray-500">07:42 PM</td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6">Snow</td>
                      <td className="py-3 px-6 text-gray-600">01/09/2023</td>
                      <td className="py-3 px-6 font-medium">₦565.86</td>
                      <td className="py-3 px-6 text-gray-600">20 GB</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">Completed</Badge>
                      </td>
                      <td className="py-3 px-6 text-gray-500">10:54 PM</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6">DMX</td>
                      <td className="py-3 px-6 text-gray-600">15/12/2023</td>
                      <td className="py-3 px-6 font-medium">₦322.23</td>
                      <td className="py-3 px-6 text-gray-600">10 GB</td>
                      <td className="py-3 px-6">
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">Completed</Badge>
                      </td>
                      <td className="py-3 px-6 text-gray-500">05:23 PM</td>
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

// Update the StatsCard to use Naira for Total Revenue
function StatsCard({ title, value, change, trend, icon }) {
  // Format the value to use Naira symbol if it's the Total Revenue card
  const formattedValue = title === "Total Revenue" || title === "API Balances" ? value.replace("$", "₦") : value

  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2 mb-1 text-gray-800">{formattedValue}</div>
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
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100/80 to-transparent rounded-tl-full -mb-8 -mr-8 opacity-70"></div>
      </CardContent>
    </Card>
  )
}

// Icon Components
function TransactionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 7L12 13L6 7" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 17L12 11L6 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RevenueIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1V23" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ApiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="#F59E0B" />
    </svg>
  )
}
