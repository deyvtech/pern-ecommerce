import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function TablePagination({ currentPage, totalPage }: { currentPage: number; totalPage: number  }) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem className={`${currentPage === 1 ? "hidden" : ""}`}>
					<PaginationPrevious to={`?page=${currentPage - 1}`} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink to="?page=1">
            {currentPage === 1 ? <span className="sr-only">1</span> : currentPage - 1}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem >
					<PaginationLink isActive to={`?page=${currentPage}`}>
						{currentPage}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink to={`?page=${currentPage + 1}`}>
						{currentPage === totalPage ? <span className="sr-only">{totalPage}</span> : currentPage + 1}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem className={`${currentPage === totalPage ? "hidden" : currentPage <= 1  ? "hidden" : ""}`}>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem className={`${currentPage === totalPage ? "hidden" : ""}`}>
					<PaginationNext to={`?page=${currentPage + 1}`}/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
