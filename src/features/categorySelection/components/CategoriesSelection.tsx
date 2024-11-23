'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/customui/DialogueBox';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
	LoadingSpinner,
	LoadingSpinnerWithText,
} from '@/components/customui/LoadingSpinner';
import { wordFormmater } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useState } from 'react';
import { mutateCategoryAction } from '../server/actions/mutateCatActions';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import {
	// useQuery,
	useQueryClient,
} from '@tanstack/react-query';
// import { useMutation } from '@tanstack/react-query';

export function CategoriesSelection() {
	const queryClient = useQueryClient();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const { data, isPending, error, isFetching, isLoading } =
		useFetchCategories();

	const {
		user: { id },
	} = useGetSessionData();

	const { execute, result, hasSucceeded, isExecuting } = useAction(
		mutateCategoryAction,
		{
			onSuccess: () => {
				console.log('newMutateCatActionss Successfully Executed');
			},
			onSettled: () => {
				// isPreferencesExists
				queryClient.invalidateQueries({ queryKey: ['isPreferencesExists'] });
			},
		}
	);

	if (result) {
		console.log(result?.data);
	}

	if (hasSucceeded) {
		console.log('newMutateCatActionss Successfully Executed');
	}

	if (error) return `An error has occurred: ${error.message}`;

	const preferences = {
		categories: selectedCategories.map((cat) => ({
			category: cat,
			frequency: 12, // add 12 freqency Value
		})),
	};

	// const { mutate } = useMutation({
	// 	mutationFn: () => mutateCatActions(userId, selectedCatArr),
	// 	onSuccess: () => {
	// 		console.log('User Preference Categories Successfully Updated');
	// 	},
	// });

	return (
		<div className="flex flex-col justify-center h-[calc(100vh-80px)] px-4">
			<div className="m-4 text-center">
				<h1>You Don't have any Preferences</h1>
				<p>please select your desired choices</p>
			</div>
			<Dialog onOpenChange={(open) => !open && setSelectedCategories([])}>
				<DialogTrigger asChild>
					<Button
						disabled={isLoading || isPending || isFetching}
						variant="outline"
					>
						{isLoading || isPending || isFetching ? (
							<LoadingSpinnerWithText className="h-4 w-4" />
						) : (
							'Select Categories'
						)}
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Choose Your Preferences</DialogTitle>
						<DialogDescription>
							Make a variety of selections of what do you want to see in your
							feed. Click save when you're done.
						</DialogDescription>
					</DialogHeader>

					<ToggleGroup
						type="multiple"
						value={selectedCategories}
						onValueChange={setSelectedCategories}
						className={`max-h-56 my-2 ${isLoading || isPending || isFetching ? 'justify-center overflow-y-hidden' : 'overflow-y-auto'}`}
					>
						{data &&
							'category' in data &&
							data.category.map((item: string) => {
								return (
									<ToggleGroupItem
										key={item}
										value={item}
										aria-label={item}
										className="flex gap-2 border"
									>
										<p>{wordFormmater(item)}</p>
										<Plus className="h-4 w-4" />
									</ToggleGroupItem>
								);
							})}
					</ToggleGroup>

					<DialogFooter>
						<Button
							disabled={isLoading || isPending || isFetching || isExecuting}
							onClick={() => execute({ userId: id, preferences })}
						>
							{isLoading || isPending || isFetching || isExecuting ? (
								<LoadingSpinner className="h-4 w-4" />
							) : (
								'Confirm'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
