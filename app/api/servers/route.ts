import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from "uuid";
import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request){
    try{
        const{name,ImageUrl}=await req.json();
        const profile=await currentProfile();

        if(!profile){
            return new NextResponse('Unauthorized',{status:401});
        }

        const server=await db.server.create({
            data:{
                name,
                
                profileId:profile.id,
                inviteCode:uuidv4(),
                channels:{
                    create:[
                        {
                            name:'general',
                            profileId:profile.id
                        }
                    ]
                },
                members:{
                    create:[
                        {
                            profileId:profile.id,
                            role:MemberRole.OWNER,
                            
                        }
                    ]
                },
                imageUrl:ImageUrl
            }
        });
        return NextResponse.json(server);
    }catch(e){
        console.error(e);
        return new NextResponse('Internal Server Error',{status:500});
    }
    
}