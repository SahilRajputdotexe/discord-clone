"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useEffect } from "react";

//import styles from '@uploadthing/react/styles.css'


interface FileUploadProps {
    
    
    onChange:(url?:string)=>void;
    value:string
    endpoint: "messageFile"|"serverImage";
}

export const FileUpload = (
    {onChange,value,endpoint}:FileUploadProps
) => {

    useEffect((): void => {
        const loadStyles = async () => {
          try {
            await import('@uploadthing/react/styles.css');
          } catch (err) {
            console.error('Failed to load UploadThing styles', err);
          }
        };
    
        loadStyles();
    
        // Optional: If you want to clean up the styles after the component unmounts
        return async () => {
          const styleSheet = document.querySelector(`link[href*="uploadthing/react/styles.css"]`);
          console.log('styleSheet', styleSheet);
          if (!styleSheet) {
            console.log('Removing UploadThing styles');
            
            await import('../app/globals.css');
          }
        };
      }, []);
   

    const fileType=value?.split('.').pop();

    if(value && fileType!="pdf"){
        return(
            <div className="relative h-20 w-20">
                <Image
                fill
                src={value}
                alt="Upload"
                className="rounded-full"/>
                <button
                onClick={()=>onChange("")}
                className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        );
    }


    return (
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res)=>{
            onChange(res?.[0].url);
        }}
        />
    );
}