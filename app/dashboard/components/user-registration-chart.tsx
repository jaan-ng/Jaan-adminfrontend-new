"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for user registrations
const weeklyData = [
  { date: "Mon", registrations: 12 },
  { date: "Tue", registrations: 19 },
  { date: "Wed", registrations: 15 },
  { date: "Thu", registrations: 22 },
  { date: "Fri", registrations: 30 },
  { date: "Sat", registrations: 18 },
  { date: "Sun", registrations: 14 },
]

const monthlyData = [
  { date: "Week 1", registrations: 85 },
  { date: "Week 2", registrations: 102 },
  { date: "Week 3", registrations: 91 },
  { date: "Week 4", registrations: 120 },
]

const yearlyData = [
  { date: "Jan", registrations: 320 },
  { date: "Feb", registrations: 280 },
  { date: "Mar", registrations: 305 },
  { date: "Apr", registrations: 350 },
  { date: "May", registrations: 410 },
  { date: "Jun", registrations: 380 },
  { date: "Jul", registrations: 420 },
  { date: "Aug", registrations: 390 },
  { date: "Sep", registrations: 405 },
  { date: "Oct", registrations: 440 },
  { date: "Nov", registrations: 480 },
  { date: "Dec", registrations: 520 },
]

export function UserRegistrationChart() {
  const [timeRange, setTimeRange] = useState("weekly")

  // Select data based on time range
  const chartData = timeRange === "weekly" ? weeklyData : timeRange === "monthly" ? monthlyData : yearlyData

  return (
    <Card className="border shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-gray-800">User Registration History</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px] h-8 text-sm">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
              <Tooltip
                formatter={(value) => [`${value} Users`, "Registrations"]}
                labelFormatter={(label) => `Date: ${label}`}
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
                barSize={timeRange === "yearly" ? 20 : 30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
