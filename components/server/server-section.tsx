"use client";

import { ServerWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../actions-tooltip";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps { 
    label:string;
    role?:MemberRole;
    sectionType:"channel"|"members";
    ChannelType?:ChannelType;
    server?:ServerWithMembersWithProfile;
}


export const ServerSection = ({
    label,role,sectionType,ChannelType,server
}:ServerSectionProps) => {

    const {onOpen}=useModal();
    return (
        <div className="flex items-center justify-between py-2"> 
            <p className=" text-sm font-semibold text-gray-500 dark:text-zinc-400">    
                {label}
            </p>
            {role!=MemberRole.GUEST && sectionType=="channel" && (
                <ActionTooltip label="Create channel" side="top">
                    <button
                     className="text-zinc-500 hover:text-zinc-400 dark:text-zinc-600 dark:hover:text-zin-300 transition"
                     onClick={()=>onOpen("createChannel")}
                    >
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}