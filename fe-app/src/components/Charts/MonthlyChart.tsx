"use client";
import { CartesianGrid, Line, LineChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	type ChartConfig,
} from "@/components/ui/chart";

export const description = "A line chart";

const chartData = [
	{ day: "1", customers: 15 },
	{ day: "2", customers: 12 },
	{ day: "3", customers: 60 },
	{ day: "4", customers: 100 },
	{ day: "5", customers: 300 },
	{ day: "6", customers: 700 },
	{ day: "7", customers: 1000 },
	
];

const chartConfig = {
	customers: {
		label: "Customers",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export default function MonthlyChart({total, subtitle, percentage, color}: {total: string, subtitle: string, percentage: string, color: string}) {
	return (
		<Card className={`p-4 flex-1 ring-0 ${color}`}>
			<CardHeader>
				<CardTitle className="text-6xl font-semibold">{total}</CardTitle>
				<CardDescription className="text-sm">{subtitle}</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-between items-center gap-4">
                <div className="mr-4">
                    <p className="text-2xl font-semibold">{percentage}</p>
                    <p className="text-muted-foreground text-sm">Since last month</p>
                </div>
				<ChartContainer config={chartConfig} className="flex-1 max-h-30 max-w-30">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
                        title="Total Customers"
					>
						<CartesianGrid vertical={false} horizontal={false} />
						<Line
							dataKey="customers"
							type="monotone"
							stroke="var(--color-customers)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
