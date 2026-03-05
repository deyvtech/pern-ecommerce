import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const LoginForm = () => {
	return (
		<form action="" className="w-full">
			<Input
				type="email"
				id="email_address"
				name="email_address"
				placeholder="Email Address*"
				className="h-12 md:text-sm"
				required
			/>
			<Input
				type="password"
				id="password"
				name="password"
				placeholder="Password*"
				className="mt-4 h-12 md:text-sm"
				required
			/>
			<Button
				type="submit"
				size="lg"
				className="w-full text-sm p-6 mt-4 cursor-pointer"
			>
				Sign In
			</Button>
		</form>
	);
};

export default LoginForm;
