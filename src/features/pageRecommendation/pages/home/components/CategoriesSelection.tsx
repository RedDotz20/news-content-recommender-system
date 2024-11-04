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
import { LoadingSpinner } from '@/components/customui/LoadingSpinner';
import { wordFormmater } from '@/lib/utils';
import { Plus } from 'lucide-react';

import { useFetchCategories } from '../hooks/useFetchCategories';
import { useState } from 'react';

export function CategoriesSelection() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const { isPending, error, isFetching, isLoading } = useFetchCategories();

	if (error) return 'An error has occurred: ' + error.message;

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
							<div className="flex gap-2 items-center justify-center">
								<LoadingSpinner className="h-4 w-4" />
								<p className="text-gray-400 select-none">Loading</p>
							</div>
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

					<SelectionToggleGroup
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
					/>

					<DialogFooter>
						<Button
							disabled={isLoading || isPending || isFetching}
							type="submit"
						>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

const SelectionToggleGroup = ({
	selectedCategories,
	setSelectedCategories,
}: {
	selectedCategories: string[];
	setSelectedCategories: (value: string[]) => void;
}) => {
	const { data, isPending, isFetching, isLoading } = useFetchCategories();

	if (data) {
		return (
			<ToggleGroup
				type="multiple"
				value={selectedCategories} // Bind selected value
				onValueChange={setSelectedCategories} // Update on change
				className={`max-h-56 my-2 ${isLoading || isPending || isFetching ? 'justify-center overflow-y-hidden' : 'overflow-y-auto'}`}
			>
				{data.category.map((item) => {
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
		);
	}

	return null;
};
