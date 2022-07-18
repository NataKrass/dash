import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUsers, getUsers, postUsers, putUsers } from 'base/network/users';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  users: [],
  query: null,
  errors: {}
};

export const deleteUser = createAsyncThunk(
  'usersSlice/deleteUser',
  async (id) => {
    try {
      const response = await deleteUsers(id);
      console.log('done delete');
      return response.data;
      
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const putUser = createAsyncThunk(
  'usersSlice/putUser',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putUsers(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const fetchUsers = createAsyncThunk(
  'usersSlice/fetchUsers',
  async ({query}) => {
    const response = await getUsers({query});
    return response.data;
  });

export const postUser = createAsyncThunk(
  'usersSlice/postUser',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postUsers(params);
      return response.data;     
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.users = payload;
    }
  },
  extraReducers: {
    [putUser.pending]: (state) => {
      state.status = LOADING;
    },
    [putUser.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.users = state.users.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', action.payload?.results);
    },
    [putUser.rejected]: (state, { payload, meta }) => {
      state.user = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchUsers.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('users:', state.users);
    },
    [fetchUsers.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postUser.pending]: (state) => {
      state.status = LOADING;
    },
    [postUser.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.users = state.users.concat(action.payload?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postUser.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [deleteUser.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.user = action.payload?.results;
      state.users = state.users.filter(x => {
        return x.id !=  action.payload?.results.id;
      });
      console.log('actionDelete: ', action.payload?.results.id);
    },
    [deleteUser.rejected]: (state, { payload, meta }) => {
      state.users = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    }
  }
});

export const { nextPage, setFiltersData } = usersSlice.actions;


export default usersSlice.reducer;
