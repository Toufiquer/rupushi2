// import Orders from './ordersModel';
import Orders from '@/app/api/orders/orderModel';
import connectDB from '@/lib/mongoose';
import { IResponse } from '@/app/api/v1/orders/utils';

// Helper to handle database connection and errors
async function withDB(handler: () => Promise<IResponse>): Promise<IResponse> {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error(error);
    return { data: null, message: (error as Error).message, status: 400 };
  }
}

// Helper to format responses
const formatResponse = (data: unknown, message: string, status: number) => ({
  data,
  message,
  status,
});

// CREATE Orders
export async function createOrders(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const _4_template_Data = await req.json();
      const newOrders = await Orders.create({ ..._4_template_Data });
      return formatResponse(newOrders, 'Orders created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single Orders by OrderId
export async function getOrdersByOrderId(req: Request) {
  return withDB(async () => {
    const orderId = new URL(req.url).searchParams.get('OrderId');
    if (!orderId) return formatResponse(null, 'orderId is required', 400);
    const result = await Orders.findOne({ orderId: Number(orderId) });
    if (!result) return formatResponse(null, 'Order not found', 404);
    return formatResponse(result, 'Order fetched successfully', 200);
  });
}

// GET single Orders by ID
export async function getOrdersById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'Orders ID is required', 400);

    const _4_template_ = await Orders.findById(id);
    if (!_4_template_) return formatResponse(null, 'Orders not found', 404);

    return formatResponse(_4_template_, 'Orders fetched successfully', 200);
  });
}

// GET all _1_template_ with pagination
export async function get_1_template_(req: Request) {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const _2_template_ = await Orders.find({})
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total_1_template_ = await Orders.countDocuments();
    return formatResponse(
      { _2_template_: _2_template_ || [], total: total_1_template_, page, limit },
      '_1_template_ fetched successfully',
      200,
    );
  });
}

// UPDATE single Orders by ID

export async function updateOrders(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updatedOrders = await Orders.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedOrders) return formatResponse(null, 'Orders not found', 404);
      return formatResponse(updatedOrders, 'Orders updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE _1_template_
export async function bulkUpdate_1_template_(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        Orders.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => (r as PromiseFulfilledResult<typeof Orders>).value);
    const failedUpdates = results
      .filter(r => r.status === 'rejected' || !r.value)
      .map((_, i) => updates[i].id);

    return formatResponse(
      { updated: successfulUpdates, failed: failedUpdates },
      'Bulk update completed',
      200,
    );
  });
}

// DELETE single Orders by ID
export async function deleteOrders(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deletedOrders = await Orders.findByIdAndDelete(id);
    if (!deletedOrders) return formatResponse(deletedOrders, 'Orders not found', 404);
    return formatResponse({ deletedCount: 1 }, 'Orders deleted successfully', 200);
  });
}

// BULK DELETE _1_template_
export async function bulkDelete_1_template_(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const _4_template_ = await Orders.findById(id);
        if (_4_template_) {
          const deletedOrders = await Orders.findByIdAndDelete(id);
          if (deletedOrders) deletedIds.push(id);
        } else {
          invalidIds.push(id);
        }
      } catch {
        invalidIds.push(id);
      }
    }

    return formatResponse(
      { deleted: deletedIds.length, deletedIds, invalidIds },
      'Bulk delete operation completed',
      200,
    );
  });
}
