"use client";
import Navbar from "@/components/navbar";
import { useProfileQuery } from "../store/services/auth";
import EnhancedCallLog from "@/components/call-log";
import { useGetCallsQuery } from "../store/services/calls";
import { useGetStatusesQuery } from "../store/services/statuses";
import AuthWrapper from "../AuthWrapper";
import CallDataModal from "@/components/call-data";
import { useEffect, useState } from "react";
import LoadingTable from "@/components/loading-table";
import { SalesDialog } from "@/components/sales-dialog";
import { VerificationDialog } from "@/components/verification-dialog";
import { Pagination } from "@/components/pagination";
import { useSelector } from "react-redux";
import { changePage } from "../store/slices";

export default function Home() {
	const token = localStorage.getItem("token");
  const currentPage = useSelector((state:StoreType) => state.state.callsPage )
	const { data: callsResponse, isFetching:callsLoading } = useGetCallsQuery({ page: currentPage, token: token!! }, { skip: !token });
	const { data: statuses } = useGetStatusesQuery(token!!);
  const { data:profile } = useProfileQuery(token!!, { skip: !token});
  const name = profile?.result.data.name;
  const [isOpen, setIsOpen] = useState(false);
  const [currentCallData, setCurrentCallData] = useState<Call>();
  const [selectedCall, setSelectedCall] = useState<string>("");
  
  useEffect(() => {
    const call = callsResponse?.result.data.calls.find(call => call.id === selectedCall);
    setCurrentCallData(call);
    setIsOpen(true);
  }, [selectedCall])
	return (
		<AuthWrapper>
			<main>
        <CallDataModal isOpen={isOpen} setIsOpen={setIsOpen} callData={currentCallData} />
				<Navbar />
				<section className="p-4">
					<h1 className="text-lg font-semibold">
						Hello,{" "}
						<span className="font-normal">{name}</span>{" "}
						👋👋
					</h1>
          <div className="my-2 flex items-center gap-4">
            <SalesDialog />
            <VerificationDialog />
          </div>
					<div className="w-full">
						{callsResponse && statuses ? (
							<EnhancedCallLog  selectedCall={selectedCall} setSelectedCall={setSelectedCall} calls={callsResponse.result.data.calls} />
						) : <LoadingTable /> }
					</div>
          {
            callsResponse && statuses ? (
              <Pagination maxPage={callsResponse.result.data.totalPages} currentPage={currentPage} changePage={changePage} />
            ) : null
          }
				</section>
			</main>
		</AuthWrapper>
	);
}