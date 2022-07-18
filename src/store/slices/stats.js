import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries, getChart, getSummary} from 'base/network/stats';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  statusStat: LOADING,
  page: 1,
  per_page: 100,
  summary: {},
  chart: [],
  countries: [],
  errors: {}
};

export const fetchAllStats = createAsyncThunk(
  'statslice/fetchAllStats',
  async ({ websiteId, stats }) => {
    const summary = await getSummary({ websiteId, stats });
    const chart = await getChart({websiteId});
    const countries = await getCountries({websiteId});
    return {summary: summary.data.results, chart: chart.data.results, countries: countries.data.results};
  });


export const statslice = createSlice({
  name: 'statslice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.chart = payload;
    }
  },
  extraReducers: {

    [fetchAllStats.pending]: (state) => {
      state.statusStat = LOADING;
    },
    [fetchAllStats.fulfilled]: (state, action) => {
      state.summary = action.payload.summary;
      state.chart = action.payload.chart;
      state.countries = action.payload.countries;
      state.page = 1;
      state.statusStat = SUCCEED;
    },
    [fetchAllStats.rejected]: (state) => {
      state.statusStat = FAILURE;
    },

  }
});

export const { nextPage, setFiltersData } = statslice.actions;

export default statslice.reducer;
