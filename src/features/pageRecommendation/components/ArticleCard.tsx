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
	className?: string;
	userId: string;
	isLiked: boolean;
}

export function ArticleCards({
	id: articleId,
	userId,
	className,
	headline,
	authors,
	short_description,
	date,
	link,
	category,
	isLiked,
}: ArticleCardProps) {
	const frequencyVal: number = 12;
	const { mutate } = useMutateInteraction(userId);

	return (
		<Card
			id={articleId}
			className={cn(
				'relative overflow-hidden max-w-[320px] flex flex-col',
				className
			)}
		>
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="flex-1"
			>
				<CardHeader className="space-y-0 p-4">
					<div className="flex items-center justify-between mb-4">
						<Badge className="select-none">{wordFormmater(category)}</Badge>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<span>{formatDate(date)}</span>
						</div>
					</div>
					<h3 className="text-xl font-bold">{headline}</h3>
					<span className="text-xs text-muted-foreground">
						<span>•</span> {filterAuthor(authors as string)}
					</span>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-sm text-muted-foreground">{short_description}</p>
				</CardContent>
			</a>

			<CardFooter className="flex items-center justify-between p-4">
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
