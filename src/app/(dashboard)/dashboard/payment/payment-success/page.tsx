import { getAuthSession } from "@/actions/client/auth.client";
import { PaymentSuccessClient } from "@/components/modules/payment/PaymentSuccessClient";
import { redirect } from "next/navigation";
import { getMyPaymentInfo } from "@/actions/client/membershipPayment.action";

export const metadata = {
  title: "Payment Successful | EcoSpark Hub",
  description:
    "Your payment was successful. Welcome to EcoSpark Hub membership!",
};

interface PageProps {
  searchParams: Promise<{
    payment_id?: string;
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const paymentId = params.payment_id;
  const sessionId = params.session_id;

  const { data: session, error } = await getAuthSession();

  if (error || !session) {
    redirect("/login?redirect=/dashboard/payment/payment-success");
  }

  const paymentInfo = await getMyPaymentInfo();

  return (
    <div className="min-h-screen">
      <PaymentSuccessClient
        paymentId={paymentId}
        sessionId={sessionId}
        userName={session.user.name}
        paymentStatus={paymentInfo.data?.status}
      />
    </div>
  );
}
