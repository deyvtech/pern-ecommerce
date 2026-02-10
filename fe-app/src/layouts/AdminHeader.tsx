import AvatarWithBadge from "@/components/AvatarWithBadge";
import ToggleTheme from "@/components/ToggleTheme";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

import Notification from "@/components/Notification";
import { Separator } from "@/components/ui/separator";

const AdminHeader = () => {
	return (
		<header className="flex items-center justify-between pt-10 pr-10 mb-5">
			<div>
				<h3 className="text-4xl font-bold">Welcome back, Dave</h3>
				<p className="text-muted-foreground">
					Here's what's happening with your store today.
				</p>
			</div>

			{/* Profile */}
			<div className="flex items-center gap-4">
				<InputGroup className="py-4.5 max-w-80 w-80">
					<InputGroupInput placeholder="Search..." />
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
				<Notification />
				<ToggleTheme />
				<Separator orientation="vertical" />
				<AvatarWithBadge size="lg"/>
			</div>
		</header>
	);
};

export default AdminHeader;
