import { message } from 'antd';

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';


export async function handleNoteStatusChange(pticket_number, pnote_status) {
  const updatedTicket = { ticket_number: pticket_number, note_status: pnote_status };
  
  try {
    const response = await fetch(`${baseUrl}/api/update_ticket`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTicket),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Network response was not ok');
    }
  
    const data = await response.json();
    // console.log('Update Response:', data);
    message.success('Updated successfully!');
  } catch (error) {
    // console.error('Update failed:', error);
    message.error(`Failed: ${error.message}`);
  }
};