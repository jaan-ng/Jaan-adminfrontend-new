"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3Icon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  EditIcon,
  EyeIcon,
  HeadphonesIcon,
  LayoutDashboardIcon,
  LockIcon,
  MoonIcon,
  PackageIcon,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon,
  LogOutIcon,
  GamepadIcon,
  TicketIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DialogTrigger } from "@/components/ui/dialog"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

// Add the TransactionItem component to the sidebar.tsx file
function TransactionItem({ name, avatar, time }) {
  // Randomly generate user data for demonstration
  const isAdmin = Math.random() > 0.8 // 20% chance of being admin
  const userBalance = (Math.random() * 1000).toFixed(2)
  const jTokenBalance = Math.floor(Math.random() * 500)
  const username = name.toLowerCase().replace(" ", "_")
  const [isEditingBalance, setIsEditingBalance] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newBalance, setNewBalance] = useState(userBalance)
  const [newPassword, setNewPassword] = useState("••••••••")
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  // Generate random transaction history
  const transactionHistory = Array.from({ length: 10 }, (_, i) => {
    const types = ["Internet", "Airtime", "Cable TV", "Electricity", "Gift Card"]
    const statuses = ["completed", "pending", "failed"]
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const randomAmount = (Math.random() * 500 + 50).toFixed(2)

    // Generate a random date within the last 30 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    return {
      id: `TRX-${Math.floor(Math.random() * 100000)}`,
      type: randomType,
      amount: randomAmount,
      status: randomStatus,
      date: date.toLocaleDateString(),
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
      details:
        randomType === "Internet"
          ? `${Math.floor(Math.random() * 10) + 1} GB`
          : randomType === "Airtime"
            ? `${Math.floor(Math.random() * 5000) + 100} Naira`
            : randomType === "Cable TV"
              ? "Monthly Subscription"
              : randomType === "Electricity"
                ? `${Math.floor(Math.random() * 200) + 50} Units`
                : "Standard Card",
    }
  })

  const handleBalanceUpdate = () => {
    // Here you would typically update the balance in your backend
    console.log("Updating balance to:", newBalance)
    setIsEditingBalance(false)
  }

  const handlePasswordUpdate = () => {
    // Here you would typically update the password in your backend
    console.log("Updating password to:", newPassword)
    setIsEditingPassword(false)
  }

  return (
    <div className="p-3 rounded-lg hover:bg-gray-50/80 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 border border-gray-100">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-gray-100 text-gray-600">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">@{username}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-gray-600 border-gray-200">
                <EyeIcon className="h-3.5 w-3.5" />
                <span className="text-xs">History</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] mt-4 rounded-md border">
                <div className="p-4">
                  {transactionHistory.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`p-3 ${index !== transactionHistory.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{transaction.type}</div>
                          <div className="text-xs text-gray-500">{transaction.details}</div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {transaction.date}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {transaction.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-medium">₦{transaction.amount}</div>
                          <Badge
                            className={`mt-1 ${transaction.status === "completed" ? "bg-emerald-50 text-emerald-700" : transaction.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"} hover:bg-opacity-75 border-0`}
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">ID: {transaction.id}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Badge className={isAdmin ? "bg-indigo-50 text-indigo-700 border-0" : "bg-gray-50 text-gray-600 border-0"}>
            {isAdmin ? "Admin" : "User"}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div className="bg-gray-50 rounded p-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Balance</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => setIsEditingBalance(!isEditingBalance)}
            >
              <EditIcon className="h-3 w-3 text-gray-400" />
            </Button>
          </div>
          {isEditingBalance ? (
            <div className="flex items-center mt-1">
              <span className="mr-1">₦</span>
              <Input value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="h-6 text-xs p-1" />
              <Button size="sm" className="h-6 ml-1 text-xs" onClick={handleBalanceUpdate}>
                Save
              </Button>
            </div>
          ) : (
            <div className="font-medium text-gray-800">₦{userBalance}</div>
          )}
        </div>
        <div className="bg-gray-50 rounded p-2">
          <span className="text-gray-500">JTokens</span>
          <div className="font-medium text-gray-800">{jTokenBalance}</div>
        </div>
      </div>
      <div className="mt-2 bg-gray-50 rounded p-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Password</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => setIsEditingPassword(!isEditingPassword)}
          >
            <EditIcon className="h-3 w-3 text-gray-400" />
          </Button>
        </div>
        {isEditingPassword ? (
          <div className="flex items-center mt-1">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-6 text-xs p-1"
            />
            <Button size="sm" className="h-6 ml-1 text-xs" onClick={handlePasswordUpdate}>
              Save
            </Button>
          </div>
        ) : (
          <div className="font-medium text-gray-800">••••••••</div>
        )}
      </div>
    </div>
  )
}

