import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCFs } from 'base/network/contactFilters';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  contactFilters: [],
  accFilter: null,
  errors: {}
};

export const fetchAllFs = createAsyncThunk(
  'contactFilterSlice/fetchAllFs',
  async () => {
    const response = await getAllCFs();
    return response.data;
  });

export const contactFilterSlice = createSlice({
  name: 'contactFilterSlice',
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

    [fetchAllFs.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllFs.fulfilled]: (state, action) => {
      state.contactFilters = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      
      console.log('action:', action.payload);
    },
    [fetchAllFs.rejected]: (state) => {
      state.status = FAILURE;
    }
  }
});


export const { nextPage, setFiltersData } = contactFilterSlice.actions;


export default contactFilterSlice.reducer;
