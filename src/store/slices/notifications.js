import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCustomById,
  getAllCustom,
  getAllSummary,
  getSummaryById,
  putSummaryById,
  putCustomById,
} from 'base/network/notifications';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  customs: [],
  custom: null,
  summaries: [],
  summary: null,
  errors: {},
};

export const updateCustomById = createAsyncThunk(
  'customSlice/updateCustomById',
  async ({ id, body }) => {
    const response = await putCustomById(id, body);
    return response.data;
  }
);

export const updateSummaryById = createAsyncThunk(
  'customSlice/updateSummaryById',
  async ({ id, body }) => {
    const response = await putSummaryById(id, body);
    return response.data;
  }
);

export const fetchSummaryById = createAsyncThunk(
  'customSlice/fetchSummaryById',
  async (id) => {
    const response = await getSummaryById(id);
    return response.data;
  }
);

export const fetchAllSummary = createAsyncThunk(
  'customSlice/fetchAllSummary',
  async ({ ...rest }) => {
    const response = await getAllSummary({ page: 1, ...rest });
    return response.data;
  }
);

export const fetchCustomById = createAsyncThunk(
  'customSlice/fetchCustomById',
  async (id) => {
    const response = await getCustomById(id);
    return response.data;
  }
);

export const fetchAllCustom = createAsyncThunk(
  'customSlice/fetchAllCustom',
  async ({ ...rest }) => {
    const response = await getAllCustom({ page: 1, ...rest });
    return response.data;
  }
);

export const customSlice = createSlice({
  name: 'customSlice',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    setFiltersData(state, payload) {
      state.custom = payload;
    },
  },
  extraReducers: {
    [updateCustomById.pending]: () => {
      //state.status = LOADING;
    },
    [updateCustomById.fulfilled]: (state, action) => {
      state.custom = action.payload;
      state.status = SUCCEED;
    },
    [updateCustomById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [updateSummaryById.pending]: () => {
      //state.status = LOADING;
    },
    [updateSummaryById.fulfilled]: (state, action) => {
      state.summary = action.payload;
      state.status = SUCCEED;
    },
    [updateSummaryById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchCustomById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchCustomById.fulfilled]: (state, action) => {
      state.custom = action.payload;
      state.status = SUCCEED;
    },
    [fetchCustomById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllCustom.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllCustom.fulfilled]: (state, action) => {
      state.customs = action.payload;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllCustom.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchSummaryById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchSummaryById.fulfilled]: (state, action) => {
      state.summary = action.payload;
      state.status = SUCCEED;
    },
    [fetchSummaryById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllSummary.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllSummary.fulfilled]: (state, action) => {
      state.summaries = action.payload;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllSummary.rejected]: (state) => {
      state.status = FAILURE;
    },
  },
});

export const { nextPage, setFiltersData } = customSlice.actions;

export default customSlice.reducer;
