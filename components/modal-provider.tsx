"use client"
import React, { useEffect, useState } from 'react'
import ProModal from './pro-modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }
  return (
    <div>
      <ProModal/>
    </div>
  )
}
