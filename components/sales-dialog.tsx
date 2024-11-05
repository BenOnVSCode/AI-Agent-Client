import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useCreateBulkSalesMutation, useCreateSaleCallMutation } from "@/app/store/services/calls"
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx'; // Import the xlsx library
import { LoadingSpinner } from "./loading"
import { useSelector } from "react-redux"

export const SalesDialog = () => {
  const [createSaleCall, { isLoading }] = useCreateSaleCallMutation();
  const [createBulkSales, { isLoading: isBulkLoading }] = useCreateBulkSalesMutation();
  const [fileData, setFileData] = useState<Array<{ name: string; address: string; postCode: string; number: string }>>([]);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])
  const userId = useSelector((state:StoreType) => state.state.id)
  const [formData, setFormData] = useState<SaleCallRequest>({
    token: token!!,
    name: "",
    address: "",
    postCode: "",
    userId: 0,
    number: ""
  });

  useEffect(() => {
    if(userId) {
      setFormData((prev) => ({
        ...prev,
        userId: userId!!
      }))
    }
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(fileData.length > 0) {
        await createBulkSales({ calls: fileData, initiatedBy: formData.userId, token: formData.token }).unwrap();
      } else {
        await createSaleCall(formData).unwrap(); 
      }
    } catch (error) {
      console.error("Failed to create sale call:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const formattedData = formatExcelData(jsonData);
        setFileData(formattedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  const formatExcelData = (data: any[]): { name: string; address: string; postCode: string; number: string }[] => {
    return data
      .filter(row => row.some((cell:any) => cell !== undefined && cell !== "")) // Filter out empty rows
      .map(row => ({
        name: row[0] || "",
        address: row[1] || "",
        postCode: row[2] || "",
        number: row[3] || ""
      }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Sale Calls</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sale Calls</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="clientName" className="w-1/4 text-right">
              Client Name
            </Label>
            <Input 
              id="clientName" 
              name="name" 
              className="flex-1" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Label htmlFor="clientAddress" className="w-1/4 text-right">
              Address
            </Label>
            <Input 
              id="clientAddress" 
              name="address" 
              className="flex-1" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Label htmlFor="postCode" className="w-1/4 text-right">
              Post Code
            </Label>
            <Input 
              id="postCode" 
              name="postCode" 
              className="flex-1" 
              value={formData.postCode} 
              onChange={handleChange} 
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="number" className="w-1/4 text-right">
              Number
            </Label>
            <Input 
              id="number" 
              name="number" 
              className="flex-1" 
              value={formData.number} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <Label htmlFor="file" className="w-1/4 text-right">
              Upload Excel File
            </Label>
            <Input 
              id="file" 
              type="file" 
              className="flex-1" 
              accept=".xlsx, .xls" 
              onChange={handleFileChange} 
            />
          </div>
          <Button type="submit" disabled={isLoading || isBulkLoading}>
            {isLoading || isBulkLoading ? <LoadingSpinner /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}