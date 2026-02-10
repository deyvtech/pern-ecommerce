import ProductsTable from "../components/Tables/ProductsTable";
const Products = () => {
	return (
		<>
			<div className="bg-slate-100 dark:bg-slate-800/20 p-10 rounded-lg max-w-360 mx-auto">
				<h1 className="text-2xl font-bold mb-4">All Products</h1>
				<ProductsTable />
			</div>
		</>
	);
};

export default Products;
