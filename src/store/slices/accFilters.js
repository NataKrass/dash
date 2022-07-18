import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAFs, getAFById, postAFiltr, putAFiltr, deleteAccFiltr } from 'base/network/accountFilters';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  accFilters: [],
  accFilter: null,
  errors: {}
};

export const fetchAFById = createAsyncThunk(
  'accFilterSlice/fetchAFById',
  async (id) => {
    const response = await getAFById(id);
    return response.data;
  });

export const fetchAllAFs = createAsyncThunk(
  'accFilterSlice/fetchAllAFs',
  async () => {
    const response = await getAllAFs();
    return response.data;
  });

export const fetchAFPerPage = createAsyncThunk(
  'accFilterSlice/fetchAFPerPage',
  async ({ ...rest }) => {
    const response = await getAllAFs({ ...rest });
    return {
      data: response.data,
      page,
    };
  }
);

export const postAFs = createAsyncThunk(
  'assignRuleSlice/postAssignRule',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postAFiltr(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const deleteAF = createAsyncThunk(
  'accFilterSlice/deleteAF',
  async (id) => {
    try {
      const response = await deleteAccFiltr(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const putAFilter = createAsyncThunk(
  'accFilterSlice/putAFilter',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putAFiltr(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const accFilterSlice = createSlice({
  name: 'accFilterSlice',
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
    [putAFilter.pending]: (state) => {
      state.status = LOADING;
    },
    [putAFilter.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.accFilters = state.accFilters.map(rule => {
        if(rule.id === action.payload?.results?.results?.id) {
          return action.payload?.results?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.accFilters);
    },
    [putAFilter.rejected]: (state, { payload, meta }) => {
      state.accFilter = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.accFilter });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchAFById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAFById.fulfilled]: (state, action) => {
      state.accFilters = action.payload?.results;
      state.status = SUCCEED;
    },
    [fetchAFById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllAFs.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllAFs.fulfilled]: (state, action) => {
      state.accFilters = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
    },

    [postAFs.pending]: (state) => {
      state.status = LOADING;
    },
    [postAFs.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.accFilters = state.accFilters.concat(action.payload?.results?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postAFs.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchAllAFs.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAFPerPage.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAFPerPage.rejected]: (state) => {
      state.status = FAILURE;
    },
    
    [deleteAF.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteAF.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.accFilter = action.payload?.results;
      state.accFilters = state.accFilters.filter((x) => {
        return x.id != action.payload?.results?.id;
      });
      console.log('actionDelete: ', state.accFilters);
    },
    [deleteAF.rejected]: (state, { payload, meta }) => {
      state.accFilters = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.accFilter }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },
  }
});


export const { nextPage, setFiltersData } = accFilterSlice.actions;


export default accFilterSlice.reducer;
