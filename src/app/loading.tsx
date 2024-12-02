import { LoadingSpinner } from '@/components/customui/LoadingSpinner';

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-screen w-full">
			<LoadingSpinner />
		</div>
	);
}
