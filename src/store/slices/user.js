import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersEdit, putUser } from 'base/network/user';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';


export const fetchUserEdit = createAsyncThunk(
  'user/fetchUserEdit',
  async () => {
    try {
      const response = await getUsersEdit();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params, { rejectWithValue }) => {
    try {
      const response = await putUser(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
); // example of error handling. Using Promise constructor here is necessary to catch body with error message from response

export const initialState = {
  count: 0,
  status: LOADING,
  user: null,
  errors: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // approach to create basic reducers to mutate global store
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
  extraReducers: {
    [fetchUserEdit.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchUserEdit.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.user = action.payload?.results;
    },
    [fetchUserEdit.rejected]: (state, action) => {
      state.status = FAILURE;
      state.errors = action.errors;
    },

    [updateUser.pending]: (state) => {
      state.status = LOADING;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.user = action.payload?.results;
      console.log('userUpd: ', action.payload.results);
    },
    [updateUser.rejected]: (state, { payload, meta }) => {
      state.user = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
