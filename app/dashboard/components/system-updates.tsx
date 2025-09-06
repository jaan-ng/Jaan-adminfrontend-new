"use client"

import { Bell, CheckCircle, Clock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// System updates data
const updates = [
  {
    id: 1,
    title: "System Maintenance Complete",
    description: "All systems are now operating at optimal performance levels.",
    type: "success",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New Feature: Enhanced Analytics",
    description: "We've added new visualization options to the analytics dashboard.",
    type: "info",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Security Update",
    description: "Important security patches have been applied to all systems.",
    type: "warning",
    time: "2 days ago",
  },
  {
    id: 4,
    title: "API Version 2.3 Released",
    description: "New endpoints and improved performance for all API services.",
    type: "info",
    time: "1 week ago",
  },
]

export function SystemUpdates() {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="pb-2 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-500" />
          System Updates & News
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {updates.map((update) => (
            <div key={update.id} className="p-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {update.type === "success" && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                  {update.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
                  {update.type === "warning" && <Bell className="h-5 w-5 text-amber-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800">{update.title}</h3>
                    <Badge
                      variant="outline"
                      className={`
                        ${update.type === "success" ? "border-emerald-200 text-emerald-700 bg-emerald-50" : ""}
                        ${update.type === "info" ? "border-blue-200 text-blue-700 bg-blue-50" : ""}
                        ${update.type === "warning" ? "border-amber-200 text-amber-700 bg-amber-50" : ""}
                      `}
                    >
                      {update.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {update.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
