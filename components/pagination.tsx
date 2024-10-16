"use client";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export function Pagination({
	currentPage,
	maxPage,
	changePage,
}: {
	currentPage: number;
	maxPage: number;
	changePage: ActionCreatorWithPayload<number, "state/changePage">
}) {
  const dispatch = useDispatch();
	return (
		<div className="flex items-center space-x-2 mt-4">
			<Button
				variant="outline"
				className="hidden h-8 w-8 p-0 lg:flex"
				disabled={currentPage === 1}
				onClick={() => dispatch(changePage(1))}
			>
				<span className="sr-only">Go to first page</span>
				<DoubleArrowLeftIcon className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				className="h-8 w-8 p-0"
				disabled={currentPage === 1}
				onClick={() => dispatch(changePage(currentPage - 1))}
			>
				<span className="sr-only">Go to previous page</span>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>
			<Button variant="outline" className="h-8 w-8 p-0">
				<span className="sr-only">Current Page</span>
				<span>{currentPage}</span>
			</Button>
			<Button
				variant="outline"
				className="h-8 w-8 p-0"
				disabled={currentPage === maxPage}
				onClick={() => dispatch(changePage(currentPage + 1))}
			>
				<span className="sr-only">Go to next page</span>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>
			<Button
				disabled={currentPage === maxPage}
				variant="outline"
				className="hidden h-8 w-8 p-0 lg:flex"
				onClick={() => dispatch(changePage(maxPage))}
			>
				<span className="sr-only">Go to last page</span>
				<DoubleArrowRightIcon className="h-4 w-4" />
			</Button>
		</div>
	);
}
