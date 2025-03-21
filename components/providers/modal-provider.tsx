"use client";

import {CreateServerModal} from '@/components/modals/create-server-modal';
import { useEffect, useState } from 'react';
import { InviteModal } from '@/components/modals/invite-modal';
import { EditServerModal } from '../modals/edit-server-modal';
import { MembersModal } from '../modals/members-modal';
import { CreateChannelModal } from '../modals/create-channel-modal';
import { LeaveServerModal } from '../modals/leave-server-modal';
import { DeleteServerModal } from '../modals/delete-server-modal';

export const ModalProvider = () => {

    const[isMounted,setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log("ModalProvider");

    },[]);

    if(!isMounted){
        console.log("isNotMounted")
        return null; 
    }
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
        <MembersModal/>
        <CreateChannelModal/>
        <LeaveServerModal/>
        <DeleteServerModal/>
        </>
    )
};