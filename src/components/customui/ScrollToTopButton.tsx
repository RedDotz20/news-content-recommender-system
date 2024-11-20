'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled down 300px
			setIsVisible(window.scrollY > 300);
		};

		// Add scroll event listener
		window.addEventListener('scroll', toggleVisibility);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (isVisible) {
		return (
			<Button
				className={`fixed bottom-10 right-10 p-2 rounded-full shadow-lg transition-opacity duration-300 z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
				style={{ opacity: isVisible ? 1 : 0 }}
				onClick={scrollToTop}
				aria-label="Scroll to top"
			>
				<ArrowUp className="h-6 w-6" />
			</Button>
		);
	}
};
