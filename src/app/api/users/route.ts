import { ObjectId } from 'mongodb';
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
  req: NextApiRequest & { json: () => { id: string; user: any } },
  res: NextApiResponse,
) {
  const updateUser = await req.json();
  console.log('updateUser.id ', updateUser.id);
  console.log('updateUser.user ', updateUser.user);
  // ! ----------------------------
  await client.connect();
  // Access the database and collection
  const database = client.db('db_users');
  const collection = database.collection('users_collection');
  // Specify the document to update using its _id
  const id = updateUser.id; // Replace with the actual _id value
  console.log('--id ', id);
  const filter = { _id: new ObjectId(id) };
  // Define the update operation
  const updateDocument = {
    $set: {
      user: updateUser.user, // Replace with the actual field and value to update
    },
  };
  // Perform the update
  const result = await collection.updateOne(filter, updateDocument);
  console.log(
    `***  ---  ${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  );
  // ! ----------------------------

  return new Response(
    JSON.stringify({
      data: updateUser,
      result: updateUser,
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

export async function DELETE(
  req: NextApiRequest & { json: () => { id: string } },
  res: NextApiResponse,
) {
  const updateUser = await req.json();
  await client.connect();
  // Access the database and collection
  const database = client.db('db_users');
  const collection = database.collection('users_collection');
  // Delete a single document
  const id = updateUser.id; // Replace with the actual _id value
  console.log('--id ', id);
  const filter = { _id: new ObjectId(id) };
  const deleteOneResult = await collection.deleteOne(filter);
  console.log(`Deleted ${deleteOneResult.deletedCount} document(s)`);
  return new Response(
    JSON.stringify({
      data: updateUser,
      result: deleteOneResult,
      message: 'Patch request successful invoke',
    }),
  );
}
