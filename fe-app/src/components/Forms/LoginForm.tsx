import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginUserSchema } from "@/schemas/userSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(data: z.infer<typeof loginUserSchema>) {
		console.log(data);
		form.reset();
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="w-full"
		>
			<FieldGroup>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Email Address*</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="text"
								placeholder="Please enter your email"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								className="h-12 md:text-sm"
							/>
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
							<FieldLabel htmlFor={field.name}>Password*</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="password"
								placeholder="Please enter your password"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								className="h-12 md:text-sm"
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button
				size="lg"
				className="w-full text-sm p-6 mt-4 cursor-pointer"
			>
				Sign In
			</Button>
		</form>
	);
};

export default LoginForm;
