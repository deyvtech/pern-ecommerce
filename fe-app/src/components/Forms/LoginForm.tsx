import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginUserSchema } from "@/schemas/userSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

import axios from "@/api/axios";
import { isAxiosError } from "@/api/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { type AuthStateType } from "@/contexts/AuthProvider";
interface ResponseAuthType extends AuthStateType {
	message: string;
	success: boolean;
}

const LoginForm = () => {
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	// React Hook Form
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// React Query / useMutation
	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof loginUserSchema>) => {
			const response = await axios.post("/auth/login", data);
			return response.data;
		},
		onMutate: () => {
			toast.loading("Logging in...");
		},
		onSuccess: (response: ResponseAuthType) => {
			toast.dismiss();
			toast.success(response.message);
			const token = response.token;
			const user = response.user;
			setAuth({ token, user });
			form.reset();
			if (user.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/me");
			}
		},
		onError: (error) => {
			toast.dismiss();
			if (isAxiosError<{ message: string }>(error)) {
				const errorObj = error.response?.data;
				toast.error(errorObj?.message);
			} else {
				toast.error("Something went wrong");
			}
		},
	});

	// HandleSubmit
	async function onSubmit(data: z.infer<typeof loginUserSchema>) {
		mutation.mutate(data);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
			<FieldGroup>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>
								Email Address*
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="text"
								placeholder="e.g., john.doe@example.com"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								className="h-12 md:text-sm"
							/>
							<FieldDescription>
								We'll never share your email with anyone else.
							</FieldDescription>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>
			<FieldGroup className="mt-6">
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>
								Password*
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="password"
								placeholder="Please enter your password"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								className="h-12 md:text-sm"
							/>
							<FieldDescription>
								Your password must be at least 6 characters
								long.
							</FieldDescription>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button
				size="lg"
				className={`w-full text-sm p-6 mt-4 cursor-pointer ${mutation.isPending ? "cursor-not-allowed opacity-50" : ""}`}
			>
				{mutation.isPending ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
};

export default LoginForm;
