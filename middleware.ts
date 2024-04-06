import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if(auth.userId && auth.isPublicRoute){
    const dashboard = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboard);
    }

  }
});



export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};  