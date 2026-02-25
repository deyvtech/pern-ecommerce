import { getUserById } from "../model/getUserById.js";
export const isUserActive = async (userId: string | null | undefined) => {
    if(!userId) {
        return false;
    }
	const user = await getUserById(userId);
	if (!user || !user.is_active) {
		return false;
	}
	return true;
};
