import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit';
export default async function NavBar() {
  const apiLimitCount = (await getApiLimitCount()) || 0;
  return (
    <div className='flex items-center p-4'>
      <MobileSideBar apiLimitCount={apiLimitCount}></MobileSideBar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl='/'></UserButton>
      </div>
    </div>
  )
}
