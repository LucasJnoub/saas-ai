import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// API checksubscription



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

    const priceId = checkUserSubscription.items.data[0].price.id;
    console.log(`User's subscription price ID: ${priceId}`);  

    let plan = ''

    if(priceId == process.env.PRICE_ID_PRO_MENSAL || priceId == process.env.PRICE_ID_PRO_ANUAL)plan = 'Pro'
    if(priceId == process.env.PRICE_ID_BUSINESS_MENSAL || priceId == process.env.PRICE_ID_BUSINESS_ANUAL)plan = 'Business'

    return new NextResponse(JSON.stringify({ plan }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
