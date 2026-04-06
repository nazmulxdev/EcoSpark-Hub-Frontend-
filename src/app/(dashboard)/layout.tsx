export const dynamic = "force-dynamic";

import { getAuthSession } from "@/actions/client/auth.client";
import { DashboardClientLayout } from "@/components/modules/dashboard/DashbadLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, error } = await getAuthSession();

  if (error || !session) {
    redirect("/login?redirect=/dashboard");
  }

  const user = session.user;
  const userRole = user.role;
  console.log("user", user);
  console.log("role", userRole);

  return (
    <DashboardClientLayout user={user} userRole={userRole}>
      {children}
    </DashboardClientLayout>
  );
}
