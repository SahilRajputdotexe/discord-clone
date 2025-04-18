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




export const InviteModal = () => {
  const {onOpen, isOpen ,onClose ,type, data}=useModal();
  const origin = useOrigin();


  const isModalOpen = isOpen && type === "invite";
  const {server}=data;  

  const[copied,setCopied] = useState(false);
  const[isLoading,setIsLoading] = useState(false);



  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const  onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  const onNew =async ()=>{
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite",{server:res.data});
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-center text-2xl font-bold text-zinc'>
              Invite Friends
          </DialogTitle>
          
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Invite Link</Label>


          <div className="flex items-center mt-2 gap-x-2 ">
            <Input
            disabled={isLoading}
            className="bg-zinc-300/50 bordr-0 focus-visible:ring-0 text-black focus-visible:ring-offsert-0"
            value={inviteUrl} 
            />
            <Button disabled={isLoading} onClick={onCopy} className="bg-zinc-500 text-white hover:bg-zinc-700" size="icon">
              {copied
              ?<Check className="w-4 h-4" />
              :<Copy className=" w-4 h-4"/>
              }
            </Button>

          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            variant={"link"}
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate New Link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}