import React from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ModalJobDescriptionProps = { jobTitle: string; JobDescription: string };

const ModalJobDescription = ({ jobTitle, JobDescription }: ModalJobDescriptionProps) => {
	return (
		<Dialog>
			<Button type="button" variant="default" className="bg-lime-600">
				<DialogTrigger className="p-2">Check Job Description</DialogTrigger>
			</Button>
			<DialogContent className="overflow-y-auto max-h-screen">
				<DialogHeader>
					<DialogTitle>{jobTitle}</DialogTitle>
					{JobDescription.length === 0 ? (
						<DialogDescription className="overflow-y-auto">
							<pre className="whitespace-pre-wrap text-left italic overflow-y-auto">
								No Job Description
							</pre>
						</DialogDescription>
					) : (
						<DialogDescription className="overflow-y-auto">
							<pre className="whitespace-pre-wrap text-left overflow-y-auto">{JobDescription}</pre>
						</DialogDescription>
					)}
				</DialogHeader>

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="default" className="bg-emerald-700">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalJobDescription;
