import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGAViewIds } from 'base/network/gaViews';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  ids: [],
  selectedWebsiteId: null,
  selectedId: null, // assume that the value will be as follows { value: 1, label: 'Im pretty name' }
  errors: {}
};

export const fetchGAViewIds = createAsyncThunk('gaViewIdsSlice/fetchGAViewIds', async () => {
  const response = await getGAViewIds();
  return response.data;
});

export const gaViewIdsSlice = createSlice({
  name: 'gaViewIdsSlice',
  initialState,
  reducers: {
    setSelectedId (state, action) {
      state.selectedId = action.payload;
    }
  },
  extraReducers: {
    [fetchGAViewIds.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchGAViewIds.fulfilled]: (state, action) => {
      state.ids = action.payload?.google_analytics_view_ids;
      state.selectedWebsiteId = action.payload?.website_id;
      state.status = SUCCEED;
      
    },
    [fetchGAViewIds.rejected]: (state) => {
      state.status = FAILURE;
    }
  }
});

export const { setSelectedId } = gaViewIdsSlice.actions;

export default gaViewIdsSlice.reducer;
