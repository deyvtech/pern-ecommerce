import React from "react";
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react";
const Notification = () => {
	return (
		<Button size="icon-lg" variant="outline" className="cursor-pointer">
			<Bell />
		</Button>
	);
};

export default Notification;
