"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  XCircleIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  HistoryIcon,
  FileIcon,
  FileSpreadsheetIcon,
  UploadIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Updated product categories and API providers
const categories = [
  { name: "Internet", providers: ["MTN", "Airtel", "Glo", "9Mobile"] },
  { name: "Gift Cards", providers: ["Amazon", "iTunes", "Google Play", "Steam"] },
  { name: "Airtime", providers: ["MTN", "Airtel", "Glo", "9Mobile"] },
  { name: "International Airtime", providers: ["Ding", "Reloadly", "TransferTo"] },
  { name: "eSIM", providers: ["Airalo", "Holafly", "Ubigi"] },
  { name: "Betting", providers: ["Bet9ja", "SportyBet", "1xBet", "BetKing"] },
  { name: "Electricity", providers: ["IKEDC", "EKEDC", "AEDC", "PHEDC", "KEDCO"] },
  { name: "Education", providers: ["WAEC", "JAMB", "NECO", "Cambridge"] },
  { name: "Tickets", providers: ["EventBrite", "TicketMaster", "Movie Tickets", "Event Tickets"] },
]

const apiProviders = ["Baxitech", "VTpass", "Jaan", "Datastation", "Vendify"]

// Sample product data - updated with new categories and API providers
const products = [
  {
    id: "PRD-78945",
    name: "Premium Internet Package",
    category: "Internet",
    provider: "Baxitech",
    price: 4999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 6225000,
    apiBalance: 950,
    description: "High-speed internet data bundle for all devices",
    discount: null,
  },
  {
    id: "PRD-65412",
    name: "Standard Cable TV Package",
    category: "Cable TV",
    provider: "VTpass",
    price: 2999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 2628000,
    apiBalance: 850,
    description: "Standard cable TV subscription package",
    discount: null,
  },
  {
    id: "PRD-32145",
    name: "Economy Electricity Plan",
    category: "Electricity",
    provider: "Jaan",
    price: 1999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 4268000,
    apiBalance: 999,
    description: "Prepaid electricity token for IKEDC customers",
    discount: {
      type: "percentage",
      value: 5,
      validUntil: "2023-12-31",
    },
  },
  {
    id: "PRD-98765",
    name: "Business Internet Package",
    category: "Internet",
    provider: "Datastation",
    price: 9999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 5430000,
    apiBalance: 780,
    description: "High-speed business internet package with priority support",
    discount: null,
  },
  {
    id: "PRD-45678",
    name: "Premium Gift Card",
    category: "Gift Cards",
    provider: "Vendify",
    price: 10000.0,
    stock: 250,
    status: "low_stock",
    image: "/placeholder.svg?height=40&width=40",
    sales: 7890000,
    apiBalance: 120,
    description: "Premium gift card for online shopping",
    discount: null,
  },
  {
    id: "PRD-23456",
    name: "Economy Airtime Recharge",
    category: "Airtime",
    provider: "MTN",
    price: 1000.0,
    stock: 50,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 321000,
    apiBalance: 50,
    description: "Standard airtime recharge for all networks",
    discount: {
      type: "fixed",
      value: 100,
      validUntil: "2023-11-30",
    },
  },
  {
    id: "PRD-87654",
    name: "Premium Cable TV Package",
    category: "Cable TV",
    provider: "GOTV",
    price: 5999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 3924000,
    apiBalance: 890,
    description: "Premium cable TV subscription with sports channels",
    discount: null,
  },
  {
    id: "PRD-34567",
    name: "Standard Gift Card",
    category: "Gift Cards",
    provider: "iTunes",
    price: 5000.0,
    stock: 0,
    status: "out_of_stock",
    image: "/placeholder.svg?height=40&width=40",
    sales: 2160000,
    apiBalance: 0,
    description: "Standard gift card for iTunes store",
    discount: null,
  },
  {
    id: "PRD-56789",
    name: "Business Electricity Plan",
    category: "Electricity",
    provider: "EKEDC",
    price: 14999.99,
    stock: 999,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 5175000,
    apiBalance: 950,
    description: "Business electricity plan for commercial use",
    discount: null,
  },
  {
    id: "PRD-67890",
    name: "International Airtime",
    category: "International Airtime",
    provider: "Ding",
    price: 4999.99,
    stock: 25,
    status: "low_stock",
    image: "/placeholder.svg?height=40&width=40",
    sales: 615000,
    apiBalance: 25,
    description: "International airtime recharge for global networks",
    discount: null,
  },
  {
    id: "PRD-12345",
    name: "Movie Ticket - Premium",
    category: "Tickets",
    provider: "Baxitech",
    price: 3500.0,
    stock: 150,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    sales: 1250000,
    apiBalance: 75,
    description: "Premium movie ticket for all cinema locations",
    discount: null,
  },
  {
    id: "PRD-54321",
    name: "Event Ticket - VIP",
    category: "Tickets",
    provider: "VTpass",
    price: 15000.0,
    stock: 50,
    status: "low_stock",
    image: "/placeholder.svg?height=40&width=40",
    sales: 3750000,
    apiBalance: 30,
    description: "VIP access to featured events",
    discount: null,
  },
]

