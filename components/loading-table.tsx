"use client"


import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Skeleton } from "./ui/skeleton"


export default function LoadingTable() {
  return (
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
            {Array.from({ length: 6 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
            </TableBody>
          </Table>
        </div>
  )
}