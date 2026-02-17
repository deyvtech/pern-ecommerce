import OrdersTable from "@/components/Tables/OrdersTable";
import { allOrders } from "@/data";
import React from "react";

const Orders = () => {
	return (
		<>
			<div className="bg-slate-100 dark:bg-slate-800/20 p-10 rounded-lg max-w-360 mx-auto">
				<h1 className="text-2xl font-bold mb-4">All Orders</h1>
				<OrdersTable orders={allOrders} />
			</div>
		</>
	);
};

export default Orders;
