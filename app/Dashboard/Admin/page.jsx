import { getServerSession } from "next-auth";
import AdminLayout from "../../../components/AdminLayout";
import { authOptions } from "@/lib/auth";
import { Link } from "lucide-react";

const Page = async () => {
  return (
    <div>
      <AdminLayout>
        <h1>Welcome </h1>
      </AdminLayout>
    </div>
  );
};

export default Page;
