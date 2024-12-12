import { getServerSession } from "next-auth";
import AdminLayout from "../../../components/AdminLayout";
import { authOptions } from "@/lib/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user) {
    throw new Error("Access Denied");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Insufficient Permissions");
  }
  return (
    <div>
      <AdminLayout>
        <h1>Welcome {session.user.name} </h1>
      </AdminLayout>
    </div>
  );
};

export default Page;
