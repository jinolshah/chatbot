import clientPromise from '@/app/utils/MongoClient';

async function handler(req) {
  if (req.method === 'DELETE') {
    try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('messages');
    
    const data = await req.json();

    const result = await collection.deleteMany({ user: data.byUser });

    return Response.json({ success: true, deletedCount: result.deletedCount }, { status: 200 });
    } catch (error) {
        console.error(error.message);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
  } else {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
}

export { handler as DELETE };