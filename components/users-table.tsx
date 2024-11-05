"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Adjust the import path as necessary
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminWrapper from "@/app/AdminPageWrapper";
import Navbar from "./navbar";
import { useGetUsersQuery } from "@/app/store/services/users";

const initialUsers: User[] = [];
export default function UserTable() {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, [])
	const { data, isLoading, isError } = useGetUsersQuery(token!!, { skip: !token});
	const handleEditUser = (user: User) => {
		setEditingUser(user);
		setIsEditSheetOpen(true); 
	};

	const handleDeleteUser = (user: User) => {
		setUserToDelete(user);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (userToDelete) {
			setUsers(users.filter((user) => user.id !== userToDelete.id));
			setIsDeleteDialogOpen(false);
			setUserToDelete(null);
		}
	};

	const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editingUser) {
			setUsers(
				users.map((user) => (user.id === editingUser.id ? editingUser : user))
			);
			setIsEditSheetOpen(false);
			setEditingUser(null);
		}
	};

	useEffect(() => {
		if (data) {
			setUsers(data.result.data.users);
		}
	}, [data]);

	return (
		<AdminWrapper>
      <Navbar />
			<div className="mt-4 m-4">
				<div className="border rounded-lg shadow-md bg-white">
					<div className="-m-1">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Created Date</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.result.data.users.map((user) => (
									<TableRow key={user.id}>
										<TableCell className="py-2">{user.name}</TableCell>
										<TableCell className="py-2">{user.email}</TableCell>
										<TableCell className="py-2">
											{user.createdAt.toString()}
										</TableCell>
										<TableCell className="py-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleEditUser(user)}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleDeleteUser(user)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>

				<Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit User</SheetTitle>
						</SheetHeader>
						{editingUser && (
							<form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={editingUser.name}
										onChange={(e) =>
											setEditingUser({ ...editingUser, name: e.target.value })
										}
									/>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={editingUser.email}
										onChange={(e) =>
											setEditingUser({ ...editingUser, email: e.target.value })
										}
									/>
								</div>
								<div>
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter new password"
									/>
								</div>
								<div>
									<Label htmlFor="password">Role</Label>
									<Select >
										<SelectTrigger id="role">
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
										<SelectContent defaultValue={editingUser.role}>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<SheetFooter>
									<SheetClose asChild>
										<Button type="submit">Save changes</Button>
									</SheetClose>
								</SheetFooter>
							</form>
						)}
					</SheetContent>
				</Sheet>

				<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete the
								user account.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsDeleteDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button variant="destructive" onClick={confirmDelete}>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</AdminWrapper>
	);
}
