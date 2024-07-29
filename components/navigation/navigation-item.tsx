"use client";

import Image from "next/image";
import {useParams, useRouter} from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../actions-tooltip";


interface NavigationItemProps{
    name: string;
    imageUrl: string;
    id: string;
};

export const NavigationItem=({
    id,
    imageUrl,
    name
}:NavigationItemProps)=>{
    const params=useParams();
    const router=useRouter();

    const onClick=()=>{
        console.log(params);

        router.push(`/servers/${id}`);
    }
    
    return (
        <ActionTooltip label={name} side="right" align="center">
            <button
            onClick={onClick}
            className="group relative flex items-center">
                <div className={cn(
                    "absolute  bg-primary rounded-r-full transition-all left-0 w-[4px]",
                    params?.serveId!==id && "group-hover:h-[20px]",//TODO: figure out why this is serveId not serverId
                    params?.serveId===id ? "h-[36px]":"h-[8px]"
                )}/>
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serveId===id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={imageUrl} alt="Channel"/>

                </div>
            </button>
        </ActionTooltip>
    )
}