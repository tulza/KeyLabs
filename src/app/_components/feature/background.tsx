import { Image } from "@unpic/react";
export const Background = () => {
	return (
		<>
			<Image
				className="-z-10 pointer-events-none absolute top-0 left-0 size-[150%] object-cover object-bottom"
				src="show.png"
				layout="fullWidth"
				height={800}
			/>
		</>
	);
};
