"use client";

import { Phone, PhoneOff } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import React from 'react';

const CallNotification = () => {
  const { ongoingCall, handleJoinCall, handleHangup } = useSocket();
  if (!ongoingCall?.isRinging) return;

  const getInitial = (name: string | null): string => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  if (!ongoingCall?.isRinging) return;

  return (
    <div className='w-[100%] h-full absolute top-0 left-0 z-30 flex flex-col items-center justify-center bg-purple/10'>
      <div className="flex flex-col justify-center bg-white py-2 px-3 w-[300px] rounded items-center gap-4">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-slate-500 to-slate-800 text-white text-xl`}>
          {getInitial(ongoingCall.partcipants.caller.username)}
        </div>
        <div className='flex flex-col items-center text-center justify-center w-full'>
          <h2 className='text-[18px] text-black font-bold'>
            {ongoingCall.partcipants.caller.username}
          </h2>
          <p className='text-gray-500 text-[14px]'>Incoming Call</p>
        </div>
        <div className='flex justify-evenly w-full'>
          <button onClick={() => handleJoinCall(ongoingCall)} className='p-4 bg-green-500 text-white rounded-full'><Phone /></button>
          <button onClick={() => handleHangup({ ongoingCall: ongoingCall ? ongoingCall : undefined, isEmitHandup: true })} className='p-4 bg-red-500 text-white rounded-full'><PhoneOff /></button>
        </div>
      </div>
    </div>
  )
}

export default CallNotification;