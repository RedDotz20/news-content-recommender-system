'use client';

import { Articles as ArticlesType } from '@prisma/client';
import { ArrowDown, ArrowUp, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { wordFormmater, cn } from '@/lib/utils';
import { filterAuthor } from '../../../lib/utils';

interface ArticleCardProps extends ArticlesType {
	className?: string;
}

export function ArticleCards({
	id,
	className,
	headline,
	authors,
	short_description,
	date,
	link,
	category,
}: ArticleCardProps) {
	// TODO: implement optimistic updates w/ up/down votes (POST REQ)
	const handleLike = async () => {};

	return (
		<Card
			id={id}
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
				>
					<ArrowUp className="h-4 w-4" />
					<span className="sr-only">Upvote</span>
					<span className="text-sm font-medium">15</span>
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
