/*
|-----------------------------------------
| setting up _1_template_Slice for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// If you want to update store then this file help you to update
import { IOrder } from '@/app/api/orders/orderModel';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: IOrder[];
} = {
  isLoading: false,
  isError: false,
  error: '',
  data: [],
};
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    pushAllData: (state, action) => {
      state.data.push(action.payload);
    },
    addOne_3_template_: (state, action) => {
      // Add the new _3_template_ to the state data array.
      state.data.push(action.payload);
    },
    removeOne_3_template_: (state, action) => {
      const idx = state.data.indexOf(action.payload);
      if (idx !== -1) {
        state.data.splice(idx, 1);
      }
    },
  },
});
export const { pushAllData, addOne_3_template_, removeOne_3_template_ } = ordersSlice.actions;
export default ordersSlice.reducer;
