// import ui Components
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
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/TablePagination";
import { useSearchParams } from "react-router";

// import data, types, lib, and icons
import { products, productStatusColors } from "@/data";
import type { ProductStatusColorMap } from "@/types/ProductTypes";
import { PencilLine } from "lucide-react";

import { formatCurrency } from "@/lib/numeral";

export default function ProductsTable({
	setOpenDrawer,
}: {
	setOpenDrawer: (prev: (prev: boolean) => boolean) => void;
}) {
	const [searchParams] = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const itemsPerPage = 10;
	const totalPage = Math.ceil(products.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProducts = products.slice(startIndex, endIndex);
	return (
		<Table className="text-sm overflow-hidden">
			<TableCaption className="text-left">
				Showing {startIndex + 1} to{" "}
				{startIndex + currentProducts.length} of {products.length}{" "}
				products
			</TableCaption>
			<TableHeader>
				<TableRow className="hover:bg-slate-800/20">
					<TableHead className="w-20">ID</TableHead>
					<TableHead>Products</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currentProducts.map((product) => (
					<TableRow
						key={product.id}
						className="hover:bg-slate-800/20"
					>
						<TableCell className="font-medium py-4">
							#{product.id}
						</TableCell>
						<TableCell>{product.productName}</TableCell>
						<TableCell>{product.category}</TableCell>
						<TableCell>{formatCurrency(product.price)}</TableCell>
						<TableCell>{product.stock}</TableCell>
						<TableCell className="capitalize">
							<Badge
								className={`capitalize ${productStatusColors[product.status as keyof ProductStatusColorMap]}`}
							>
								{product.status}
							</Badge>
						</TableCell>
						<TableCell>
							<PencilLine
								className="cursor-pointer w-8 h-8 border p-2 rounded-full object-contain"
								onClick={() => setOpenDrawer((prev) => !prev)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			{products.length > itemsPerPage && (
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
