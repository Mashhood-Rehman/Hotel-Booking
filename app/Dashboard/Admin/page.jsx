import { authOptions } from "@/lib/auth";
import AdminLayout from "../../../components/AdminLayout";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <AdminLayout>
        <h1>Welcome {session.user.name}</h1>
      </AdminLayout>
    </div>
  );
};

export default Page;

// import React from "react";

// const page = () => {
//   return <div></div>;
// };

// export default page;
