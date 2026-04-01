import { getAuthSession } from "@/actions/client/auth.client";
import { PaymentFailedClient } from "@/components/modules/payment/PaymentFailedClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Payment Failed | EcoSpark Hub",
  description: "Your payment was not successful. Please try again.",
};

interface PageProps {
  searchParams: Promise<{
    session_id?: string;
    error?: string;
  }>;
}

export default async function PaymentFailedPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const errorMessage = params.error;

  const { data: session, error } = await getAuthSession();

  if (error || !session) {
    redirect("/login?redirect=/dashboard/payment/payment-failed");
  }

  return (
    <div className="min-h-screen">
      <PaymentFailedClient
        sessionId={sessionId}
        errorMessage={errorMessage}
        userName={session.user.name}
      />
    </div>
  );
}
