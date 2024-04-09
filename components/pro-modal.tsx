"use client"
import React from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle} from './ui/dialog'

export default function ProModal() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            Upgrade to Genius
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
