import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileQuery } from "./store/services/auth";
import { LoadingSpinner } from "@/components/loading";




interface AdminWrapperProps {
  children: ReactNode;
}

const AdminWrapper = ({ children }: AdminWrapperProps) => {
  const router = useRouter();
  const token = localStorage.getItem("token")
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
  if(profileData?.result.data.role !== "ADMIN") {
    router.push("/calls");
  }
  return <>{ children }</>
};

export default AdminWrapper;
