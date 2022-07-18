import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteAssignRule, getAllAssignRules, postAssignRules, putAssignRuleById } from 'base/network/assignRules';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  assignRules: [],
  assignRule: null,
  rule: null,
  errors: {}
};

export const deleteAssignRuleById = createAsyncThunk(
  'assignRuleSlice/deleteAssignRuleById',
  async (id) => {
    try {
      const response = await deleteAssignRule(id);
      console.log('done delete');
      return response.data;
      
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const putAssignRule = createAsyncThunk(
  'assignRuleSlice/putAssignRule',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putAssignRuleById(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const fetchAllAssignRules = createAsyncThunk(
  'assignRuleSlice/fetchAllAssignRules',
  async ({ ...rest }) => {
    const response = await getAllAssignRules({ page: 1, ...rest });
    return response.data;
  });

export const postAssignRule = createAsyncThunk(
  'assignRuleSlice/postAssignRule',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postAssignRules(params);
      console.log('done');
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const assignRuleSlice = createSlice({
  name: 'assignRuleSlice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.assignRules = payload;
    }
  },
  extraReducers: {
    [putAssignRule.pending]: (state) => {
      state.status = LOADING;
    },
    [putAssignRule.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.assignRules = state.assignRules.map(rule => {
        if(rule.id === action.payload?.results?.results?.id) {
          return action.payload?.results?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.assignRules);
    },
    [putAssignRule.rejected]: (state, { payload, meta }) => {
      state.rule = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchAllAssignRules.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllAssignRules.fulfilled]: (state, action) => {
      state.assignRules = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('actionRules:', state.assignRules);
    },
    [fetchAllAssignRules.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postAssignRule.pending]: (state) => {
      state.status = LOADING;
    },
    [postAssignRule.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.assignRules = state.assignRules.concat(action.payload?.results?.results);
      console.log('actionPost: ', state.assignRules);
    },
    [postAssignRule.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [deleteAssignRuleById.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteAssignRuleById.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.assignRule = action.payload?.results;
      state.assignRules = state.assignRules.filter(x => {
        return x.id !=  action.payload?.results.id;
      });
      console.log('actionDelete: ', action.payload?.results.id);
    },
    [deleteAssignRuleById.rejected]: (state, { payload, meta }) => {
      state.assignRules = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    }
  }
});

export const { nextPage, setFiltersData } = assignRuleSlice.actions;


export default assignRuleSlice.reducer;
