import { getOrdersByOrderId } from '../../ordersController';

import { formatResponse, handleRateLimit, IResponse } from '../../utils';

// // GET all _1_template_
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // Extract orderId from the URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const orderId = pathParts.pop(); // Get the last element, which should be the orderId

    // Validate orderId (basic check)
    if (!orderId || !/^\d+$/.test(orderId)) {
      // Check if orderId exists and is numeric
      return formatResponse(null, 'Invalid orderId', 400);
    }

    // If the path matches /api/v1/orders/receipt/{orderId}
    if (pathParts.slice(-2).join('/') === 'receipt') {
      const result: IResponse = await getOrdersByOrderId(req);
      return formatResponse(result.data, result.message, result.status);
    } else if (!isNaN(Number(orderId))) {
      const result: IResponse = await getOrdersByOrderId(req);
      return formatResponse(result.data, result.message, result.status);
    } else {
      // Fallback if no specific endpoint matches
      return formatResponse(null, 'Not Found', 404);
    }
  } catch (error: unknown) {
    console.error('Error processing request:', error);

    const err = error as { keyValue?: Record<string, unknown> };
    return formatResponse(null, `Internal Server Error: ${JSON.stringify(err.keyValue)}`, 500);
  }
}
