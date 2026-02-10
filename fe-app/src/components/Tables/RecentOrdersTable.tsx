import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/numeral";
import { Badge } from "../ui/badge";
import type { OrderStatusColorMap } from "@/types/ProductTypes";

import { recentOrders, OrderStatusColors } from "@/data";

export default function RecentOrdersTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-slate-800/20 text-lg">
					<TableHead className="w-20">ID</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Order Date</TableHead>
					<TableHead>Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{recentOrders.map((order) => {
					return (
						<TableRow
							key={order.orderId}
							className="hover:bg-slate-800/20 text-sm"
						>
							<TableCell className="font-medium">
								#{order.orderId}
							</TableCell>
							<TableCell>{order.customer}</TableCell>
							<TableCell>{order.address}</TableCell>
							<TableCell>
								<Badge
									className={`capitalize ${OrderStatusColors[order.status as keyof OrderStatusColorMap]}`}
								>
									{order.status}
								</Badge>
							</TableCell>
							<TableCell>{formatDate(order.orderDate)}</TableCell>
							<TableCell>{formatCurrency(order.total)}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
