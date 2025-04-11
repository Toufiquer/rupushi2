import {
  get_1_template_,
  createOrders,
  updateOrders,
  deleteOrders,
  getOrdersById,
  bulkUpdate_1_template_,
  bulkDelete_1_template_,
} from './ordersController';

import { formatResponse, handleRateLimit, IResponse } from './utils';

// GET all _1_template_
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getOrdersById(req) : await get_1_template_(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE Orders
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await createOrders(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE Orders
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdate_1_template_(req) : await updateOrders(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE Orders
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDelete_1_template_(req) : await deleteOrders(req);

  return formatResponse(result.data, result.message, result.status);
}
