import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUFiltr, getAllUFs, getUFById, postUFiltr, putUFiltr } from 'base/network/userFilters';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  userFilters: [],
  userFilter: null,
  errors: {}
};

export const fetchUserFById = createAsyncThunk(
  'userFilterSlice/fetchAFById',
  async (id) => {
    const response = await getUFById(id);
    return response.data;
  });

export const fetchAllUserFs = createAsyncThunk(
  'userFilterSlice/fetchAllAFs',
  async () => {
    const response = await getAllUFs();
    return response.data;
  });

export const fetchUserFPerPage = createAsyncThunk(
  'userFilterSlice/fetchAFPerPage',
  async ({ ...rest }) => {
    const response = await getAllUFs({  ...rest });
    return {
      data: response.data,
      page
    };
  });

export const postUF = createAsyncThunk(
  'userFilterSlice/postUF',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postUFiltr(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const deleteUF = createAsyncThunk(
  'userFilterSlice/deleteUF',
  async (id) => {
    try {
      const response = await deleteUFiltr(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const putUF = createAsyncThunk(
  'userFilterSlice/putUF',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putUFiltr(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
); 

export const userFilterSlice = createSlice({
  name: 'userFilterSlice',
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
    [putUF.pending]: (state) => {
      state.status = LOADING;
    },
    [putUF.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.userFilters = state.userFilters.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.userFilters);
    },
    [putUF.rejected]: (state, { payload, meta }) => {
      state.accFilter = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.accFilter });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchUserFById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchUserFById.fulfilled]: (state, action) => {
      state.userFilters = action.payload;
      state.status = SUCCEED;
    },
    [fetchUserFById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllUserFs.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllUserFs.fulfilled]: (state, action) => {
      state.userFilters = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllUserFs.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postUF.pending]: (state) => {
      state.status = LOADING;
    },
    [postUF.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.userFilters = state.userFilters.concat(action.payload?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postUF.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

       
    [deleteUF.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteUF.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.userFilter = action.payload?.results;
      state.userFilters = state.userFilters.filter((x) => {
        return x.id != action.payload?.results?.id;
      });
      console.log('actionDelete: ', state.usersFilters);
    },
    [deleteUF.rejected]: (state, { payload, meta }) => {
      state.userFilters = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.userFilters }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchUserFPerPage.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchUserFPerPage.rejected]: (state) => {
      state.status = FAILURE;
    }
  }
});


export const { nextPage, setFiltersData } = userFilterSlice.actions;


export default userFilterSlice.reducer;
