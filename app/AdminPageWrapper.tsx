"use client";
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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: profileData, isFetching, isError } = useProfileQuery(token!, { skip: !token });

  useEffect(() => {
   if(isError) router.push("/");
   if(profileData && profileData?.result.data.role !== "ADMIN") router.push("/calls");
  }, [isError, isFetching, profileData, router]);

  if (isFetching || !token) {
    return (
      <main>
        <LoadingSpinner />
      </main>
    );
  }

  return <>{children}</>;
};

export default AdminWrapper;
