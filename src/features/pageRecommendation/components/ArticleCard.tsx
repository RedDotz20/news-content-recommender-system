'use client';

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
	BookmarkInteractButton,
} from './UserInteraction';

export const ArticleCards = (props: ArticleCardProps) => {
	return (
		<Card
			id={props.id}
			className={cn(
				'relative overflow-hidden max-w-[320px] flex flex-col',
				props.className
			)}
		>
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
					<h3 className="text-xl font-bold">{props.headline}</h3>
					<span className="text-xs text-muted-foreground">
						<span>•</span> {filterAuthor(props.authors as string)}
					</span>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<span className="text-sm text-muted-foreground">
						{props.short_description}
					</span>
				</CardContent>
			</ClickInteractLink>

			<CardFooter className="flex items-center justify-between p-4">
				<LikeInteractButton {...props} />
				<BookmarkInteractButton {...props} />
			</CardFooter>
		</Card>
	);
};
