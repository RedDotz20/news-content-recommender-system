import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JSX, SVGProps } from 'react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';
import { formatDate } from '@/lib/utils';
// import { ImageComponent } from './ImageComponent';

interface ArticleCardProps {
	// id: string;
	className?: string;
	image: string;
	title: string;
	// description: string;
	time: Date;
	category: string;
}

export function ArticleCard({
	// id,
	className,
	image,
	title,
	// description,
	time,
	category = 'latest',
}: ArticleCardProps) {
	return (
		<Card
			className={cn(
				'flex flex-col sm:flex-row lg:flex-col w-full lg:min-w-[300px] lg:max-w-80 lg:h-[420px]',
				className
			)}
		>
			<div className="p-4 pb-0 w-full sm:w-[35%] lg:w-full h-full relative">
				{/* <ImageComponent
					src={image}
					alt={title}
				/> */}
				<Image
					// placeholder="blur"
					// blurDataURL="/placeholder.svg"
					// src={image ? image : '/placeholder.svg'}
					src="https://www.fccnn.com/incoming/7254122-yledlj-102621.S.STP.WOLVESREP.JPG/alternates/BASE_LANDSCAPE/102621.S.STP.WOLVESREP.jpg"
					alt={title}
					sizes="100vw"
					style={{
						width: '100%',
						height: 'auto',
					}}
					width={500}
					height={300}
					className="aspect-[3/2] lg:aspect-video object-cover rounded-t-lg transition-all duration-[2s] "
				/>
			</div>
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
						{title}
					</h3>
					<time
						suppressHydrationWarning
						className="text-xs ml-auto px-2 py-1"
					>
						{formatDate(time)}
					</time>
				</div>
				<CardFooter className="flex items-center justify-between border-t pt-4">
					<div className="flex items-center gap-2">
						<ToolTipWrapper content="like">
							<div
								role="button"
								className="inline-flex items-center space-x-2 cursor-pointer hover:text-red-500"
							>
								<HeartIcon className="w-5 h-5" />
								<span className="text-xs">123</span>
								<span className="sr-only">Like</span>
							</div>
						</ToolTipWrapper>
						<ToolTipWrapper content="comments">
							<div
								role="button"
								className="inline-flex items-center space-x-2 cursor-pointer hover:text-cyan-500"
							>
								<MessageCircleIcon className="w-5 h-5" />
								<span className="text-xs">45</span>
								<span className="sr-only">Comments</span>
							</div>
						</ToolTipWrapper>
					</div>
					<Button
						variant="ghost"
						size="icon"
					>
						<BookmarkIcon className="w-5 h-5" />
						<span className="sr-only">Bookmark</span>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	);
}

function ToolTipWrapper({
	content,
	children,
}: {
	content: string;
	children: JSX.Element;
}) {
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
}

function BookmarkIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
		</svg>
	);
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
		</svg>
	);
}

function MessageCircleIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</svg>
	);
}
