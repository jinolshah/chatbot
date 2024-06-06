import clientPromise from '@/app/utils/MongoClient';

async function handler(req) {
  if (req.method === 'POST') {
    try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('messages');
    
    const data = await req.json();

    const messages = await collection.find({ user: data.byUser }).sort({ createdAt: 1 }).toArray();

    const formattedMessages = messages.map(message => {
        return {
          content: message.content,
          role: message.author
        };
    });

    return Response.json({ formattedMessages }, { status: 200 });
    } catch (error) {
        console.error(error.message);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
  } else {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
}

export { handler as POST };