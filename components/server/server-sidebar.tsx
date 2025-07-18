import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";

interface ServerSidebarProps {
     serverId: string;   
}

const iconMap={
    [ChannelType.TEXT]:<Hash className="mr-2 h-4 w-4"/>,   
    [ChannelType.VIDEO]:<Video className="mr-2 h-4 w-4"/>,   
    [ChannelType.VOICE]:<Mic className="mr-2 h-4 w-4"/>
}

const roleIconMap={
    [MemberRole.OWNER]:<ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>,
    [MemberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
    [MemberRole.GUEST]:null
}

export const ServerSidebar = async({
    serverId
}:ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile){
        redirect("/");
    }

    const server =await db.server.findUnique({
        where:{
            id:serverId  
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:'asc'
                },
            },
            members:{
                include:{
                    profile:true
                },
                orderBy :{
                    role:'asc'
                }
                
            },

        }


    });


    const textChannels= server?.channels.filter((channel)=>channel.role === ChannelType.TEXT);
    const audioChannels= server?.channels.filter((channel)=>channel.role === ChannelType.VOICE);
    const videoChannels= server?.channels.filter((channel)=>channel.role === ChannelType.VIDEO);

    const members= server?.members.filter((member)=>member.profileId !== profile.id);

    if(!server){
        return redirect("/");
    }

    const role= server.members.find((member)=>member.profileId === profile.id)?.role;



    return(
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
            server={server}
            role={role}
            />      
            <ScrollArea className="flex flex-col px-3">
                <div className="mt-2">
                <ServerSearch
                data ={[
                    {
                        label:"Text Channels",
                        type:"channel",
                        data:textChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name, 
                            icon: iconMap[channel.role],
                        }))
                    },
                    {
                        label:"Voice Channels",
                        type:"channel",
                        data:audioChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name, 
                            icon: iconMap[channel.role],
                        }))
                    },
                    {
                        label:"Video Channels",
                        type:"channel",
                        data:videoChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name, 
                            icon: iconMap[channel.role],
                        }))
                    },
                    {
                        label:"Members",
                        type:"member",
                        data:members?.map((member)=>({
                            id: member.id,
                            name:member.profile.name, 
                            icon: roleIconMap[member.role],
                        }))
                    },
                ]}
                />

                </div>  
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channel" ChannelType={ChannelType.TEXT} role={role} label="Text Channel"/>
                    </div>
                )}
            </ScrollArea> 
        </div>
    );
}