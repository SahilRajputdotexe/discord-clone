"use client";

import {CreateServerModal} from '@/components/modals/create-server-modal';
import { useEffect, useState } from 'react';
import { InviteModal } from '@/components/modals/invite-modal';

export const ModalProvider = () => {

    const[isMounted,setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log("ModalProvider");

    },[]);

    if(!isMounted){
        return null; 
    }
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        </>
    )
};