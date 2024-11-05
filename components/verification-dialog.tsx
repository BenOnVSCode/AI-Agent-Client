"use client"
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useCreateVerificationCallMutation } from "@/app/store/services/calls"
import { useSelector } from "react-redux";
import { useProfileQuery } from "@/app/store/services/auth";


export const VerificationDialog = () => {
  const [createVerificationCall] = useCreateVerificationCallMutation();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])
  const { data:profile } = useProfileQuery(token!!, { skip: !token});
  const [formData, setFormData] = useState<VerificationCallRequest>({
    initiatedBy: profile?.result.data.id!!,
    token: token!!,
    name: "",
    address: "",
    id: "",
    number: "", 
    split: false,
    price: 0,
    bank: "",
    isDD: false,
    postCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value
    }));
  };

  const handleCheckedChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVerificationCall(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Verification Call</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verification Call</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="id" className="text-right">Reference</Label>
            <Input id="id" name="id" placeholder="Either on CRM or new" className="col-span-3" value={formData.id} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" className="col-span-3" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="number" className="text-right">Number</Label>
            <Input id="number" name="number" className="col-span-3" value={formData.number} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="address" className="text-right">Address</Label>
            <Input id="address" name="address" className="col-span-3" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" name="price" type="number" className="col-span-3" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="bank" className="text-right">Bank</Label>
            <Input id="bank" name="bank" type="text" className="col-span-3" value={formData.bank} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="postcode" className="text-right">Post Code</Label>
            <Input id="postcode" name="postcode" className="col-span-3"  onChange={handleChange} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="split" name="split" onCheckedChange={(checked) => handleCheckedChange("split", (checked as boolean))} />
            <Label htmlFor="split">Is Split</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isDD" name="isDD" onCheckedChange={(checked) => handleCheckedChange("isDD", (checked as boolean))} />
            <Label htmlFor="isDD">Is DD</Label>
          </div>
          <Button type="submit">Start a call</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
