import { getAuthSession } from "@/actions/client/auth.client";
import { BecomeMemberClient } from "@/components/modules/beMember/BecomeMemberClient";
import { redirect } from "next/navigation";
import { getMyPaymentInfo } from "@/actions/client/membershipPayment.action";
import { Suspense } from "react";
import { LayoutDashboard, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Become a Member | EcoSpark Hub",
  description:
    "Unlock premium features and join our community of sustainability visionaries",
};

export default async function BecomeMemberPage() {
  const { data: session, error } = await getAuthSession();

  if (error || !session) {
    redirect("/login?redirect=/dashboard/become-member");
  }

  const user = session.user;
  const isAlreadyMember = user.role === "MEMBER";

  // If already a member, redirect to member dashboard
  if (isAlreadyMember) {
    redirect("/member/dashboard");
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={<BecomeMemberLoading />}>
        <BecomeMemberWrapper
          userId={user.id}
          userName={user.name}
          isAlreadyMember={isAlreadyMember}
        />
      </Suspense>
    </div>
  );
}

async function BecomeMemberWrapper({
  userId,
  userName,
  isAlreadyMember,
}: {
  userId: string;
  userName: string;
  isAlreadyMember: boolean;
}) {
  let paymentData = null;
  let paymentStatus = null;
  let hasPendingPayment = false;
  let isPaid = false;

  try {
    const paymentInfo = await getMyPaymentInfo();
    if (paymentInfo.data) {
      paymentData = paymentInfo.data;
      paymentStatus = paymentInfo.data.status;
      isPaid = paymentStatus === "PAID";
      // Payment exists but not PAID yet (PENDING/UNPAID)
      hasPendingPayment = !isPaid && paymentStatus !== null;
    }
  } catch (error) {
    console.log("No existing payment record", error);
  }

  // Case 1: Payment is PAID but user role is still USER (admin hasn't approved yet)
  if (isPaid && !isAlreadyMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-950/50 rounded-full mb-6">
            <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Membership Pending Approval
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you, {userName}! Your payment has been received successfully.
            Our admin team is reviewing your membership application.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-5 mb-8">
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              Payment Status: <span className="font-semibold">PAID</span>
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-2">
              Membership Status:{" "}
              <span className="font-semibold">Pending Admin Approval</span>
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3">
              Transaction ID: {paymentData?.id}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/ideas"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-all"
            >
              Explore Ideas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: User has pending payment (not PAID yet)
  if (hasPendingPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-950/50 rounded-full mb-6">
            <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You have a pending membership payment. Please complete the payment
            to activate your membership.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-5 mb-8">
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              Payment Status:{" "}
              <span className="font-semibold">
                {paymentStatus || "PENDING"}
              </span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BecomeMemberClient
              userId={userId}
              hasPendingPayment={true}
              pendingPaymentStatus={paymentStatus}
            />
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: No payment record - show become member form
  return (
    <BecomeMemberClient
      userId={userId}
      hasPendingPayment={false}
      pendingPaymentStatus={null}
    />
  );
}

function BecomeMemberLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gray-200 dark:bg-zinc-800 rounded-2xl mx-auto mb-6 animate-pulse" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
