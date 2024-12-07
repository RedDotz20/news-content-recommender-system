'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/customui/DialogueBox';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LoadingSpinnerWithText } from '@/components/customui/LoadingSpinner';
import { wordFormmater } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useMutateCatActions } from '../hooks/useMutateCatActions';

export function CategoriesSelection() {
  const {
    user: { id }
  } = useGetSessionData();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categoriesData, isPending, error, isFetching, isLoading } = useFetchCategories();

  const {
    mutate,
    data: mutateData,
    isPending: mutatePending,
    isSuccess: mutateSuccess,
    error: mutateError
  } = useMutateCatActions(id);

  const loading = isPending || isFetching || isLoading || mutatePending;

  if (error || mutateError) {
    if (error) return `categories error occurred: ${error.message}`;
    if (mutateError) return `mutation error occurred: ${mutateError.message}`;
  }

  if (mutateSuccess) {
    console.log('newMutateCatActionss Successfully Executed');
  }

  if (mutateData) {
    console.log(mutateData?.data);
  }

  const preferences = {
    categories: selectedCategories.map((cat) => ({
      category: cat,
      frequency: 12 // add 12 freqency Value
    }))
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col justify-center px-4">
      <div className="m-4 text-center">
        <h1>You Don't have any Preferences</h1>
        <p>please select your desired choices</p>
      </div>
      <Dialog onOpenChange={(open) => !open && setSelectedCategories([])}>
        <DialogTrigger asChild>
          <Button disabled={loading} variant="outline">
            {loading ? <LoadingSpinnerWithText className="h-4 w-4" /> : 'Select Categories'}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose Your Preferences</DialogTitle>
            <DialogDescription>
              <p>
                Make a variety of selections of what do you want to see in your feed. Click save
                when you're done.
                <span className="mt-1 block font-bold italic text-yellow-500 opacity-80">
                  *Please Select at least 3 Categories*
                </span>
              </p>
            </DialogDescription>
          </DialogHeader>

          <ToggleGroup
            type="multiple"
            value={selectedCategories}
            onValueChange={setSelectedCategories}
            className={`my-2 max-h-56 ${loading ? 'justify-center overflow-y-hidden' : 'overflow-y-auto'}`}
          >
            {categoriesData &&
              'category' in categoriesData &&
              categoriesData.category.map((item: string) => {
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
              disabled={loading || selectedCategories.length < 3}
              onClick={() => mutate({ userId: id, preferences })}
            >
              {loading ? <LoadingSpinnerWithText className="h-4 w-4" /> : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
