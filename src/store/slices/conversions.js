import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getConversionById,
  getAllConversions,
  postConversions,
  deleteConversions,
  putConversions,
} from 'base/network/conversions';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  conversions: [],
  conversion: null,
  errors: {},
};

export const deleteConversion = createAsyncThunk(
  'conversionSlice/deleteConversion',
  async (id) => {
    try {
      const response = await deleteConversions(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const putConversion = createAsyncThunk(
  'conversionSlice/putConversion',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putConversions(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const fetchConversionById = createAsyncThunk(
  'conversionSlice/fetchConversionById',
  async (id) => {
    const response = await getConversionById(id);
    return response.data;
  }
);

export const fetchAllConversions = createAsyncThunk(
  'conversionSlice/fetchAllConversions',
  async ({ ...rest }) => {
    const response = await getAllConversions({ page: 1, ...rest });
    return response.data;
  }
);

export const postConversion = createAsyncThunk(
  'conversionSlice/postConversion',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postConversions(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const conversionSlice = createSlice({
  name: 'conversionSlice',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    setFiltersData(state, payload) {
      state.Conversions = payload;
    },
  },
  extraReducers: {
    [fetchConversionById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchConversionById.fulfilled]: (state, action) => {
      state.conversion = action.payload;
      state.status = SUCCEED;
      console.log('actionPerssonaliz:', action.payload);
    },
    [fetchConversionById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllConversions.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllConversions.fulfilled]: (state, action) => {
      state.conversions = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllConversions.rejected]: (state) => {
      state.status = FAILURE;
    },

    [putConversion.pending]: (state) => {
      state.status = LOADING;
    },
    [putConversion.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.conversions = state.conversions.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.conversions);
    },
    [putConversion.rejected]: (state, { payload, meta }) => {
      state.rule = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [postConversion.pending]: () => {
      //state.status = LOADING;
    },
    [postConversion.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.conversions = state.conversions.concat(action.payload?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postConversion.rejected]: (state, { payload, meta }) => {
      state.assignRules = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.assignRules }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [deleteConversion.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.conversion = action.payload?.results;
      state.conversions = state.conversions.filter((x) => {
        return x.id != action.payload?.results.id;
      });
      console.log('actionDelete: ', action.payload?.results.id);
    },
    [deleteConversion.rejected]: (state, { payload, meta }) => {
      state.conversions = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.assignRules }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },
  },
});

export const { nextPage, setFiltersData } = conversionSlice.actions;

export default conversionSlice.reducer;
