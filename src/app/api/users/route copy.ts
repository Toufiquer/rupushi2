import type { NextApiRequest, NextApiResponse } from 'next';

type responseApiType = {
  data: {
    headers: { pageNo: number; limit: number; totalData: number };
    body: any[];
  };
  status: number;
  message: string;
};

const responseJson = (status: number, method: string, data: any): responseApiType => ({
  data,
  status,
  message: `${method} request successful invoke`,
});

interface ParsedUrl {
  page?: number;
  limit?: number;
  s?: string;
  basePath: string;
}

const parseUrl = (url: string): ParsedUrl => {
  const parsedUrl = new URL(url);
  const params: Record<string, string | number> = {};
  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  let result: ParsedUrl = {
    page: +params.page,
    limit: +params.limit,
    s: params.s + '',
    basePath: parsedUrl.pathname.split('/')[1],
  };
  return result;
};

/** Get api */
/** requestApi: {} */
/** responseApi: responseApiType */
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = parseUrl(req.url || '');
  return new Response(
    JSON.stringify(
      responseJson(200, 'GET', {
        headers: { pageNo: 1, limit: 1, totalData: 2 },
        body: ['Response Data', data],
      }),
    ),
  );
}

/** POST api */
/** requestApi: {body} */
/** responseApi: responseApiType */
export async function POST(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
  const data = await req.json();
  return new Response(
    JSON.stringify(
      responseJson(200, 'POST', {
        headers: { pageNo: 1, limit: 1, totalData: 2 },
        body: ['Response Data', data],
      }),
    ),
  );
}

/** PUT api */
/** requestApi: {body} */
/** responseApi: responseApiType */
/** it can change all data */
export async function PUT(
  req: NextApiRequest & { json: () => { id: string; data: any } },
  res: NextApiResponse,
) {
  const data = await req.json();
  return new Response(
    JSON.stringify(
      responseJson(200, 'PUT', {
        headers: { pageNo: 1, limit: 1, totalData: 2 },
        body: ['Response Data', data],
      }),
    ),
  );
}

/** PATCH api */
/** requestApi: {body} */
/** responseApi: responseApiType */
/** only change particular data not change all data  */
export async function PATCH(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
  const data = await req.json();
  return new Response(
    JSON.stringify(
      responseJson(200, 'PATCH', {
        headers: { pageNo: 1, limit: 1, totalData: 2 },
        body: ['Response Data', data],
      }),
    ),
  );
}

/** DELETE api */
/** requestApi: {} */
/** responseApi: responseApiType */
export async function DELETE(req: NextApiRequest & { json: () => void }, res: NextApiResponse) {
  return new Response(
    JSON.stringify(
      responseJson(200, 'DELETE', {
        headers: { pageNo: 1, limit: 1, totalData: 1 },
        body: ['Response Data'],
      }),
    ),
  );
}
