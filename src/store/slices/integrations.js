import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIntegrations } from 'base/network/integrations';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  integrations: [],
  errors: {}
};

export const fetchIntegrations = createAsyncThunk(
  'integrationsSlice/fetchIntegrations',
  async ({ ...rest }) => {
    const response = await getIntegrations({ page: 1, ...rest });
    return response.data;
  });

export const integrationsSlice = createSlice({
  name: 'integrationsSlice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.integrations = payload;
    }
  },
  extraReducers: {
    [fetchIntegrations.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchIntegrations.fulfilled]: (state, action) => {
      state.integrations = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchIntegrations.rejected]: (state) => {
      state.status = FAILURE;
    },
  }
});

export const { nextPage, setFiltersData } = integrationsSlice.actions;


export default integrationsSlice.reducer;
