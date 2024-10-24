import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: Date) {
	const date = new Date(dateString);

	// Check if the input date is valid
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date provided');
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(date);

	return formattedDate;
}
