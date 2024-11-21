import { Articles as ArticlesType } from '@prisma/client';

export interface ArticleCardProps extends ArticlesType {
	interactionId?: string;
	userId: string;
	isLiked: boolean;
	className?: string;
	children?: React.ReactNode;
}
