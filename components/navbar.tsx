"use client";
import Link from "next/link";
import { Users, Phone, Clipboard, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";
import AdminItemWrapper from "@/app/AdminItemWrapper";
export default function Navbar() {
	const router = useRouter();
	const links = [
		{ href: "/calls", label: "Calls", icon: Phone, adminOnly: false },
		{ href: "/users", label: "Users", icon: Users, adminOnly: true },
		{ href: "/logs", label: "Logs", icon: Clipboard, adminOnly: true },
		{ href: "/statuses", label: "Statuses", icon: Tag, adminOnly: true },
	];
	function handleSignOut() {
		localStorage.removeItem("token");
		router.push("/");
	}
	return (
		<nav className="border-b">
			<div className="flex h-16 items-center px-4">
				<div className="mr-4 hidden md:flex">
					<nav className="flex items-center space-x-6 text-sm font-medium">
						{links.map((link, index) =>
							link.adminOnly ? (
								<AdminItemWrapper key={index}>
									<Link
										key={link.href}
										href={link.href}
										className="transition-colors hover:text-foreground/80 text-foreground/60"
									>
										<link.icon className="h-4 w-4 mr-1 inline-block" />
										{link.label}
									</Link>
								</AdminItemWrapper>
							) : (
								<Link
									key={link.href}
									href={link.href}
									className="transition-colors hover:text-foreground/80 text-foreground/60"
								>
									<link.icon className="h-4 w-4 mr-1 inline-block" />
									{link.label}
								</Link>
							)
						)}
					</nav>
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Open menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="flex flex-col space-y-4 mt-4">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="flex items-center text-lg font-medium"
								>
									<link.icon className="h-5 w-5 mr-2" />
									{link.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<Link href="/profile">
						<Button variant="ghost" size="icon">
							<User className="h-5 w-5" />
							<span className="sr-only">Profile</span>
						</Button>
					</Link>
					<Button variant="ghost" size="sm" onClick={() => handleSignOut()}>
						<LogOut className="h-5 w-5 mr-2" />
						Sign Out
					</Button>
				</div>
			</div>
		</nav>
	);
}
