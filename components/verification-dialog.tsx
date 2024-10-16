import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"


export const VerificationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Verification Call</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verification Call</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" className="col-span-3" />
          </div>
          <div className="">
            <Label htmlFor="postcode" className="text-right">
              Post Code
            </Label>
            <Input id="postcode" className="col-span-3" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isSplit" />
            <Label htmlFor="isSplit">Is Split</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isDD" />
            <Label htmlFor="isDD">Is DD</Label>
          </div>
        </div>
        <Button type="submit">Start a call</Button>
      </DialogContent>
    </Dialog>
  )
}