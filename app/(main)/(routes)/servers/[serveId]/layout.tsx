import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";
import { Server } from "lucide-react";
import { redirect } from "next/navigation";



const ServerIdLayout = async ({
    children,
    params,
}:{children:React.ReactNode;
    params:{
        serveId:string
    }

}) => {
    const profile= await currentProfile();
    if(!profile){
        return auth().redirectToSignIn();
    }
    const server= await db.server.findUnique({
        where:{
            id:params.serveId,
            members:{
                some:{
                    profileId:profile.id
                }

            }
        }
    })

    if(!server){
        return redirect("/");
    }

    return ( 
    <div className="h-full">
        <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            <ServerSidebar serverId ={params.serveId}/>
        </div>
        <main className="h-full md:pl-60">
            {children}

        </main>
    </div> );
}
 
export default ServerIdLayout;