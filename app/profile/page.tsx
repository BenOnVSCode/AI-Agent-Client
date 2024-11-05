"use client";
import { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/navbar";
import { useProfileQuery } from "../store/services/auth";

import AuthWrapper from "../AuthWrapper";

export default function ProfilePage() {
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [token, setToken] = useState<string | null>(null);
  const { data:profile } = useProfileQuery(token!!, { skip: !token});
  const profileInfo  = profile?.result.data!!;
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, [])
  const handleSubmit = () => {}
	return (
		<AuthWrapper>
			<main>
				<Navbar />
				<div className="container mx-auto p-4 mt-24">
					<Card className="max-w-md mx-auto">
						<CardHeader>
							<CardTitle className="text-2xl">Profile Settings</CardTitle>
							<CardDescription>Update your email and password</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<div className="relative">
											<Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
											<Input
												id="email"
												type="email"
												placeholder="Enter your email"
												value={profileInfo.email}
												disabled={true}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-8"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="new-password">New Password</Label>
										<div className="relative">
											<Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
											<Input
												id="new-password"
												type="password"
												placeholder="Enter new password"
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												className="pl-8"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="confirm-password">
											Confirm New Password
										</Label>
										<div className="relative">
											<Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
											<Input
												id="confirm-password"
												type="password"
												placeholder="Confirm new password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className="pl-8"
											/>
										</div>
									</div>
								</div>
								{message && (
									<Alert
										className="mt-4"
										variant={
											message.includes("successfully")
												? "default"
												: "destructive"
										}
									>
										<AlertDescription>{message}</AlertDescription>
									</Alert>
								)}
								<CardFooter className="px-0 pt-6">
									<Button type="submit" className="w-full">
										Update Profile
									</Button>
								</CardFooter>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
		</AuthWrapper>
	);
}
