'use client';

import { Articles as ArticlesType } from '@prisma/client';
import { Bookmark, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { cn, formatDate, wordFormmater, filterAuthor } from '@/lib/utils';
import { useMutateInteraction } from '../hooks/useMutateInteraction';

interface ArticleCardProps extends ArticlesType {
	userId: string;
	isLiked: boolean;
	className?: string;
	children?: React.ReactNode;
}

export function ArticleCards(props: ArticleCardProps) {
	return (
		<Card
			id={props.id}
			className={cn(
				'relative overflow-hidden max-w-[320px] flex flex-col',
				props.className
			)}
		>
			<ClickInteraction {...props}>
				<CardHeader className="space-y-0 p-4">
					<div className="flex items-center justify-between mb-4">
						<Badge className="select-none">
							{wordFormmater(props.category)}
						</Badge>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<span>{formatDate(props.date)}</span>
						</div>
					</div>
					<h3 className="text-xl font-bold">{props.headline}</h3>
					<span className="text-xs text-muted-foreground">
						<span>•</span> {filterAuthor(props.authors as string)}
					</span>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-sm text-muted-foreground">
						{props.short_description}
					</p>
				</CardContent>
			</ClickInteraction>

			<CardFooter className="flex items-center justify-between p-4">
				<LikeInteraction {...props} />
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
				>
					<Bookmark className="h-4 w-4" />
					<span className="sr-only">Bookmark</span>
				</Button>
			</CardFooter>
		</Card>
	);
}

const ClickInteraction = (props: ArticleCardProps) => {
	const { userId, id: articleId, isLiked, category } = props,
		{ mutate } = useMutateInteraction(userId),
		frequencyVal: number = 2;

	return (
		<a
			href={props.link}
			target="_blank"
			rel="noopener noreferrer"
			className="flex-1"
			onClick={(e) => {
				mutate({ isLiked, articleId, category, frequencyVal });
			}}
		>
			{props.children}
		</a>
	);
};

const LikeInteraction = (props: ArticleCardProps) => {
	const { userId, id: articleId, isLiked, category } = props,
		{ mutate } = useMutateInteraction(userId),
		frequencyVal: number = 12;

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-8 w-8"
			onClick={() => mutate({ isLiked, articleId, category, frequencyVal })}
		>
			<Heart
				className={`h-4 w-4 ${isLiked && 'fill-red-500 stroke-red-500'}`}
			/>
			<span className="sr-only">Like</span>
		</Button>
	);
};
