"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { SendMessage, User } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Phone } from 'lucide-react';
import CallNotification from '@/components/CallNotification';
import VideoCall from '@/components/VideoCall';

const Chats: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const { onlineUsers, setSendMessage, setSelectedUser, selectedUser, allMessages, 
        setAllMessages, handleCall, ongoingCall } = useSocket();
    const searchParams = useSearchParams();
    const username: string | null = searchParams.get('username');
    const [selectedProfileClr, setSelectedProfileClr] = useState('');
    const [text, setText] = useState('');

    const colors = ['bg-blue-600', 'bg-red-500', 'bg-green-500', 'bg-yellow-;500', 'bg-purple-500', 'bg-brown-500'];

    useEffect(() => {
        // Load user from localStorage if available
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (savedUser.username && savedUser.userId) {
            setUser(savedUser);
        }
    }, []);

    // Function to get the first letter of the username
    const getInitial = (name: string | null): string => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const handleSendMsg = () => {

        if (!text.trim()) return;

        const NewMessage: SendMessage = {
            id: uuidv4(),
            text: text,
            fromSelf: user?.userId || '',
            recipientId: selectedUser?.socketId || ''
        };
        setAllMessages((prevMessages) => [...prevMessages, NewMessage]);
        setSendMessage(NewMessage);
        setText('');
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    return (
        <>
        <div className='flex w-[80%] h-screen m-auto overflow-hidden'>
            <div className='w-[400px] flex divide-y flex-col mt-4'>
                <div className='flex items-center justify-evenly'>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-2xl">
                        {getInitial(username)}
                    </div>
                    <h2 className='text-xl font-bold'>
                        {username}
                        {/* {username ? `Welcome, ${username}` : 'No username found'} */}
                    </h2>
                    <div className='font-bold border border-white px-2 py-1 rounded-md cursor-pointer'
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}>
                        Logout
                    </div>
                </div>
                {/* Online Users */}
                <div className='mt-4 pt-4'>
                    {onlineUsers?.map((onlineUser, index) => {
                        const colorClass = colors[index % colors.length];
                        if (onlineUser.userId === user?.userId) return null;
                        return (
                            <div key={onlineUser.userId} className='flex mb-4 w-full items-center px-4 justify-between'
                                onClick={() => {
                                    setSelectedUser(onlineUser);
                                    setSelectedProfileClr(colorClass);
                                }}
                            >
                                <div className='flex items-center'>
                                    <div className={`flex items-center justify-center w-9 h-9 rounded-full ${colorClass} text-white text-xl`}>
                                        {getInitial(onlineUser.username)}
                                    </div>
                                    <h2 className='text-[18px] ml-4 font-medium'>
                                        {onlineUser.username}
                                    </h2>
                                </div>
                                <div className='w-[8px] h-[8px] rounded-full bg-green-500'></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='w-full p-4 h-full flex flex-col'>
                {selectedUser !== null && (
                    <>
                        <div className='flex items-center w-full justify-between'>
                            <div className='flex items-center'>
                            <div className={`flex items-center justify-center w-9 h-9 rounded-full ${selectedProfileClr} text-white text-xl`}>
                                {getInitial(selectedUser.username)}
                            </div>
                            <h2 className='text-[18px] ml-4 font-medium'>
                                {selectedUser.username}
                            </h2>
                            </div>
                            <div className='flex cursor-pointer' onClick={() => handleCall(selectedUser)}>
                            <Phone />
                            </div>
                        </div>
                        <div className='flex-grow p-4 rounded mt-4 overflow-y-auto'>
                            {allMessages.map(message => (
                                <div className={`flex ${message.fromSelf === user?.userId ? 'justify-end' : 'justify-start'} my-2`} key={message.id}>
                                    <p className={`max-w-[70%] p-3 rounded-lg text-white ${message.fromSelf  === user?.userId ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}>{message.text}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className='h-[60px] gap-x-4 flex items-center w-full'>
                            <input type="text" placeholder='Chat....'
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                className='h-[40px] pl-4 w-[80%] text-black rounded outline-none'
                            />
                            <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                onClick={() => handleSendMsg()}>
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        <CallNotification />
        <VideoCall />
        </div>
        </>
    );
};

export default Chats;
