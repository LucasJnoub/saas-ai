import NavBar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = (await getApiLimitCount()) || 0;
  const isPro = await checkSubscription();
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}></Sidebar>
        </div>
        <main className="md:pl-72 pb-10">
          <NavBar></NavBar>
          {children}
        </main>
      </div>
    </>
  );
}
