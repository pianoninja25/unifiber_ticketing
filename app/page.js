'use client'

import { signOut, useSession } from 'next-auth/react'
import { Image } from 'antd'
import { IoLogOut } from "react-icons/io5"
import TroubleTicket from './trouble_ticket/page'


const Home = () => {
  const { data: session, status} = useSession()
  

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  };


  return (
    <div className='min-h-screen p-6 font-quicksand bg-slate-100'>
      <div className='px-4'>
        <p>{getGreeting()}</p>
        <p className='text-xl font-bold'>{session?.user.name}</p>

      </div>

      {session && <TroubleTicket user={session?.user.name}/>}



      <div className='absolute top-6 right-6 flex gap-6'>
        <Image 
          src={`/unifiber-text.svg`} 
          width={100} 
          alt="unifiber" 
          // className='drop-shadow-sm' 
          preview={false}
        />
        
        <button 
          onClick={() => signOut()} 
          className='flex items-center justify-around gap-2 w-fit h-fit p-2 px-3 text-sm text-white rounded-md shadow-sm bg-amtorange/80 hover:bg-amtorange'
        >
          Logout 
          <IoLogOut size={20} />
        </button>

      </div>
    </div>
  )
}

export default Home