import { cn } from '@/lib/utils';

export const LoadingSpinner = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn('animate-spin', className)}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
};

export const LoadingSpinnerWithText = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<div className="flex gap-2 items-center justify-center">
			<LoadingSpinner className={cn('h-4 w-4', className)} />
			<p className="text-gray-400 select-none">Loading</p>
		</div>
	);
};
