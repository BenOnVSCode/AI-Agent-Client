import AdminPageWrapper from "../AdminPageWrapper";
import UsersTable from "@/components/users-table"
export default function Users(){
  return (
    <AdminPageWrapper>
      <UsersTable />
    </AdminPageWrapper>
  )
}