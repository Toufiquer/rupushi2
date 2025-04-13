import { get_1_template_, getOrdersByOrderId } from '../../ordersController';

import { formatResponse, handleRateLimit, IResponse } from '../../utils';

// GET all _1_template_
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getOrdersByOrderId(req) : await get_1_template_(req);
  return formatResponse(result.data, result.message, result.status);
}
