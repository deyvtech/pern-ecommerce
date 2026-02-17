export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type ProductStatus = "in stock" | "out of stock" | "low stock";

// PRODUCTS
export interface Product {
	id: number;
	productName: string;
	category: string;
	price: number;
	stock: number;
	status: ProductStatus;
};
export type  ProductStatusColorMap = {
    [key in ProductStatus]: string
}

// ORDERS
export interface Order {
	orderId: number;
	customer: string;
	address: string;
	status: OrderStatus;
	orderDate: string;
	total: number;
}

export type OrderStatusColorMap = {
	[key in OrderStatus]: string;
};
