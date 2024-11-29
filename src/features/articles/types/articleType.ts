import { Articles } from '@prisma/client';

type UserInteraction = {
	id: string;
	isLiked: boolean;
};

export type getArticlesType = Articles & {
	userInteractions?: UserInteraction[];
	isLiked: boolean;
};
