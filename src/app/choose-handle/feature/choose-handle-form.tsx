"use client";

import { useRouter } from "next/navigation";
import { debounce } from "radash";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "@/app/_components/ui/loader";
import { LoadingButton } from "@/components/feature/loading-button";
import { FailIcon, PassIcon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import api from "@/lib/eden";

type HandleForm = {
	handle: string;
};

const ALLOWED_CHARS = new Set(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
);

export function ChooseHandleForm() {
	const router = useRouter();
	const [serverError, setServerError] = useState<string | null>(null);
	const [isAvailable, setIsAvailable] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<HandleForm>({ mode: "onChange" });

	const verifyHandle = useCallback(
		debounce({ delay: 500 }, async (handle: string) => {
			setIsAvailable(false);
			setServerError(null);
			setIsVerifying(true);

			const { data, error } = await api.user.handle.verify.get({
				query: { handle },
			});

			if (error) {
				if (typeof error.value === "string")
					setServerError(error.value);
			}

			const { available = false } = data || {};
			setIsAvailable(available);
			setIsVerifying(false);
		}),
		[],
	);

	const onSubmit = async ({ handle }: HandleForm) => {
		setServerError(null);

		const { error } = await api.user.handle.patch({ handle });

		if (error) {
			if (typeof error.value === "string") setServerError(error.value);
			return;
		}

		router.push("/");
		router.refresh();
	};

	const isError = !!(errors.handle?.message ?? serverError);
	const isClientError = !!errors.handle?.message;
	const isGood = !isError && isAvailable;

	return (
		<div className="relative flex h-full min-h-dvh w-full flex-col items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-sm flex-col gap-3"
			>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="handle"
							className="font-serif text-2xl text-foreground italic"
						>
							Choose a Username
						</label>
						<p className="text-sm">
							You'll need a username to appear on the leaderboard.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between gap-3">
							<p className="truncate whitespace-pre text-rose-400 text-xs">
								{errors.handle?.message ?? serverError}{" "}
							</p>
							<p className="whitespace-nowrap text-xs underline">
								Sign out
							</p>
						</div>
						<div className="relative">
							<Input
								id="handle"
								className="h-12 pr-9 font-medium text-lg md:text-lg"
								autoComplete="off"
								autoFocus
								placeholder="your_username"
								aria-invalid={isError}
								{...register("handle", {
									required: "Handle is required.",
									minLength: {
										value: 3,
										message:
											"Must be at least 3 characters.",
									},
									maxLength: {
										value: 15,
										message:
											"Must be 15 characters or fewer.",
									},
									validate: (value) => {
										const invalid = [...value].find(
											(c) => !ALLOWED_CHARS.has(c),
										);
										if (invalid)
											return "Only letters, numbers, and underscores allowed.";
										return true;
									},
									onChange: (e) => {
										const value: string = e.target.value;
										setIsAvailable(false);
										if (isClientError) return;

										verifyHandle(value);
									},
								})}
							/>
							{isVerifying && (
								<Loader className="-translate-y-1/2 absolute top-1/2 right-3 size-5" />
							)}
							{!isVerifying &&
								(isGood ? (
									<PassIcon className="-translate-y-1/2 absolute top-1/2 right-3 size-5" />
								) : (
									<FailIcon className="-translate-y-1/2 absolute top-1/2 right-3 size-5" />
								))}
						</div>
					</div>
				</div>
				<LoadingButton
					type="submit"
					isLoading={isSubmitting}
					disabled={!isGood}
				>
					Continue
				</LoadingButton>
			</form>
		</div>
	);
}
