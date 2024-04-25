import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const userSubscription = await prismadb.userSubscritpion.findUnique({
      where: {
        userId,
      },
    });

    if (!userSubscription || !userSubscription.stripeSubscriptionId) {
      return new NextResponse("User subscription not found", { status: 404 });
    }

    const checkUserSubscription = await stripe.subscriptions.retrieve(
      userSubscription.stripeSubscriptionId,
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
