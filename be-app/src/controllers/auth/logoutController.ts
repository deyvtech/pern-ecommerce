export const logoutController = (req: any, res: any) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
}
