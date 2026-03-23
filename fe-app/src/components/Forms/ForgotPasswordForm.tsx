import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "../ui/field";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { forgotPasswordSchema } from "@/schemas/userSchema";
import axios, { isAxiosError } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ForgotPasswordForm = () => {
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof forgotPasswordSchema>) => {
			const response = await axios.post("/auth/forgot-password", data);
			return response.data;
		},
		onMutate: () => {
			toast.loading("Sending reset instructions...");
		},
		onSuccess: (response: { message: string; success: boolean }) => {
			toast.dismiss();
			toast.success(response.message);
			form.reset();
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

	async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
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
							<FieldLabel>
								Email Address
								<span className="text-red-700">*</span>
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="email"
								placeholder="e.g., john.doe@example.com"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								className="h-12 md:text-sm"
							/>
							<FieldDescription>
								Enter the email associated with your account,
								and we'll send you instructions to reset your
								password.
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
				{mutation.isPending
					? "Sending reset instructions..."
					: "Send Reset Instructions"}
			</Button>
		</form>
	);
};

export default ForgotPasswordForm;
