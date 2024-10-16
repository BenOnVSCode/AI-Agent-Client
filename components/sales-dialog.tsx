import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export const SalesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Sale Calls</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sale Calls</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientName" className="text-right">
              Client Name
            </Label>
            <Input id="clientName" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientAddress" className="text-right">
              Address
            </Label>
            <Input id="clientAddress" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Upload File
            </Label>
            <Input id="file" type="file" className="col-span-3" />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </DialogContent>
    </Dialog>
  )
}