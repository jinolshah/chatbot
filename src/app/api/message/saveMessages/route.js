import clientPromise from '@/app/utils/MongoClient';

async function handler(req) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection('messages');
      
      const data = await req.json();

      const message = {
        content: data.content,
        author: data.role,
        user: data.byUser,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(message);
      return Response.json({ message: result}, { status: 201 })
    } catch (error) {
      console.log(error.message);
      return Response.json({ success: false, error: error.message }, { status: 400 });
    }
  } else {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
}

export {handler as POST}