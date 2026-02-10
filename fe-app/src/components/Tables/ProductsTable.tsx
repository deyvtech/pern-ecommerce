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
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import TablePagination from "../TablePagination";

// import data, types, lib, and icons
import { products, productStatusColors } from "@/data";
import type { ProductStatusColorMap  } from "@/types/ProductTypes";
import { MoreHorizontalIcon } from "lucide-react";

import { formatCurrency } from "@/lib/numeral";
import { useSearchParams } from "react-router";

export default function ProductsTable() {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 10;
    const totalPage = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
	return (
		<Table className="text-sm">
            <TableCaption className="text-left">
                    Showing {startIndex + 1} to {startIndex + currentProducts.length} of {products.length} products
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
						<TableCell className="font-medium">
							{product.id}
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
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="size-8"
									>
										<MoreHorizontalIcon />
										<span className="sr-only">
											Open menu
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="p-2"
								>
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem>
										Duplicate
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem variant="destructive">
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
            <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={7} className="px-4 py-2">
                        <TablePagination  currentPage={currentPage} totalPage={totalPage} />
                    </TableCell>
                </TableRow>
            </TableFooter>
		</Table>
	);
}
