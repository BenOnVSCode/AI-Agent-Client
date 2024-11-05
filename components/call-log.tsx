"use client"

import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useGetStatusesQuery } from "@/app/store/services/statuses"
import { useRouter } from "next/navigation"

const typeColors = {
  "Verification": "bg-purple-100",
  "Sales": "bg-amber-50",
  "Customer Support": "bg-teal-50"
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function EnhancedCallLog({ calls, selectedCall, setSelectedCall }: { calls: Call[], selectedCall: string, setSelectedCall: Dispatch<SetStateAction<string>> }) {

  const [error, setError] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])
  const router = useRouter();

  const { data: statusesResponse } = useGetStatusesQuery(token!!, { skip: !token });
  
  const findStatus = (id: number) => {
    const status = statusesResponse?.result.data.statuses.find(status => status.id === id);
    return status;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto">
      {calls.length === 0 ? (
        <p>No calls to display.</p>
      ) : (
        <div className="rounded-md border shadow-md overflow-hidden my-4">
          <Table className="">
            <TableHeader>
              <TableRow className="space-y-2">
                <TableHead>Client Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow
                  onClick={() => setSelectedCall(call.id)}
                  key={call.id}
                  className={`cursor-pointer ${call.type === 'verification' ? "bg-[#e2f9ee]" : "bg-[#CDC1FF]"} ${typeColors[call.type as CallType]}`}
                >
                  <TableCell className="font-medium">{call.clientName}</TableCell>
                  <TableCell>
                    <Badge style={{ background: call.statusColor }} className={`text-white hover:bg-gray-100`}>
                      {capitalizeFirstLetter(call.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{capitalizeFirstLetter(call.type)}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{new Date(call.date).toLocaleString()}</TableCell>
                  <TableCell>{call.initiatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}