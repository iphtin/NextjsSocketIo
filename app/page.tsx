"use client";

import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [username, setUsername] = useState('');

  console.log(uuidv4());
  const handleSaveUser = () => {
    if (username) {
        const newUserId = uuidv4(); // Generate a new userId
        const user = { username, userId: newUserId };

        // Store user object in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        console.log('User saved:', user);
    }
};
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-[400px] sm:items-start">
      <input type="text" placeholder="username" 
      onChange={e => setUsername(e.target.value)}
      className="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white outline-none" required />
      <Link href={username !== '' ? `/chats?username=${username}` : '/'} onClick={handleSaveUser} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Sign Me
      </Link>
      </main>
    </div>
  );
}
