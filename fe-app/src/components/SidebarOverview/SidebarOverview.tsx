import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Link } from "react-router";

const SidebarOverview = ({
	children,
	title,
	link,
}: {
	children: React.ReactNode;
	title: string;
	link: string;
}) => {
	return (
		<div>
			<div className="flex justify-between">
				<h3 className="text-xl">{title}</h3>
				<Button variant="link" size="lg" className="ml-auto ">
					<Link to={link}>View All</Link>
				</Button>
			</div>
			<Separator className="mt-2" />
			{children}
		</div>
	);
};

export default SidebarOverview;
