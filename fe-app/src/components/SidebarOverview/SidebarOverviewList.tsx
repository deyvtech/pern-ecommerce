import React from "react";
const SidebarOverviewList = ({ children }: {children: React.ReactNode}) => {
	return (
		<ul className="mb-10">
			{children}
		</ul>
	);
};

export default SidebarOverviewList;
