import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatCurrency } from "@/lib/numeral";
interface SidebarOverviewListItemProps {
	image?: string;
	fallbackName: string;
	name: string;
	subtitle: string;
	amount: number;
}

const SidebarOverviewListItem = ({
	image = "https://github.com/shadcn.png",
	fallbackName,
	name,
	subtitle,
	amount,
}: SidebarOverviewListItemProps) => {
	return (
		<li className="flex justify-between items-center gap-4 py-2">
			<div className="flex items-center gap-4">
				<Avatar>
					<AvatarImage src={image} alt={fallbackName} />
					<AvatarFallback>{fallbackName}</AvatarFallback>
				</Avatar>
				<div>
					<p>{name}</p>
					<p className="text-sm text-muted-foreground">{subtitle}</p>
				</div>
			</div>
			<div>
				<p>{formatCurrency(amount)}</p>
			</div>
		</li>
	);
};

export default SidebarOverviewListItem;
