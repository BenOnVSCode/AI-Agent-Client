"use client";

import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Edit, Search } from "lucide-react";
import Navbar from "@/components/navbar";
import AdminPageWrapper from "../AdminPageWrapper";
import { useGetStatusesQuery } from "../store/services/statuses";

interface Status {
	id: number;
	name: string;
	color: string;
}


export default function StatusManagement() {
	const [statuses, setStatuses] = useState<Status[]>([]);
	const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);
	const [editingStatus, setEditingStatus] = useState<Status | null>(null);
	const [deletingStatus, setDeletingStatus] = useState<Status | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [token, setToken] = useState<string | null>(null);
  const { data:statusesResponse } = useGetStatusesQuery(token!!, { skip: !token});
	useEffect(() => {
		if (statusesResponse) {
			setStatuses(statusesResponse.result.data.statuses);
		}
	}, [statusesResponse])
	const handleSelectStatus = (statusId: number) => {
		setSelectedStatuses((prev) =>
			prev.includes(statusId)
				? prev.filter((id) => id !== statusId)
				: [...prev, statusId]
		);
	};

	const handleEditStatus = (status: Status) => {
		setEditingStatus(status);
		setIsEditModalOpen(true);
	};

	const handleDeleteStatus = (status: Status) => {
		setDeletingStatus(status);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		if (deletingStatus) {
			setStatuses((prev) =>
				prev.filter((status) => status.id !== deletingStatus.id)
			);
			setIsDeleteModalOpen(false);
			setDeletingStatus(null);
		}
	};

	const confirmEdit = () => {
		if (editingStatus) {
			setStatuses((prev) =>
				prev.map((status) =>
					status.id === editingStatus.id ? editingStatus : status
				)
			);
			setIsEditModalOpen(false);
			setEditingStatus(null);
		}
	};

	const handleBulkDelete = () => {
		setIsBulkDeleteModalOpen(true);
	};

	const confirmBulkDelete = () => {
		setStatuses((prev) =>
			prev.filter((status) => !selectedStatuses.includes(status.id))
		);
		setSelectedStatuses([]);
		setIsBulkDeleteModalOpen(false);
	};

	const handleSearch = () => {
		const filteredStatuses = statuses.filter((status) =>
			status.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setStatuses(filteredStatuses);
	};
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, [])
	return (
		<AdminPageWrapper>
			<main>
				<Navbar />
				<div className="mx-auto py-10 px-4">
					<div className="mb-4 flex items-center space-x-2">
						<Input
							type="text"
							placeholder="Search statuses..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="max-w-sm"
						/>
						<Button onClick={handleSearch}>
							<Search className="h-4 w-4 mr-2" />
							Search
						</Button>
					</div>
					<div className="mb-4">
						<Button
							onClick={handleBulkDelete}
							disabled={selectedStatuses.length === 0}
						>
							Delete Selected
						</Button>
					</div>
					<div className="border rounded-md mb-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">Select</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Color</TableHead>
									<TableHead className="w-[100px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{statuses.map((status) => (
									<TableRow key={status.id}>
										<TableCell>
											<Checkbox
												checked={selectedStatuses.includes(status.id)}
												onCheckedChange={() => handleSelectStatus(status.id)}
											/>
										</TableCell>
										<TableCell>{status.name}</TableCell>
										<TableCell>
											<div className="flex items-center">
												<div
													className="w-6 h-6 rounded mr-2"
													style={{ backgroundColor: status.color }}
												></div>
												{status.color}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleEditStatus(status)}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleDeleteStatus(status)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{/* Edit Modal */}
					<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Status</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										Name
									</Label>
									<Input
										id="name"
										value={editingStatus?.name || ""}
										className="col-span-3"
										disabled
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="color" className="text-right">
										Color
									</Label>
									<Input
										id="color"
										value={editingStatus?.color || ""}
										onChange={(e) =>
											setEditingStatus((prev) =>
												prev ? { ...prev, color: e.target.value } : null
											)
										}
										className="col-span-3"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={confirmEdit}>Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{/* Delete Modal */}
					<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confirm Deletion</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete the status "
									{deletingStatus?.name}"?
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setIsDeleteModalOpen(false)}
								>
									Cancel
								</Button>
								<Button variant="destructive" onClick={confirmDelete}>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{/* Bulk Delete Modal */}
					<Dialog
						open={isBulkDeleteModalOpen}
						onOpenChange={setIsBulkDeleteModalOpen}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confirm Bulk Deletion</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete {selectedStatuses.length}{" "}
									selected statuses?
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setIsBulkDeleteModalOpen(false)}
								>
									Cancel
								</Button>
								<Button variant="destructive" onClick={confirmBulkDelete}>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</main>
		</AdminPageWrapper>
	);
}
