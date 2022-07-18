import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHidingRuleById,
  getAllHidingRules,
  putHidingRuleById,
  postHidingRules,
  deleteHidingRule,
} from 'base/network/hidding';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  hidingRules: [],
  hidingRule: null,
  rule: null,
  all: [],
  errors: {},
};

export const deleteHidingRuleById = createAsyncThunk(
  'hidingRuleSlice/deleteHidingRuleById',
  async (id) => {
    try {
      const response = await deleteHidingRule(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const postHidingRule = createAsyncThunk(
  'hidingRuleSlice/postHidingRule',
  async ({ google_analytics_view_id_id, keywords }, { rejectWithValue }) => {
    try {
      const response = await postHidingRules(
        google_analytics_view_id_id,
        keywords
      );
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const fetchAllHidingRules = createAsyncThunk(
  'hidingRuleSlice/fetchAllHidingRules',
  async ({ ...rest }) => {
    const response = await getAllHidingRules({ page: 1, ...rest });
    return response.data;
  }
);

export const putHidingRule = createAsyncThunk(
  'hidingRuleSlice/putHidingRule',
  async (
    { id, google_analytics_view_id_id, keywords },
    { rejectWithValue }
  ) => {
    try {
      const response = await putHidingRuleById(
        id,
        google_analytics_view_id_id,
        keywords
      );
      console.log('response body');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const fetchHidingRuleById = createAsyncThunk(
  'hidingRuleSlice/fetchHidingRuleById',
  async (id) => {
    const response = await getHidingRuleById(id);
    return response.data;
  }
);

export const hidingRuleSlice = createSlice({
  name: 'hidingRuleSlice',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
  },
  extraReducers: {
    [fetchAllHidingRules.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllHidingRules.fulfilled]: (state, action) => {
      state.hidingRules = action.payload?.results;
      state.all = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('allRules: ', initialState, state.all);
    },
    [fetchAllHidingRules.rejected]: (state) => {
      state.status = FAILURE;
    },

    [putHidingRule.pending]: (state) => {
      state.status = LOADING;
    },
    [putHidingRule.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.hidingRules = state.hidingRules.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', action.payload?.results);
    },
    [putHidingRule.rejected]: (state, { payload, meta }) => {
      state.rule = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.user }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [postHidingRule.pending]: (state) => {
      state.status = LOADING;
    },
    [postHidingRule.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      //state.hidingRules = state.hidingRules.concat(action.payload?.results);
      console.log('actionPost: ', action.payload.results, state.hidingRules);
    },
    [postHidingRule.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchHidingRuleById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchHidingRuleById.fulfilled]: (state, action) => {
      state.hidingRule = action.payload;
      state.status = SUCCEED;
      console.log('actionId: ', action.payload);
    },
    [fetchHidingRuleById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [deleteHidingRuleById.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteHidingRuleById.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.hidingRule = action.payload?.results;
      state.hidingRules = state.hidingRules.filter(x => {
        return x.id !=  action.payload?.results.id;
      });
      console.log('actionDelete: ', state.hidingRules);
    },
    [deleteHidingRuleById.rejected]: (state, { payload, meta }) => {
      state.hidingRules = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.hidingRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    }
  },
});

export const { nextPage, setFiltersData } = hidingRuleSlice.actions;

export default hidingRuleSlice.reducer;
