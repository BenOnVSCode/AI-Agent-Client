"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useLoginUserMutation, useProfileQuery } from "./store/services/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { changeInfo } from "./store/slices";
import { LoadingSpinner } from "@/components/loading";

export default function LoginPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [createUser] = useLoginUserMutation();

	// Retrieve the token on the client side
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);

	const { data: profileData, error: profileError, isLoading: isProfileLoading } = useProfileQuery(token || "", {
		skip: !token,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!credentials.email || !credentials.password) {
			setError("Please enter both email and password.");
			return;
		}

		setLoading(true);

		try {
			const res = await createUser(credentials);
			if (res.error) throw new Error("Invalid credentials");

			const loginResponse: LoginResponse = res.data;
			const newToken = loginResponse.result.data.token;
			localStorage.setItem("token", newToken);
			setToken(newToken);  // Update the token state to re-trigger profile query
			router.push("/");
		} catch (err) {
			toast({
				title: "Invalid credentials",
				description: "These credentials are invalid, check with the admin for your credentials",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (profileData) {
			dispatch(
				changeInfo({
					name: profileData.result.data.name,
					email: profileData.result.data.email,
					role: profileData.result.data.role,
					id: profileData.result.data.id,
				})
			);
			router.push("/calls");
		}
	}, [profileData, router, dispatch]);

	if (isProfileLoading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<LoadingSpinner />
			</div>
		);
	}

	if (profileError) console.error(profileError);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl text-center">AI Calls Management</CardTitle>
					<CardDescription className="text-center">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={credentials.email}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									value={credentials.password}
									onChange={handleInputChange}
									required
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button disabled={loading} className="w-full" type="submit" onClick={handleSubmit}>
						{loading ? <LoadingSpinner /> : "Log in"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
