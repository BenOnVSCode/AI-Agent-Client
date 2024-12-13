import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useCreateBulkFinanceSaleCallsMutation, useCreateFinanceSaleCallMutation } from "@/app/store/services/calls"
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx'; 
import { LoadingSpinner } from "./loading"
import { useProfileQuery } from "@/app/store/services/auth"

export const FinanceSalesDialog = () => {
  const [createFinanceSaleCall, { isLoading }] = useCreateFinanceSaleCallMutation();
  const [createBulkFinanceSaleCalls, { isLoading: isBulkLoading }] = useCreateBulkFinanceSaleCallsMutation();
  const [fileData, setFileData] = useState<Array<{ name: string; number: string }>>([]);  // Removed address and postCode
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])

  const { data: profileData } = useProfileQuery(token!!, { skip: !token });

  const [formData, setFormData] = useState<FinanceSaleCallRequest>({
    token: "",
    name: "",
    userId: 0,
    number: ""
  });

  useEffect(() => {
    if(profileData) {
      setFormData({...formData, userId: profileData?.result.data.id!!, token: token!!});
    }
  }, [profileData])

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
        await createBulkFinanceSaleCalls({ calls: fileData, initiatedBy: formData.userId, token: formData.token }).unwrap();
      } else {
        await createFinanceSaleCall(formData).unwrap(); 
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
  
  const formatExcelData = (data: any[]): { name: string; number: string }[] => {  // Removed address and postCode
    return data
      .filter(row => row.some((cell:any) => cell !== undefined && cell !== "")) // Filter out empty rows
      .map(row => ({
        name: row[0] || "",
        number: row[1] || ""  // Only name and number
      }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Finance Sale Calls</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Car Finance Sale Calls</DialogTitle>
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
