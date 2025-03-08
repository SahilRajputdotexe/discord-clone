"use client";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
}from '@/components/ui/dialog'

import { useModal } from "@/hooks/use-modal-store";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';
import { DialogDescription } from '@radix-ui/react-dialog';




export const LeaveServerModal = () => {
  const {onOpen, isOpen ,onClose ,type, data}=useModal();


  const isModalOpen = isOpen && type === "leaveServer";
  const {server}=data;  

  const[copied,setCopied] = useState(false);
  const[isLoading,setIsLoading] = useState(false);




  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-center text-2xl font-bold text-zinc'>
          Leave Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to leave <span className='font-semibold text-indigo-500'>{server?.name}</span> ?
          </DialogDescription>
          
        </DialogHeader>
        <div className="p-6">
          
        </div>
      </DialogContent>
    </Dialog>
  )
}