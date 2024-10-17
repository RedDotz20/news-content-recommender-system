import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/DialogueBox';
import { Button } from '@/components/ui/button';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
export function CategoriesSelection() {
	return (
		<div>
			<div className="m-4 text-center">
				<h1>You Don't have any Preferences</h1>
				<p>please select your desired choices</p>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Select Categories</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Choose Your Preferences</DialogTitle>
						<DialogDescription>
							Make a variety of selections of what do you want to see in your
							feed. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<ToggleGroup type="multiple">
						<ToggleGroupItem
							value="bold"
							aria-label="Toggle bold"
						>
							<p>b</p>
							{/* <Bold className="h-4 w-4" /> */}
						</ToggleGroupItem>
						<ToggleGroupItem
							value="italic"
							aria-label="Toggle italic"
						>
							<p>b</p>
							{/* <Italic className="h-4 w-4" /> */}
						</ToggleGroupItem>
						<ToggleGroupItem
							value="underline"
							aria-label="Toggle underline"
						>
							<p>b</p>
							{/* <Underline className="h-4 w-4" /> */}
						</ToggleGroupItem>
					</ToggleGroup>

					{/* <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="name"
            className="text-right"
          >
            Name
          </Label>
          <Input
            id="name"
            defaultValue="Pedro Duarte"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="username"
            className="text-right"
          >
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
          />
        </div>
      </div> */}
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
