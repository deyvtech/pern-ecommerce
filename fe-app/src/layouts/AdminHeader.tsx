import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import { ToggleTheme } from "@/components/ToggleTheme";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

const AdminHeader = () => {
	return (
		<header className="flex items-center justify-between p-4 mb-5">
			<h3 className="text-4xl font-bold w-1/2">Welcome back, Dave</h3>
			{/* Search */}
			<div className="w-1/4">
				<InputGroup className="py-4">
					<InputGroupInput placeholder="Search..."/>
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
			</div>
			{/* Profile */}
			<div className="flex items-center gap-4 w-1/4 justify-end">
				<ToggleTheme />
				<AvatarWithBadge />
			</div>
		</header>
	);
};

export default AdminHeader;
