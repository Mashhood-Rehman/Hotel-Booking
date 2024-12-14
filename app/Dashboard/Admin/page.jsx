import { getServerSession } from "next-auth";
import AdminLayout from "../../../components/AdminLayout";
import { authOptions } from "@/lib/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session.user.role);
  return (
    <div>
      <AdminLayout>
        {session ? (
          <h1>Welcome {session.user.name} </h1>
        ) : (
          <h1>Not Logged in</h1>
        )}
      </AdminLayout>
    </div>
  );
};

export default Page;
