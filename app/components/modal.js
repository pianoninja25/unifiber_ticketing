'use client'
import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { handleNoteStatusChange } from '@/utils/ticket-update'

const TicketModal = ({ isModalVisible, setIsModalVisible, selectedTicket, setTicketChange }) => {

  const [noteStatus, setNoteStatus] = useState(''); 
  const [tempStatus, setTempStatus] = useState(noteStatus);

  
  const handleStatusChange = (newStatus) => {
    setTempStatus(newStatus);  // Set temporary status on change
  };

  const handleOk = () => {
    setNoteStatus(tempStatus);
    setTicketChange(tempStatus);
    handleNoteStatusChange(selectedTicket.ticket_number, tempStatus);
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

      <div className='flex gap-10 px-4 py-10'>
        {selectedTicket && (
          <div>
            <p>Ticket Number: {selectedTicket.ticket_number}</p>
            <p>Customer Name: {selectedTicket.customer_name}</p>
            <p>City: {selectedTicket.kota}</p>
            <p>Kelurahan: {selectedTicket.kelurahan}</p>
            <p>Alamat: {selectedTicket.address_install}</p>
            <p>Status: {selectedTicket.note_status}</p>
          </div>
        )}

        <div className=''>
          <div className='w-96 bg-black/10'>
            test
          </div>
          <Select
            // value={selectedTicket?.note_status}  // Use temporary status here
            onChange={handleStatusChange}
            style={{ width: 200 }}
            placeholder="Select status"
          >
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Reschedule">Reschedule</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>
        </div>

      </div>


    </Modal>
  );
};

export default TicketModal;
