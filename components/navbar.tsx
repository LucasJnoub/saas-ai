import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './mobile-sidebar'
export default function NavBar() {
  return (
    <div className='flex items-center p-4'>
      <MobileSideBar></MobileSideBar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl='/'></UserButton>
      </div>
    </div>
  )
}
