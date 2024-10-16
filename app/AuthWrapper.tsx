import { ReactNode, useEffect } from "react";
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
  const token = localStorage.getItem("token");
  const { data: profileData, isFetching, isError } = useProfileQuery(token!!, {skip: !token});
  useEffect(() => { 
    if (isError || !profileData) {
      router.push("/");
    }
  }, [isFetching, router]);

  if (isFetching) {
    return (
      <main>
        <LoadingSpinner />
      </main>
    )
  }
  return <>{children}</>;
};

export default AuthWrapper;
