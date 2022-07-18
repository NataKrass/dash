import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAccountDetails,
  getAccountPayment,
  getAccountSubscriptions,
  getTimeZone,
  getAllSubscriptions,
  postCoupon,
} from 'base/network/account';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  apply: LOADING,
  page: 1,
  per_page: 100,
  details: [],
  payment: [],
  subscription: [],
  subscriptions: null,
  timezone: null,
  errors: {}
};

export const postPromo = createAsyncThunk(
  'detailslice/postPromo',
  async (params, { rejectWithValue }) => {
    console.log('done');
    try {
      const response = await postCoupon(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const fetchAllDetails = createAsyncThunk(
  'detailslice/fetchAllDetails',
  async ({ ...rest}) => {
    const details = await getAccountDetails({ page: 1, ...rest });
    const payment = await getAccountPayment({ page: 1, ...rest });
    const subscription = await getAccountSubscriptions({ page: 1, ...rest });
    return {details: details.data.results, payment: payment.data.results, subscription: subscription.data.results};
  });

export const fetchAS = createAsyncThunk(
  'detailslice/fetchAS',
  async ({ ...rest }) => {
    const response = await getAllSubscriptions({ ...rest });
    return {
      data: response.data,
    };
  }
);

export const fetchTZ = createAsyncThunk(
  'detailslice/fetchTZ',
  async ({ ...rest }) => {
    const response = await getTimeZone({ ...rest });
    return {
      data: response.data,
    };
  }
);

export const postTZ = createAsyncThunk(
  'detailslice/postTZ',
  async (params, { rejectWithValue }) => {
    try {
      const response = await putTZ(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);


export const detailslice = createSlice({
  name: 'detailslice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.filters = payload;
    }
  },
  extraReducers: {

    [fetchAllDetails.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllDetails.fulfilled]: (state, action) => {
      state.details = action.payload.details;
      state.payment = action.payload.payment;
      state.subscription = action.payload.subscription;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllDetails.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchTZ.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchTZ.fulfilled]: (state, action) => {
      state.timezone = action.payload?.data?.results;
      state.status = SUCCEED;
    },

    [fetchAS.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAS.fulfilled]: (state, action) => {
      state.subscriptions = action.payload?.data?.results;
      state.status = SUCCEED;
    },

    [postPromo.pending]: () => {
      state.apply = LOADING;
    },
    [postPromo.fulfilled]: (state, action) => {
      state.apply = SUCCEED;
      console.log('actionPost: ', action.payload?.results);
    },
    [postPromo.rejected]: (state, { payload }) => {  
      state.apply = FAILURE;
      state.errors = payload?.message;
    },

  }
});

export const { nextPage, setFiltersData } = detailslice.actions;

export default detailslice.reducer;
