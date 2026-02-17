import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/TablePagination";
import { useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";

// import data, types, lib, and icons
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/numeral";
import type { Order, OrderStatusColorMap } from "@/types/ProductTypes";
import { orderStatusColors } from "@/data";

export default function OrdersTable({ orders }: { orders: Order[] }) {
	const [searchParams] = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const itemsPerPage = 10;
	const totalPage = Math.ceil(orders.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentOrders = orders.slice(startIndex, endIndex);

	return (
		<Table className="text-sm overflow-hidden">
			<TableCaption>
				Showing {startIndex + 1} to {startIndex + currentOrders.length}{" "}
				of {orders.length} orders
			</TableCaption>
			<TableHeader>
				<TableRow className="hover:bg-slate-800/20">
					<TableHead className="w-20">ID</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Order Date</TableHead>
					<TableHead>Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currentOrders.map((order) => {
					return (
						<TableRow
							key={order.orderId}
							className="hover:bg-slate-800/20 text-sm"
						>
							<TableCell className="font-medium py-4">
								#{order.orderId}
							</TableCell>
							<TableCell>{order.customer}</TableCell>
							<TableCell>{order.address}</TableCell>
							<TableCell>
								<Badge
									className={`capitalize ${orderStatusColors[order.status as keyof OrderStatusColorMap]}`}
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
			{orders.length > itemsPerPage && (
				<TableFooter className="bg-transparent">
					<TableRow className="hover:bg-transparent">
						<TableCell colSpan={7} className="px-4 py-2">
							<TablePagination
								currentPage={currentPage}
								totalPage={totalPage}
							/>
						</TableCell>
					</TableRow>
				</TableFooter>
			)}
		</Table>
	);
}
