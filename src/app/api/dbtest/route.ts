import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result = { header: 'header-data', message: 'get request invoked successfully' };
  return new Response(JSON.stringify(result));
}
