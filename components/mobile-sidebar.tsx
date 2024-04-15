"use client";
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetClose } from './ui/sheet';
import { SheetTrigger } from './ui/sheet';
import SideBar from './sidebar'; 

interface MobileSideBarProps{
  apiLimitCount:number
  isPro:boolean
}


export default function MobileSideBar({apiLimitCount = 0, isPro = false}: MobileSideBarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  return (
    <div>
      <Sheet>
        {isMounted && (
          <SheetTrigger>
            <Button variant={'ghost'} size={'icon'} className='md:hidden'>
              <Menu />
            </Button>
          </SheetTrigger>
        )}
        <SheetContent side={'left'} className='p-0' closeIconColor='white'>
          <SideBar  isPro={isPro} apiLimitCount={apiLimitCount}></SideBar>
        </SheetContent>
      </Sheet>
    </div>
  );
}