import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";

const settingsUrl = absoluteUrl("/settings");

export async function GET(request: any) {

  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(request.url);
    const isMonthly = searchParams.get("isAnnual") === "true";

    if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

    const userSubscription = await prismadb.userSubscritpion.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genius Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: isMonthly ? 2000 : 24000, // 2000 cents for monthly, 24000 cents for yearly
            recurring: {
              interval: isMonthly ? "month" : "year", // Set the recurring interval based on isMonthly
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
