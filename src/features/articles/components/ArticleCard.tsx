'use client';

import { useCallback, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { cn, formatDate, wordFormmater, filterAuthor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArticleCardProps } from '../types/articleCardType';
import {
	ClickInteractLink,
	LikeInteractButton,
	// BookmarkInteractButton,
} from '@/features/userInteractions/components/UserInteraction';

export const ArticleCards = (props: ArticleCardProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const updateOverlayPosition = useCallback(
		({ x, y }: { x: number; y: number }) => {
			if (!overlayRef.current) return;

			const { width, height } = overlayRef.current.getBoundingClientRect();
			const xOffset = x - width / 2;
			const yOffset = y - height / 2;

			overlayRef.current.style.setProperty('--x', `${xOffset}px`);
			overlayRef.current.style.setProperty('--y', `${yOffset}px`);
		},
		[]
	);

	useMousePosition(
		containerRef as React.RefObject<HTMLElement>,
		updateOverlayPosition
	);

	return (
		<Card
			ref={containerRef}
			id={props.id}
			className={cn(
				'group relative overflow-hidden min-w-[320px] flex flex-col rounded-md border border-border shadow-lg',
				props.className
			)}
		>
			{/* Card Content */}
			<ClickInteractLink {...props}>
				<CardHeader className="space-y-0 p-4">
					<div className="flex items-center justify-between mb-4">
						<Badge className="select-none">
							{wordFormmater(props.category)}
						</Badge>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<span>{formatDate(props.date)}</span>
						</div>
					</div>
					<h3 className="text-xl font-bold line-clamp-2 md:line-clamp-3 md:min-h-[5.3rem]">
						{props.headline}
					</h3>
					<span className="text-xs text-muted-foreground line-clamp-1">
						<span>•</span> {filterAuthor(props.authors as string)}
					</span>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<span className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-4">
						{props.short_description}
					</span>
				</CardContent>
			</ClickInteractLink>

			<CardFooter className="flex items-center justify-between p-4">
				<LikeInteractButton {...props} />
				{/* <BookmarkInteractButton {...props} /> */}
			</CardFooter>

			{/* Shiny overlay */}
			<div
				ref={overlayRef}
				className="absolute -z-1 h-64 w-64 rounded-full bg-primary opacity-0 bg-blend-soft-light blur-3xl transition-opacity group-hover:opacity-10 pointer-events-none"
				style={{
					transform: 'translate(var(--x), var(--y))',
				}}
			/>
		</Card>
	);
};
