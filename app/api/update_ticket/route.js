import { getServerSession } from "next-auth/next"
import options from '@/app/api/auth/[...nextauth]/options';
import OperationDB from "@/utils/db-connection";

export async function PUT(req) {
  const session = await getServerSession(options);

  if (!session) {
    return Response.json({ message: "You don't have the authorization!" }, { status: 403 });
  }

  const body = await req.json();
  const { ticket_number, note_status, remarks } = body;


  if (!ticket_number) {
    return Response.json({ message: "Ticket number are required!" }, { status: 400 });
  }
  if (!note_status) {
    return Response.json({ message: "Status are required!" }, { status: 400 });
  }


  const queryStr = `CALL update_ticket('${ticket_number}', '${note_status}', '${remarks}');`; 

  try {
    const conn = await OperationDB('dboperation').getConnection();

    return conn.query(queryStr)
      .then(result => {
        conn.close();
        return new Response(JSON.stringify({
          message: "Ticket updated successfully!",
          status: 200
        }), { status: 200 });
      })
      .catch(error => {
        console.error('Error querying database:', error);
        return new Response(JSON.stringify({
          message: "Error updating ticket.",
          error: error.message,
        }), { status: 500 });
      });
  } catch (error) {
    console.error('Error connecting to database:', error);
    return new Response(JSON.stringify({
      message: "Database connection error.",
      error: error.message,
    }), { status: 500 });
  }
}
