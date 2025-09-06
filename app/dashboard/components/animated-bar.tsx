"use client"

import { useEffect, useState } from "react"
import { Bar } from "recharts"

interface AnimatedBarProps {
  dataKey: string
  fill: string
  stackId?: string
  radius?: number[]
  animationDuration?: number
}

export function AnimatedBar({
  dataKey,
  fill,
  stackId,
  radius = [0, 0, 0, 0],
  animationDuration = 1000,
}: AnimatedBarProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Bar
      dataKey={dataKey}
      stackId={stackId}
      fill={fill}
      radius={radius}
      animationDuration={animationDuration}
      animationBegin={animated ? 0 : animationDuration}
    />
  )
}
