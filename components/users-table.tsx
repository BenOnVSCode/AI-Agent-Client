"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "@/app/store/services/users";
import AdminPageWrapper from "@/app/AdminPageWrapper";
import Navbar from "./navbar";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	createdAt: string;
}



export default function UserTable() {
	const [users, setUsers] = useState<User[]>([]);
	const [token, setToken] = useState<string | null>(null);
	const [localUsers, setLocalUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("");
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<number | null>(null);
	const [deleteUser] = useDeleteUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const { data: usersResponse } = useGetUsersQuery(token!!, { skip: !token });
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);

	useEffect(() => {
		if (usersResponse) {
			setLocalUsers(usersResponse.result.data.users);
		}
	}, [usersResponse]);
	const filteredUsers = localUsers.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(roleFilter === "" || user.role === roleFilter)
	);

	const handleDelete = (userId: number) => {
		setUserToDelete(userId);
		setIsDeleteDialogOpen(true);
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setIsEditSheetOpen(true);
	};

	const handleUpdateUser = (updatedUser: User) => {
		setLocalUsers(
			localUsers.map((user) =>
				user.id === updatedUser.id ? updatedUser : user
			)
		);
		updateUser({...updatedUser, token: token!!});
		setIsEditSheetOpen(false);
	};

	const confirmDelete = () => {
		if (userToDelete) {
			setLocalUsers(localUsers.filter((user) => user.id !== userToDelete));
			deleteUser({ id: userToDelete, token: token!! });
			setIsDeleteDialogOpen(false);
		}
	};

	return (
		<AdminPageWrapper>
			<Navbar />
			<div className="p-4">
				<div className="flex justify-between mb-4">
					<Input
						placeholder="Search users..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<Filter className="mr-2 h-4 w-4" />
								Filter
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onSelect={() => setRoleFilter("")}>
								All Roles
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setRoleFilter("ADMIN")}>
								ADMIN
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setRoleFilter("USER")}>
								USER
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			<div className="rounded-md border shadow-md overflow-hidden my-4">
			<Table className="border rounded-lg shadow-md overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{format(new Date(user.createdAt), 'PP')}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
			</div>
			

				<Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit User</SheetTitle>
							<SheetDescription>
								Make changes to the user's information here.
							</SheetDescription>
						</SheetHeader>
						{editingUser && (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const formData = new FormData(e.currentTarget);
									handleUpdateUser({
										...editingUser,
										name: formData.get("name") as string,
										email: formData.get("email") as string,
										role: formData.get("role") as string,
									});
								}}
								className="space-y-4 mt-4"
							>
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										defaultValue={editingUser.name}
									/>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										defaultValue={editingUser.email}
										type="email"
									/>
								</div>
								<div>
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										name="password"
										type="password"
									/>
								</div>
								<div>
									<Label htmlFor="role">Role</Label>
									<Select name="role" defaultValue={editingUser.role}>
										<SelectTrigger>
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ADMIN">ADMIN</SelectItem>
											<SelectItem value="USER">USER</SelectItem>
											<SelectItem value="editor">Editor</SelectItem>
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
							<DialogTitle>
								Are you sure you want to delete this user?
							</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete the
								user's account and remove their data from our servers.
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
		</AdminPageWrapper>
	);
}
