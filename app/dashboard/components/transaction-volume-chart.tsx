"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedChart } from "./enhanced-chart"

// Sample data for transaction volume chart
const transactionVolumeData = [
  { time: "00:00", volume: 120 },
  { time: "02:00", volume: 150 },
  { time: "04:00", volume: 130 },
  { time: "06:00", volume: 180 },
  { time: "08:00", volume: 270 },
  { time: "10:00", volume: 320 },
  { time: "12:00", volume: 350 },
  { time: "14:00", volume: 330 },
  { time: "16:00", volume: 300 },
  { time: "18:00", volume: 280 },
  { time: "20:00", volume: 240 },
  { time: "22:00", volume: 190 },
]

export function TransactionVolumeChart() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[350px]">
          <EnhancedChart
            data={transactionVolumeData}
            type="line"
            dataKey="volume"
            name="Volume"
            color="#6366f1"
            tooltipFormatter={(value) => [`${value} Transactions`, "Volume"]}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  )
}
