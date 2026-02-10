"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
  { month: "January", totalRevenue: 186, totalOrders: 80 },
  { month: "February", totalRevenue: 305, totalOrders: 200 },
  { month: "March", totalRevenue: 237, totalOrders: 120 },
  { month: "April", totalRevenue: 73, totalOrders: 190 },
  { month: "May", totalRevenue: 209, totalOrders: 130 },
  { month: "June", totalRevenue: 214, totalOrders: 140 },
  { month: "July", totalRevenue: 400, totalOrders: 184 },
  { month: "August", totalRevenue: 756, totalOrders: 343 },
  { month: "September", totalRevenue: 345, totalOrders: 156 },
  { month: "October", totalRevenue: 500, totalOrders: 256 },
  { month: "November", totalRevenue: 534, totalOrders: 258 },
  { month: "December", totalRevenue: 1560, totalOrders: 546 },
]

const chartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "var(--primary)",
  },
  totalOrders: {
    label: "Total Orders",
    color: "#ff0000",
  },
} satisfies ChartConfig

export default function TotalEarningsChart() {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800/20 ring-0">
      <CardHeader>
        <CardTitle className="text-2xl">Total Earnings and Orders</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line"/>} />
            <Line
              dataKey="totalRevenue"
              type="monotone"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="totalOrders"
              type="monotone"
              stroke="#ff0000"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Earnings up by 5.2% this year <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total earnings for the last 12 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}


