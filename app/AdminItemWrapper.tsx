"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileQuery } from "./store/services/auth";
import { LoadingSpinner } from "@/components/loading";

interface AdminWrapperProps {
  children: ReactNode;
}

const AdminWrapper = ({ children }: AdminWrapperProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // Set token only on the client side
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: profileData, isFetching, isError } = useProfileQuery(token!, { skip: !token });

  useEffect(() => {
    
  }, [isError, isFetching, profileData, router]);

  if (isFetching || !token) {
    return (
      <main>
        <LoadingSpinner />
      </main>
    );
  }

  if (profileData?.result.data.role !== "ADMIN") return null;

  return <>{children}</>;
};

export default AdminWrapper;
