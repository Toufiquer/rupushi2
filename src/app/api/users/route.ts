import { client } from '../lib/dbConnect';

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // ! ----------------------------
  await client.connect();
  const db = client.db('db_users');
  const collection = db.collection('users_collection');
  // Retrieve all documents
  const cursor = collection.find();
  // Print all documents
  const allDocs = await cursor.toArray();
  console.log(allDocs);

  // ! ----------------------------
  const data: string[] = allDocs;
  const result = { data, message: 'get request invoked successfully' };
  return new Response(JSON.stringify(result));
}

export async function POST(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
  // await dbConnect();
  console.log('post route hit');
  const resultData = (await req.json()) as unknown as { user: string };
  console.log('resultData ', resultData);
  // ! ----------------------------
  await client.connect();
  const db = client.db('db_users');
  const collection = db.collection('users_collection');
  const resultFromDB = await collection.insertOne(resultData);

  // ! ----------------------------
  console.log('post route hit result : ');
  return new Response(
    JSON.stringify({
      data: resultData,
      result: resultFromDB,
      message: 'Post request successful invoke',
    }),
  );
}

/* it can change all data */
export async function PUT(
  req: NextApiRequest & { json: () => { id: string; data: any } },
  res: NextApiResponse,
) {
  const result = await req.json();
  return new Response(
    JSON.stringify({
      data: result,
      result: result,
      message: 'Put request successful invoke',
    }),
  );
}

/*  only change particular data not change all data */
// export async function PATCH(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
//   await dbConnect();

//   const result = await req.json();

//   const rtk: IRtk = await Rtk.updateOne({ _id: result.id }, { name: result.title });
//   return new Response(
//     JSON.stringify({
//       data: result,
//       result: rtk,
//       message: 'Patch request successful invoke',
//     }),
//   );
// }

// export async function DELETE(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
//   await dbConnect();

//   const result = await req.json();
//   const rtk: IRtk = await Rtk.deleteOne({ _id: result.id });
//   return new Response(
//     JSON.stringify({
//       data: result,
//       result: rtk,
//       message: 'Patch request successful invoke',
//     }),
//   );
// }
