"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileQuery } from "./store/services/auth";
import { LoadingSpinner } from "@/components/loading";
import { useDispatch } from "react-redux";
import { changeInfo } from "./store/slices";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: profileData, isFetching, isError } = useProfileQuery(token!, { skip: !token });

  useEffect(() => {
    if (!isFetching) {
      if (isError || !profileData) {
        router.push("/");
      } else {
        dispatch(changeInfo(profileData.result.data));
      }
    }
  }, [isError, isFetching, profileData, router, dispatch]);

  if (isFetching || !token) {
    return (
      <main>
        <LoadingSpinner />
      </main>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
