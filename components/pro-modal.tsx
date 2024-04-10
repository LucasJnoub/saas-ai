"use client"
import React from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter} from './ui/dialog'
import { useProModal } from '@/hooks/user-pro-modal'
import { Badge } from './ui/badge';
import { tools } from '@/app/(dashboard)/(routes)/dashboard/page'
import { ArrowRight, Check, CodeIcon, Image, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
export default function ProModal() {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className="flex items-center gap-x-2 py-1">
            Upgrade to Genius
            <Badge variant={'premium'} className='uppercase text-sm py-1'>Pro</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>  
        {tools.map((tool)=>(
          <Card
          key={tool.label}
          className='p-3 border-black/5 flex items-center justify-between'
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn('w-6 h-6',tool.color)}/>
              </div>

              <div className="font-semibold text-sm">
                {tool.label}
              </div>
            </div>
              <Check className='text-primary w-5 h-5'/>
          </Card>
        ))}
        </DialogDescription>

        <DialogFooter>
          <Button 
           size={"lg"}
           variant={"premium"}
          className='w-full'
           >
            
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white'/>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
