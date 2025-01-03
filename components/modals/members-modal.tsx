"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
}from '@/components/ui/dialog'

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfile } from '@/types';
import { ScrollArea } from '../ui/scroll-area';
import { UserAvatar } from '../user-avatar';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
  "OWNER":<ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
};

export const MembersModal = () => {
  const {onOpen, isOpen ,onClose ,type, data}=useModal();

  const isModalOpen = isOpen && type === "members";
  const {server}=data as {server:ServerWithMembersWithProfile};  


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-center text-2xl font-bold text-zinc'>
              Manage  Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center justify-between px-6 py-4 border-b border-zinc-300">
              <div className="flex items-center space-x-4">
                <UserAvatar src={member.profile.imageUrl}/>
                <div className="flex flex-col gap-y-1">
                  <div className="text-sm font-semibold items-center gap-x-1 text-zinc-500 flex flex-row">
                    {member.profile?.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {member.profile?.email}
                  </p>
                </div>
              </div>
              <button className="text-xs text-zinc-500">Remove</button>
            </div>
            
          ))}

        </ScrollArea>  
      </DialogContent>

    </Dialog>
  )
}