/* eslint-disable no-unused-vars */

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';
import { cn, formatDate } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';

import {
	ThickArrowUpIcon,
	ThickArrowDownIcon,
	BookmarkFilledIcon,
} from '@radix-ui/react-icons';

interface ArticleCardProps {
	id: string;
	className?: string;
	headline: string;
	authors: string;
	short_description: string;
	date: Date;
	category: string;
}

export function ArticleCard({
	id,
	className,
	headline,
	authors,
	short_description,
	date,
	category,
}: ArticleCardProps) {
	return (
		<Card
			className={cn(
				'flex flex-col sm:flex-row lg:flex-col w-full lg:min-w-[300px] lg:max-w-80 lg:h-[420px]',
				className
			)}
		>
			{/* <div className="p-4 pb-0 w-full sm:w-[35%] lg:w-full h-full relative">
			</div> */}
			<CardContent className="w-full sm:w-[65%] lg:w-full px-4 pb-4 pt-0 space-y-2 h-full flex flex-col justify-between">
				<div className="flex flex-col justify-around h-full">
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Badge
							key={category}
							variant="secondary"
						>
							{category}
						</Badge>
					</div>
					<h3 className="text-xl font-bold mb-1 line-clamp-2 lg:line-clamp-3 cursor-pointer">
						{headline}
					</h3>
					<time
						suppressHydrationWarning
						className="text-xs ml-auto px-2 py-1"
					>
						{formatDate(date)}
					</time>
				</div>
				<CardFooter className="flex items-center justify-between border-t pt-4">
					<div className="flex items-center gap-2">
						<ToolTipWrapper content="Upvote">
							<div
								role="button"
								className="inline-flex items-center space-x-2 cursor-pointer hover:text-red-500"
							>
								<ThickArrowUpIcon className="w-5 h-5" />
								<span className="text-xs">123</span>
								<span className="sr-only">Upvote</span>
							</div>
						</ToolTipWrapper>
						<ToolTipWrapper content="Downvote">
							<div
								role="button"
								className="inline-flex items-center space-x-2 cursor-pointer hover:text-cyan-500"
							>
								<ThickArrowDownIcon className="w-5 h-5" />
								<span className="text-xs">45</span>
								<span className="sr-only">Downvote</span>
							</div>
						</ToolTipWrapper>
					</div>
					<Button
						variant="ghost"
						size="icon"
					>
						<BookmarkFilledIcon className="w-5 h-5" />
						<span className="sr-only">Bookmark</span>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	);
}

const ToolTipWrapper = ({
	content,
	children,
}: {
	content: string;
	children: React.ReactNode;
}) => {
	return (
		<TooltipProvider
			delayDuration={800}
			skipDelayDuration={500}
		>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
