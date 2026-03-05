import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/schemas/userSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
const RegisterForm = () => {
	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			fullname: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof createUserSchema>) {
		console.log(data);
		form.reset();
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
			<FieldGroup>
				<Controller
					name="fullname"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>
								Full Name*
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="text"
								placeholder="Please enter your fullname"
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
			<FieldGroup className="mt-4">
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
								placeholder="Please enter your email address"
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
			<FieldGroup className="mt-4">
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
				Sign Up
			</Button>
		</form>
	);
};

export default RegisterForm;
