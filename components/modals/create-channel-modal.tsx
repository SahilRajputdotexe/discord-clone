"use client";

import axios from "axios";
import * as z from "zod";
import{zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';



import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
}from '@/components/ui/dialog'
import{
Form,
FormField,
FormItem,
FormLabel,
FormMessage,
FormControl,
}from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button' 

import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";

import qs from "query-string"
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";




const FormSchema = z.object({
  name:z.string().min(1,{message:'Channel name is required'}).refine(name=>name!=="general",{message:'Channel name cannot be "general"'}),
  type:z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen ,onClose ,type}=useModal();
  const router= useRouter();  
  const params=useParams();

  

  const isModalOpen = isOpen && type === "createChannel";
    
  
  const form =useForm ({
    resolver:zodResolver(FormSchema),
    defaultValues: {
      name: '',
      type: ChannelType.TEXT,
    }
  });
  
  const isLoading = form.formState.isSubmitting;
  const onSubmit =async(values:z.infer<typeof FormSchema>) => {
    try{
      console.log("serverid",params?.serveId);
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serveId,
        },
      });
      console.log(url);
      await axios.post(url,values);
      
      form.reset();
      router.refresh();
      onClose();
    }catch(error){
      console.error(error);
    }
  }
  
  const handleClose=()=>{
    form.reset();
    onClose();
  }
  
  console.log(isModalOpen);

    return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-8 px-6'>
            <DialogTitle className='text-center text-2xl font-bold text-zinc'>
                Create Channel
            </DialogTitle>
            
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField 
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel
                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Channel Name"
                      {...field}/>
                      
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 capitalize outline-none"
                        >
                          <SelectValue placeholder="Select a Channel Type"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {type.toLocaleLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              </div>
              <DialogFooter className="px-6 py-4 bg-gray-100">
                <Button
                variant="primary"
                disabled={isLoading}>
                  Create Channel 
                </Button>
              </DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
}