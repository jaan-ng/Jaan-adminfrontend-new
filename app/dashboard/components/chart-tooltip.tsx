import { Card, CardContent } from "@/components/ui/card"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload) return null

  return (
    <Card className="border shadow-md">
      <CardContent className="p-3">
        <p className="font-medium text-sm mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">
                {entry.name}: ${entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
