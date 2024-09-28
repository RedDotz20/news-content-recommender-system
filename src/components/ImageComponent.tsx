'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps {
	src: string | null;
	alt: string;
	className?: string;
}

export const ImageComponent = ({
	src = '/placeholder.svg',
	alt,
	className,
}: ImageProps) => {
	const [imageSrc, setImageSrc] = useState(src);

	useEffect(() => {
		if (src) setImageSrc(src);
	}, [src]);

	const handleImageError = () => {
		console.warn('Image failed to load, using placeholder');
		setImageSrc('/placeholder.svg');
	};

	return (
		<Image
			placeholder="blur"
			blurDataURL="/placeholder.svg"
			src={imageSrc as string}
			quality={80}
			className={cn(
				'aspect-[3/2] lg:aspect-video object-cover rounded-t-lg transition-opacity duration-[2s] opacity-0',
				className
			)}
			data-loaded={imageSrc !== '/placeholder.svg'}
			alt={alt || 'Image Not Available'}
			sizes="(max-width: 600px) 100vw, (min-width: 601px) 50vw"
			style={{
				width: '100%',
				height: 'auto',
			}}
			width={500}
			height={300}
			onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
			onError={handleImageError}
		/>
	);
};
