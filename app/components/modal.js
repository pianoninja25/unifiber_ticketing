'use client'
import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { handleNoteStatusChange } from '@/utils/ticket-update'

const TicketModal = ({ isModalVisible, setIsModalVisible, selectedTicket, setTicketChange }) => {

  const datax = {
  'Ticket Number': selectedTicket?.ticket_number,
  'Customer Name': selectedTicket?.customer_name,
  'City': selectedTicket?.kota,
  'Ward': selectedTicket?.kelurahan,
  'Address': selectedTicket?.address_install,
  'Mobile Number': selectedTicket?.mobile_number,
  'Vendor': selectedTicket?.company,
  'Current Status': selectedTicket?.note_status
};

  const [noteStatus, setNoteStatus] = useState(''); 
  const [tempStatus, setTempStatus] = useState(noteStatus);
  
  const [remarks, setRemarks] = useState(''); 
  const [tempRemarks, setTempRemarks] = useState(remarks);

  
  const handleStatusChange = (newStatus) => {
    setTempStatus(newStatus);
  };

  const handleRemarksChange = (newRemarks) => {
    setTempRemarks(newRemarks.target.value);
  };

  const handleOk = () => {
    setNoteStatus(tempStatus);
    setRemarks(tempRemarks);
    setTicketChange(tempStatus);
    handleNoteStatusChange(selectedTicket.ticket_number, tempStatus, tempRemarks);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Ticket Details"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={900}
    >

      <div className='flex justify-around items-center px-4 py-10'>
        {selectedTicket && (
          <table>
            <tbody className='font-quicksand text-xs'>
              {Object.entries(datax).map(([key, value]) => (
                <tr key={key} className="">
                  <td className="text-right px-4 py-1 font-bold border border-slate-200 bg-slate-100">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </td>
                  <td className="w-60 border border-slate-200">
                    <input type="text" placeholder="Alamat" value={value} readOnly className='w-full px-2 py-1' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          // <div>
          //   <p>Ticket Number: {selectedTicket.ticket_number}</p>
          //   <p>Customer Name: {selectedTicket.customer_name}</p>
          //   <p>City: {selectedTicket.kota}</p>
          //   <p>Kelurahan: {selectedTicket.kelurahan}</p>
          //   <p>Alamat: <input type="text" placeholder="Alamat" value={selectedTicket.address_install} readOnly className='px-2 py-0.5 border border-slate-400 bg-slate-200 rounded-md' /></p>
          //   <p>Status: {selectedTicket.note_status}</p>

            
          // </div>



        )}

        <div className='font-quicksand text-xs'>
          <div>
            <p className='font-bold pb-1'>Change Status</p>
            <Select
              placeholder={selectedTicket?.note_status}
              onChange={handleStatusChange}
              style={{ width: 200 }}
              className='text-xs'
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Reschedule">Reschedule</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>

          </div>

          <div>
            <p className='font-bold mt-4 pb-1'>Remarks</p>
            <textarea
              onChange={handleRemarksChange}
              value={selectedTicket?.remarks || ''} 
              className='w-96 h-40 rounded-md bg-white border p-2 resize-none overflow-auto'
              placeholder='Enter your remarks here...'
            ></textarea>

          </div>
        </div>

      </div>


    </Modal>
  );
};

export default TicketModal;