// Modify the Sidebar component to include the user management section
export function Sidebar() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("dashboard")
  const [showUserManagement, setShowUserManagement] = useState(false)

  // Add this state to track expanded menus (after the other useState declarations)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  // Add this function after the useEffect hook to toggle menu expansion
  const toggleMenu = (menu: string) => {
    if (expandedMenus.includes(menu)) {
      setExpandedMenus(expandedMenus.filter((m) => m !== menu))
    } else {
      setExpandedMenus([...expandedMenus, menu])
    }
  }

  // Update active item based on pathname
  useEffect(() => {
    if (pathname.includes("/dashboard/transactions")) {
      setActiveItem("transactions")
    } else if (pathname.includes("/dashboard/users")) {
      setActiveItem("users")
    } else if (pathname.includes("/dashboard/products")) {
      setActiveItem("products")
    } else if (pathname.includes("/dashboard/marketing")) {
      setActiveItem("marketing")
    } else if (pathname.includes("/dashboard/insights")) {
      setActiveItem("insights")
    } else if (pathname.includes("/dashboard/security")) {
      setActiveItem("security")
    } else if (pathname.includes("/dashboard/support")) {
      setActiveItem("support")
    } else if (pathname.includes("/dashboard/settings")) {
      setActiveItem("settings")
    } else if (pathname.includes("/dashboard/ticketing")) {
      setActiveItem("ticketing")
      // Automatically expand the ticketing menu when on a ticketing page
      if (!expandedMenus.includes("ticketing")) {
        setExpandedMenus([...expandedMenus, "ticketing"])
      }
    } else if (pathname.includes("/dashboard/games")) {
      setActiveItem("games")
    } else if (pathname === "/dashboard") {
      setActiveItem("dashboard")
    }
  }, [pathname, expandedMenus])

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen">
        {/* Logo and Admin Info */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                <circle cx="16.5" cy="7.5" r=".5" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-800">Jaan Admin</div>
              <div className="text-xs text-gray-500">Enterprise Dashboard</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-9 bg-gray-50 border-gray-200 h-9" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 pl-3">Main</div>
          <ul className="space-y-1 mb-6">
            <li>
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "dashboard"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/transactions"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "transactions"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <CreditCardIcon className="h-5 w-5" />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/users"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "users"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <UsersIcon className="h-5 w-5" />
                <span>User Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/products"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "products"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <PackageIcon className="h-5 w-5" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/ticketing"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "ticketing"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <TicketIcon className="h-5 w-5" />
                <span>Ticketing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/games"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "games"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <GamepadIcon className="h-5 w-5" />
                <span>Games</span>
                <span className="ml-auto bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </li>
          </ul>

          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 pl-3">Analytics</div>
          <ul className="space-y-1 mb-6">
            <li>
              <Link
                href="/dashboard/marketing"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "marketing"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <BarChart3Icon className="h-5 w-5" />
                <span>Marketing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/insights"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "insights"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <PieChartIcon className="h-5 w-5" />
                <span>Insights</span>
                <span className="ml-auto bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  6
                </span>
              </Link>
            </li>
          </ul>

          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 pl-3">Settings</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/security"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "security"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <LockIcon className="h-5 w-5" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/support"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "support"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <HeadphonesIcon className="h-5 w-5" />
                <span>Support</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeItem === "settings"
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-gray-200">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sedi Raheem" />
                <AvatarFallback className="bg-indigo-50 text-indigo-600">SR</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-700 text-sm">Sedi Raheem</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Logout"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Panel */}
      {showUserManagement && (
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto h-screen fixed right-0 top-0 shadow-lg z-20">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">User Management</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowUserManagement(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 70px)" }}>
            <div className="space-y-4">
              <TransactionItem name="Kathryn Murphy" avatar="/placeholder.svg?height=40&width=40" time="2h ago" />
              <TransactionItem name="James Harrid" avatar="/placeholder.svg?height=40&width=40" time="5h ago" />
              <TransactionItem name="Elon Melon" avatar="/placeholder.svg?height=40&width=40" time="1d ago" />
              <TransactionItem name="Mia Smith" avatar="/placeholder.svg?height=40&width=40" time="2d ago" />
              <TransactionItem name="James Doe" avatar="/placeholder.svg?height=40&width=40" time="3d ago" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-8 w-8"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Button>
  )
}
