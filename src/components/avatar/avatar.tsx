"use client";

import type { HTMLAttributes } from "react";

type AvatarProps = HTMLAttributes<HTMLDivElement> &
	(
		| {
				image?: string | null;
				avatarCode: number;
				isLoggedUser?: false;
		  }
		| {
				isLoggedUser?: true;
				image?: never;
				avatarCode?: never;
		  }
	);

export const UserAvatar = ({
	image,
	avatarCode,
	isLoggedUser,
	...props
}: AvatarProps) => {
	return (
		<div
			{...props}
			className={cn(
				"relative aspect-square size-min min-h-10 min-w-10 shrink-0 overflow-hidden rounded bg-secondary",
				props.className,
			)}
		>
			{image ? (
				<Image layout="fullWidth" src={image} alt="profile" />
			) : (
				<UserProfileIcon
					className="size-full"
					avatarCode={avatarCode}
				/>
			)}
		</div>
	);
};

import { Image } from "@unpic/react";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

const faceFill = "#272727";

export const UserProfileIcon = ({
	avatarCode = 0, // 0 to 9
	...props
}: SVGProps<SVGSVGElement> & { avatarCode?: number }) => {
	const hueValue = Math.floor(avatarCode % 10) * 33;

	return (
		<svg
			{...props}
			width="220"
			height="220"
			viewBox="0 0 220 220"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ background: `hsl(${hueValue}, 80%, 70%)` }}
		>
			<title>User Profile</title>
			<g>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M182.16 108.659C182.16 136.852 166.103 161.295 142.635 173.341C139.249 175.079 137.863 179.367 139.947 182.552L164.451 220H53.053L77.9401 181.966C80.0002 178.817 78.6709 174.58 75.3511 172.809C52.4368 160.585 36.8418 136.444 36.8418 108.659C36.8418 68.5306 69.3724 36 109.501 36C149.63 36 182.16 68.5306 182.16 108.659Z"
					fill="white"
				/>
				<NormalSmile />
				{/* <SpecialSmile /> */}
			</g>
		</svg>
	);
};

const NormalSmile = () => {
	return (
		<>
			<path
				d="M129.053 126.446C131.226 125.247 133.96 126.037 135.159 128.21C136.358 130.383 135.568 133.118 133.395 134.317L109.501 147.5L85.607 134.317C83.4337 133.118 82.6437 130.383 83.8426 128.21C85.0417 126.037 87.7759 125.247 89.9492 126.446L109.501 137.232L129.053 126.446Z"
				fill={faceFill}
			/>
			<path
				d="M81.0365 107.909C76.0722 107.909 76 103.885 76 98.9204C76 93.956 76.0722 89.9316 81.0365 89.9316C86 89.9316 86 93.9546 86 98.9177V98.9204V98.9231C86 103.886 86 107.909 81.0365 107.909Z"
				fill={faceFill}
			/>
			<path
				d="M143 98.9204C143 103.885 142.93 107.909 137.965 107.909C133.001 107.909 133 103.885 133 98.9204C133 93.956 133.001 89.9316 137.965 89.9316C142.93 89.9316 143 93.956 143 98.9204Z"
				fill={faceFill}
			/>
		</>
	);
};
