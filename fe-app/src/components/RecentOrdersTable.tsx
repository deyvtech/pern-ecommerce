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
import { Badge } from "./ui/badge";

interface ORDER {
	orderId: number;
	customer: string;
	address: string;
	status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
	orderDate: string;
	total: number;
}

const orders = [
	{
		orderId: 1,
		customer: "Marcus Aurelius",
		address: "123 Rome Ave, Italy",
		status: "Delivered",
		orderDate: "2026-02-01",
		total: 245.50,
	},
	{
		orderId: 2,
		customer: "Serena Williams",
		address: "456 Court St, Florida, USA",
		status: "Shipped",
		orderDate: "2026-02-03",
		total: 89.99,
	},
	{
		orderId: 3,
		customer: "David Gandy",
		address: "10 Savile Row, London, UK",
		status: "Pending",
		orderDate: "2026-02-05",
		total: 1200.00,
	},
	{
		orderId: 4,
		customer: "Emma Watson",
		address: "22 Oxford St, London, UK",
		status: "Processing",
		orderDate: "2026-02-07",
		total: 350.25,
	},
	{
		orderId: 5,
		customer: "Hideo Kojima",
		address: "7-1 Ginza, Tokyo, Japan",
		status: "Delivered",
		orderDate: "2026-02-08",
		total: 512.00,
	},
	{
		orderId: 6,
		customer: "Anya Taylor-Joy",
		address: "99 Hollywood Blvd, CA, USA",
		status: "Pending",
		orderDate: "2026-02-09",
		total: 125.00,
	},
	{
		orderId: 7,
		customer: "Virgil Abloh",
		address: "50 Off-White Way, Paris, FR",
		status: "Cancelled",
		orderDate: "2026-02-09",
		total: 2100.00,
	},
	{
		orderId: 8,
		customer: "Lewis Hamilton",
		address: "44 Speed Lane, Monaco",
		status: "Processing",
		orderDate: "2026-02-10",
		total: 450.00,
	},
	{
		orderId: 9,
		customer: "Zendaya Coleman",
		address: "14 Euphoria Dr, CA, USA",
		status: "Delivered",
		orderDate: "2026-02-10",
		total: 890.75,
	},
	{
		orderId: 10,
		customer: "Timothée Chalamet",
		address: "88 Dune Rd, NY, USA",
		status: "Pending",
		orderDate: "2026-02-10",
		total: 120.40,
	},
];

const statusColors: Record<ORDER["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/70 dark:text-yellow-300",
    Processing: "bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300",
    Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300",
    Delivered: "bg-green-100 text-green-700 dark:bg-green-950/70 dark:text-green-300",
    Cancelled: "bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300",
};

export default function RecentOrdersTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-slate-800/20 text-lg">
					<TableHead className="w-30">Order ID</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Order Date</TableHead>
					<TableHead>Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
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
							<Badge className={statusColors[order.status]}>
								{order.status}
							</Badge>
						</TableCell>
						<TableCell>{formatDate(order.orderDate)}</TableCell>
						<TableCell>{formatCurrency(order.total)}</TableCell>
					</TableRow>
				))}
			</TableBody>
			{/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
		</Table>
	);
}
