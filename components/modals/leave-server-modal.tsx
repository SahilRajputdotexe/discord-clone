"use client";


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
}from '@/components/ui/dialog'//TODO : add this to the dialog component

import { useModal } from "@/hooks/use-modal-store";
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

 


export const LeaveServerModal = () => {
  const { isOpen ,onClose ,type, data}=useModal();

  const router=useRouter();
  const isModalOpen = isOpen && type === "leaveServer";
  const {server}=data;  


  const[isLoading,setIsLoading] = useState(false);

  const handleLeaveServer = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/servers/${server?.id}/leave`);


      onClose();

      router.refresh();
      router.push("/");

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }



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
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className="flex  items-center justify-between w-full"> 

          <Button disabled={isLoading}
            onClick={onClose}
            variant="ghost">
            
            Cancel
          </Button>
          <Button disabled={isLoading}
          onClick={handleLeaveServer}
          variant="primary">
            Leave Server
          </Button>
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}