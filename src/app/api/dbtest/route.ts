import dbConnect from '../lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const result = { header: 'header-data', message: 'get request invoked successfully' };
  return new Response(JSON.stringify(result));
}
