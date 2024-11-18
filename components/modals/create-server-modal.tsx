"use client";

import axios from "axios";
import * as z from "zod";
import{zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';



import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { FileUpload } from "@/components/file-upload";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ModeToggle } from "../mode-toggle";



const FormSchema = z.object({
  name:z.string().min(1,{message:'Name is required'}),
  ImageUrl:z.string().url({message:'Invalid URL'}),});

export const CreateServerModal = () => {
  const { isOpen ,onClose ,type}=useModal();
  const router= useRouter();  

  

  const isModalOpen = isOpen && type === "createServer";
    
  
  const form =useForm ({
    resolver:zodResolver(FormSchema),
    defaultValues: {
      name: '',
      ImageUrl: '',
    }
  });
  
  const isLoading = form.formState.isSubmitting;
  const onSubmit =async(values:z.infer<typeof FormSchema>) => {
    try{
      await axios.post("/api/servers ",values);
      
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
                Customise Your Server
            </DialogTitle>
            <DialogDescription className='text-center  text-zinc-500'>
                Add a name and description to your server
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField
                  control={form.control}
                  name="ImageUrl"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                         <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                        /> 
                       
                        
                        {/* //TODO: fix vanishing sidebad due to this */}
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                <FormField 
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel
                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Server Name"
                      {...field}/>
                      
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
              </div>
              <DialogFooter className="px-6 py-4 bg-gray-100">
                <Button
                variant="primary"
                disabled={isLoading}>
                  Create Server
                </Button>
              </DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
}