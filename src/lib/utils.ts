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

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(date);
}

export function wordFormmater(word: string): string {
	if (typeof word !== 'string') {
		throw new Error('Invalid input: Input must be a string');
	}

	const capitalizeFirstLetter = (word: string): string => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	return word
		.split('_')
		.map((w) => {
			const containsAnd = w.toLowerCase() === 'and';
			return containsAnd ? w : capitalizeFirstLetter(w);
		})
		.join(' ');
}

export function filterAuthor(author: string) {
	if (typeof author !== 'string') {
		throw new Error('Invalid input: Input must be a string');
	}

	const authorName = author.replace(/,.*$/, '').trim();
	return authorName;
}
