"use client"

import { ServerWithMembersWithProfile } from "@/types"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, TrashIcon, User, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

import { useState } from "react";



interface ServerHeaderProps{
    server:ServerWithMembersWithProfile;
    role?: MemberRole;
};

export const ServerHeader = ({
    server,
    role
}:ServerHeaderProps)=>{

    const {onOpen}=useModal();

    const[open,setOpen]=useState(false);


    const isAdmin = role === MemberRole.OWNER;
    const isModerator = role === MemberRole.MODERATOR || isAdmin;

    console.log(role, isModerator);
    
    return(
        <DropdownMenu open={open} onOpenChange={setOpen} > 
            <DropdownMenuTrigger className="focus:outline-none" asChild>

                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover: bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"> 
            {isModerator && (
                <DropdownMenuItem
                    onClick={()=>{onOpen("invite",{server});setOpen(false)}}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer "
                >
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            
            {isAdmin && (
                <DropdownMenuItem
                onClick={()=>{onOpen("editServer",{server});setOpen(false)}}
                    className="  px-3 py-2 text-sm cursor-pointer "
                >
                    Server Settings
                    <Settings className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem
                onClick={()=>{onOpen("members",{server});setOpen(false)}}
                    className="  px-3 py-2 text-sm cursor-pointer "
                >
                    Manage Members
                    <Users className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem
                    onClick={()=>{onOpen("createChannel",{server});setOpen(false)}}
                    className="  px-3 py-2 text-sm cursor-pointer "
                >
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator/>
            )}
            {isAdmin && (
                <DropdownMenuItem
                onClick={()=>onOpen("deleteServer",{server})}
                    className=" text-rose-500 px-3 py-2 text-sm cursor-pointer "
                >
                    Delete Server
                    <TrashIcon className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {!isAdmin && (
                <DropdownMenuItem
                onClick={()=>onOpen("leaveServer",{server})}
                    className=" text-rose-500 px-3 py-2 text-sm cursor-pointer "
                >
                    Leave Server
                    <LogOut className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}