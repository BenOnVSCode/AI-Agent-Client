import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


const callData = {
  type: "Inbound",
  date: "2023-05-15T14:30:00Z",
  transcript: "This is a sample transcript of the call...",
  number: "+1 (555) 123-4567",
  status: "Completed",
  recordingUrl: "https://example.com/recording/123456",
  clientName: "John Doe",
  postCode: "SW1A 1AA",
  poa: "Yes",
  initiatedBy: "Customer",
  duration: "00:15:30",
  summary: "Customer called to inquire about their recent order. The agent provided tracking information and estimated delivery date. The customer expressed satisfaction with the service."
}

export default function CallDataModal({ isOpen, setIsOpen, callData }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, callData?: Call}) {

  if(!callData) return null;
  const downloadTranscript = () => {
    const element = document.createElement("a")
    const file = new Blob([callData.transcript], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "call_transcript.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-light">
            Call Data
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Call Details</h3>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Type:</span>
                  <span className="col-span-2 text-sm">{callData.type}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Date:</span>
                  <span className="col-span-2 text-sm">{new Date(callData.date).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Number:</span>
                  <span className="col-span-2 text-sm">{callData.number}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Status:</span>
                  <span className="col-span-2 text-sm">{callData.status}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Duration:</span>
                  <span className="col-span-2 text-sm">{callData.duration}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Client Information</h3>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Name:</span>
                  <span className="col-span-2 text-sm">{callData.clientName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Post Code:</span>
                  <span className="col-span-2 text-sm">{callData.postCode}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">POA:</span>
                  <span className="col-span-2 text-sm">{callData.poa}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <span className="text-sm font-light">Initiated By:</span>
                  <span className="col-span-2 text-sm">{callData.initiatedBy}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Call Summary</h3>
              <p className="text-sm font-light">{callData.summary}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Resources</h3>
              <div className="flex gap-4">
                
                <Button variant="outline" size="sm" className="text-sm font-light" asChild>
                  <a href={callData.recordingUrl} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4" />
                    Listen to Recording
                  </a>
                </Button>
                <Button onClick={downloadTranscript} variant="outline" size="sm" className="text-sm font-light">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Transcript
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}