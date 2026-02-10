import MonthlyChart from "@/components/Charts/MonthlyChart";
import TotalEarningsChart from "@/components/Charts/TotalEarningsChart";
import SidebarOverview from "@/components/SidebarOverview/SidebarOverview";
import SidebarOverviewList from "@/components/SidebarOverview/SidebarOverviewList";
import SidebarOverviewListItem from "@/components/SidebarOverview/SidebarOverviewListItem";
import RecentOrdersTable from "@/components/Tables/RecentOrdersTable";

import nikeAirMaxUrl  from "@/assets/nike-air-max.webp";
import channelHoodieUrl from "@/assets/channel-hoodie.webp";

const Dashboard = () => {
	return (
		<>
			<div className="flex gap-10">
				<div className="w-3/4">
					<div className="flex gap-4">
						<MonthlyChart
							total="307.48K"
							subtitle="Total Revenue"
							percentage="+10%"
							color="bg-sky-800/10"
						/>
						<MonthlyChart
							total="150.25K"
							subtitle="Total Orders"
							percentage="+30%"
							color="bg-emerald-800/10"
						/>
						<MonthlyChart
							total="75.48K"
							subtitle="Total Customers"
							percentage="+15%"
							color="bg-purple-800/10"
						/>
					</div>
					<div className="mt-10">
						<TotalEarningsChart />
					</div>
					<div className="mt-10">
						<h3 className="text-2xl font-medium mb-4">
							Recent Orders
						</h3>
						<RecentOrdersTable />
					</div>
				</div>
				<div className="w-1/4 px-10 py-5 bg-slate-100 dark:bg-slate-800/20 rounded-lg">
					{/* CUSTOMERS */}
					<SidebarOverview
						title="Top Customers"
						link="/admin/customers"
					>
						<SidebarOverviewList>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/300
"
								fallbackName="JD"
								subtitle="31 purchases"
								amount={37500}
								name="John Doe"
							/>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/301"
								fallbackName="DLS"
								subtitle="22 purchases"
								amount={35500}
								name="Dave Lexter Supsup"
							/>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/303"
								fallbackName="ADM"
								subtitle="10 purchases"
								amount={32500}
								name="Aisa Del Mando"
							/>
						</SidebarOverviewList>
					</SidebarOverview>
					<SidebarOverview title="Top Products" link="/admin/orders">
						<SidebarOverviewList>
							<SidebarOverviewListItem
								image={nikeAirMaxUrl}
								fallbackName="NA"
								subtitle="Shoes"
								amount={37500}
								name="Nike Air Max 2024"
							/>
							<SidebarOverviewListItem
								image={channelHoodieUrl}
								fallbackName="CH"
								subtitle="Hoodie"
								amount={35500}
								name="Channel Hoodie"
							/>
						</SidebarOverviewList>
					</SidebarOverview>
					<SidebarOverview
						title="Top Categories"
						link="/admin/orders"
					>
						<SidebarOverviewList>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/306"
								fallbackName="MS"
								subtitle="20 items sold"
								amount={14}
								name="Menswear"
							/>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/307"
								fallbackName="WS"
								subtitle="10 items sold"
								amount={5.5}
								name="Womenswear"
							/>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/308"
								fallbackName="AC"
								subtitle="8 items sold"
								amount={3}
								name="Accessories"
							/>
							<SidebarOverviewListItem
								image="https://i.pravatar.cc/309"
								fallbackName="FW"
								subtitle="5 items sold"
								amount={5.5}
								name="Footwear"
							/>
						</SidebarOverviewList>
					</SidebarOverview>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
