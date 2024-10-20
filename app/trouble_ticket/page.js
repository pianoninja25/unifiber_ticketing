'use client'

import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { FaDownload } from "react-icons/fa6";

import TicketTable from '../components/table'


const TroubleTicket = ({ user }) => {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(true)
  const [ticketChange, setTicketChange] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`/api/trouble_ticket?user=${user}`)
        const data = await res.json()
        setDatas(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user, ticketChange])


  return (
    <div className=' flex flex-col items-center w-full p-4'>
      {/* <h1 className='self-start mx-8 p-2 pb-12 text-xl font-quicksand font-bold'>Trouble Ticket</h1> */}
      <div className='grid justify-center w-full mt-4 rounded-lg shadow-lg bg-white'>
        <div className={`${loading ? 'loading' : ''}`}/>
        <div className={`w-full px-4 pt-4 overflow-hidden ${loading ? 'hidden' : 'block'}`}>
          <TicketTable datas={datas.data} setTicketChange={setTicketChange} />
        </div>
      </div>


      {!loading && <CSVLink 
        data={datas.data}
        filename={`TEST ${user}.csv`}
        className="absolute right-12 top-28 flex items-center gap-2 px-3 py-1 m-2 rounded-lg shadow-sm bg-green-500/20 hover:bg-green-500/80"
      >
        <h1 className="font-poppins text-sm text-white">Download</h1>
        <FaDownload size={12} color="white" />
      </CSVLink>}


      <footer className='fixed w-full bottom-0 p-4 text-xs text-center font-quicksand'>
        <p>© {new Date().getFullYear()} <span className='text-amtorange font-bold'>IT Unifiber</span> - All rights reserved.</p>
      </footer>

      
      
    </div>
  )
}

export default TroubleTicket