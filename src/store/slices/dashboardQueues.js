import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardQueues, postQueue, putQueue, deleteQueue } from 'base/network/dashboardQueues';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  queues: [],
  queue: null,
  errors: {}
};

export const fetchDashboardQueues = createAsyncThunk(
  'dashboardQueuesSlice/fetchDashboardQueues',
  async (id) => {
    const response = await getDashboardQueues(id);
    return response.data;
  });

export const postQD = createAsyncThunk(
  'dashboardQueuesSlice/postQD',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postQueue(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const deleteQD = createAsyncThunk(
  'dashboardQueuesSlice/deleteQD',
  async (id) => {
    try {
      const response = await deleteQueue(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const putQD = createAsyncThunk(
  'dashboardQueuesSlice/putQD',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putQueue(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
); 

export const dashboardQueuesSlice = createSlice({
  name: 'dashboardQueuesSlice',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchDashboardQueues.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchDashboardQueues.fulfilled]: (state, action) => {
      state.queues = action.payload?.results;
      state.status = SUCCEED;
    },
    [fetchDashboardQueues.rejected]: (state) => {
      state.status = FAILURE;
    },

    [putQD.pending]: (state) => {
      state.status = LOADING;
    },
    [putQD.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.queues = state.queues.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.queues);
    },
    [putQD.rejected]: (state, { payload, meta }) => {
      state.queue = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.queue });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [postQD.pending]: (state) => {
      state.status = LOADING;
    },
    [postQD.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.queues = state.queues.concat(action.payload?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postQD.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [deleteQD.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteQD.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.userFilter = action.payload?.results;
      state.queues = state.queues.filter((x) => {
        return x.id != action.payload?.results?.id;
      });
      console.log('actionDelete: ', state.usersFilters);
    },
    [deleteQD.rejected]: (state, { payload, meta }) => {
      state.queues = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.queues }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },
  }
});

export const { setSelectedId } = dashboardQueuesSlice.actions;

export default dashboardQueuesSlice.reducer;