// Sample transaction logs for products
const productTransactions = [
  {
    id: "TRX-001",
    productId: "PRD-78945",
    date: "2023-10-15",
    time: "14:32:45",
    user: "John Doe",
    amount: 4999.99,
    status: "successful",
  },
  {
    id: "TRX-002",
    productId: "PRD-78945",
    date: "2023-10-15",
    time: "15:10:22",
    user: "Jane Smith",
    amount: 4999.99,
    status: "successful",
  },
  {
    id: "TRX-003",
    productId: "PRD-78945",
    date: "2023-10-16",
    time: "09:45:11",
    user: "Robert Johnson",
    amount: 4999.99,
    status: "failed",
  },
  {
    id: "TRX-004",
    productId: "PRD-65412",
    date: "2023-10-16",
    time: "11:22:33",
    user: "Sarah Williams",
    amount: 2999.99,
    status: "successful",
  },
  {
    id: "TRX-005",
    productId: "PRD-65412",
    date: "2023-10-17",
    time: "13:15:40",
    user: "Michael Brown",
    amount: 2999.99,
    status: "successful",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [providerFilter, setProviderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isTransactionLogOpen, setIsTransactionLogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const itemsPerPage = 5

  // Get unique providers based on selected category
  const getProvidersForCategory = (category) => {
    if (category === "all") {
      return ["all", ...apiProviders]
    }
    return ["all", ...apiProviders]
  }

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesProvider = providerFilter === "all" || product.provider === providerFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && product.status === "active") ||
      (activeTab === "low_stock" && product.status === "low_stock") ||
      (activeTab === "out_of_stock" && product.status === "out_of_stock") ||
      (activeTab === "discounted" && product.discount !== null)

    return matchesSearch && matchesCategory && matchesProvider && matchesStatus && matchesTab
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate statistics
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.status === "low_stock").length
  const outOfStockProducts = products.filter((p) => p.status === "out_of_stock").length
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0)

  // Get transactions for a specific product
  const getProductTransactions = (productId) => {
    return productTransactions.filter((transaction) => transaction.productId === productId)
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Products Management</h1>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsExportDialogOpen(true)}>
                  <FileIcon className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsExportDialogOpen(true)}>
                  <FileSpreadsheetIcon className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="gap-2" onClick={() => setIsImportDialogOpen(true)}>
              <UploadIcon className="h-4 w-4" />
              Import
            </Button>

            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new product by filling out the form below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Product name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name.toLowerCase()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="provider" className="text-right">
                      API Provider
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {apiProviders.map((provider) => (
                          <SelectItem key={provider} value={provider.toLowerCase()}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price (₦)
                    </Label>
                    <Input id="price" type="number" placeholder="0.00" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" placeholder="Product description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input id="image" type="file" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch id="status" defaultChecked />
                      <Label htmlFor="status">Active</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddProductOpen(false)}>Create Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={totalProducts.toString()}
            change={3.25}
            trend="up"
            bgColor="bg-violet-50"
          />
          <StatsCard
            title="Active Products"
            value={activeProducts.toString()}
            change={2.5}
            trend="up"
            bgColor="bg-green-50"
          />
          <StatsCard
            title="Low/Out of Stock"
            value={(lowStockProducts + outOfStockProducts).toString()}
            change={1.75}
            trend="down"
            bgColor="bg-amber-50"
          />
          <StatsCard
            title="Total Revenue"
            value={`₦${(totalSales / 1000000).toFixed(2)}M`}
            change={4.8}
            trend="up"
            bgColor="bg-blue-50"
          />
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium dark:text-gray-100">All Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
                <TabsTrigger value="discounted">Discounted</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    setCategoryFilter(value)
                    setProviderFilter("all") // Reset provider filter when category changes
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={providerFilter} onValueChange={setProviderFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by API provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {apiProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                    <th className="pb-3 font-normal">Product</th>
                    <th className="pb-3 font-normal">ID</th>
                    <th className="pb-3 font-normal">Category</th>
                    <th className="pb-3 font-normal">Provider</th>
                    <th className="pb-3 font-normal">Price</th>
                    <th className="pb-3 font-normal">API Balance</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Revenue</th>
                    <th className="pb-3 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage src={product.image || "/placeholder.svg"} alt={product.name} />
                            <AvatarFallback className="rounded-md">
                              <PackageIcon className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium dark:text-gray-200">{product.name}</div>
                            {product.discount && (
                              <div className="text-xs text-green-600">
                                {product.discount.type === "percentage"
                                  ? `${product.discount.value}% off`
                                  : `₦${product.discount.value} off`}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-medium dark:text-gray-300">{product.id}</td>
                      <td className="py-4">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100"
                        >
                          {product.category}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm dark:text-gray-300">{product.provider}</td>
                      <td className="py-4 text-sm font-medium dark:text-gray-300">₦{product.price.toFixed(2)}</td>
                      <td className="py-4 text-sm dark:text-gray-300">{product.apiBalance}</td>
                      <td className="py-4">
                        <ProductStatusBadge status={product.status} />
                      </td>
                      <td className="py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="dark:text-gray-300">₦{(product.sales / 1000000).toFixed(2)}M</span>
                        </div>
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
                                setSelectedProduct(product)
                                // Open view details dialog
                              }}
                            >
                              <EyeIcon className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsEditProductOpen(true)
                              }}
                            >
                              <EditIcon className="h-4 w-4 mr-2" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsTransactionLogOpen(true)
                              }}
                            >
                              <HistoryIcon className="h-4 w-4 mr-2" />
                              Transaction Logs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {product.status === "active" ? (
                                <>
                                  <ToggleLeftIcon className="h-4 w-4 mr-2" />
                                  Disable Product
                                </>
                              ) : (
                                <>
                                  <ToggleRightIcon className="h-4 w-4 mr-2" />
                                  Enable Product
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete Product
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
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to the product details.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input id="edit-name" defaultValue={selectedProduct.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select defaultValue={selectedProduct.category}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-provider" className="text-right">
                  API Provider
                </Label>
                <Select defaultValue={selectedProduct.provider}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {apiProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price (₦)
                </Label>
                <Input id="edit-price" type="number" defaultValue={selectedProduct.price} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea id="edit-description" defaultValue={selectedProduct.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="edit-status" defaultChecked={selectedProduct.status === "active"} />
                  <Label htmlFor="edit-status">Active</Label>
                </div>
              </div>
              {selectedProduct.discount && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Discount</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      {selectedProduct.discount.type === "percentage"
                        ? `${selectedProduct.discount.value}% off`
                        : `₦${selectedProduct.discount.value} off`}
                    </Badge>
                    <span className="text-sm text-gray-500">Valid until {selectedProduct.discount.validUntil}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <XCircleIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditProductOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Logs Dialog */}
      <Dialog open={isTransactionLogOpen} onOpenChange={setIsTransactionLogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Transaction Logs</DialogTitle>
            <DialogDescription>
              {selectedProduct && `Viewing transactions for ${selectedProduct.name} (${selectedProduct.id})`}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  API Balance:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">{selectedProduct.apiBalance}</span>
                </div>
                <div className="flex items-center gap-2">
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
                      <th className="px-6 py-3">Transaction ID</th>
                      <th className="px-6 py-3">Date & Time</th>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {getProductTransactions(selectedProduct.id).map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date} {transaction.time}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ₦{transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              transaction.status === "successful"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {transaction.status === "successful" ? "Successful" : "Failed"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Products</DialogTitle>
            <DialogDescription>Upload a CSV or Excel file to import products.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
              <UploadIcon className="h-8 w-8 text-gray-400" />
              <div className="text-sm text-gray-500">Drag & drop or click to upload</div>
              <Input type="file" className="hidden" id="file-upload" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" size="sm">
                  Select File
                </Button>
              </Label>
              <div className="text-xs text-gray-500 mt-2">Supported formats: .csv, .xlsx</div>
            </div>
            <div className="text-sm text-gray-500">
              <p className="font-medium mb-1">Template Format:</p>
              <p>Your file should include the following columns: Name, Category, Provider, Price, Description</p>
              <Button variant="link" className="p-0 h-auto text-xs">
                Download Template
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsImportDialogOpen(false)}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Products</DialogTitle>
            <DialogDescription>Select the columns and format for export.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Export Format</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="csv"
                    name="exportFormat"
                    value="csv"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600"
                  />
                  <Label htmlFor="csv" className="text-sm font-normal">
                    CSV
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="excel"
                    name="exportFormat"
                    value="excel"
                    className="h-4 w-4 text-indigo-600"
                  />
                  <Label htmlFor="excel" className="text-sm font-normal">
                    Excel
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Select Columns</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-name" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-name" className="text-sm font-normal">
                    Name
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-id" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-id" className="text-sm font-normal">
                    ID
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-category" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-category" className="text-sm font-normal">
                    Category
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-provider" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-provider" className="text-sm font-normal">
                    Provider
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-price" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-price" className="text-sm font-normal">
                    Price
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-api-balance" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-api-balance" className="text-sm font-normal">
                    API Balance
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-status" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-status" className="text-sm font-normal">
                    Status
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-revenue" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-revenue" className="text-sm font-normal">
                    Revenue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="col-description" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="col-description" className="text-sm font-normal">
                    Description
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsExportDialogOpen(false)}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change, trend, bgColor }) {
  return (
    <Card className={`${bgColor} border-none dark:bg-opacity-10`}>
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

// Product Status Badge Component
function ProductStatusBadge({ status }) {
  if (status === "active") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit dark:bg-green-900 dark:text-green-200">
        <CheckCircleIcon className="h-3 w-3" />
        Active
      </Badge>
    )
  } else if (status === "low_stock") {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1 w-fit dark:bg-amber-900 dark:text-amber-200">
        <FilterIcon className="h-3 w-3" />
        Low Stock
      </Badge>
    )
  } else if (status === "out_of_stock") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1 w-fit dark:bg-red-900 dark:text-red-200">
        <XCircleIcon className="h-3 w-3" />
        Out of Stock
      </Badge>
    )
  }
  return null
}
