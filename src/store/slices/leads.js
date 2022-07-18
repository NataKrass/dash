import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLeadVisits,
  getLeadCompany,
  geAllLeads,
  getLeadContacts,
  getLeadNotes,
  postLeadNotes,
  exportLead
} from 'base/network/leads';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  detailsStatus: LOADING,
  page: 1,
  leads: [],
  lead: null,
  filters: {},
  company: [],
  contacts: [],
  visits: [],
  notes: [],
  export: null,
  count: null,
  errors: {},
};

export const fetchLeadById = createAsyncThunk(
  'leadsSlice/fetchLeadById',
  async (id) => {
    const response = await getLeadCompany(id);
    return response.data;
  }
);

export const fetchLeadVisits = createAsyncThunk(
  'leadsSlice/fetchLeadVisits',
  async (id) => {
    const response = await getLeadVisits(id);
    return response.data;
  }
);

export const fetchLeadContacts = createAsyncThunk(
  'leadsSlice/fetchLeadContacts',
  async (id) => {
    const response = await getLeadContacts(id);
    return response.data;
  }
);

export const fetchLeadNotes = createAsyncThunk(
  'leadsSlice/fetchLeadNotes',
  async (id) => {
    const response = await getLeadNotes(id);
    return response.data;
  }
);

export const postLeadNote = createAsyncThunk(
  'leadsSlice/postLeadNote',
  async ({id, body, title}, { rejectWithValue }) => {
    try {
      const response = await postLeadNotes(id, body, title);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const exportLeads = createAsyncThunk(
  'leadsSlice/exportLeads',
  async ({ga_view_id, selected_ids, export_type}, { rejectWithValue }) => {
    try {
      const response = await exportLead(ga_view_id, selected_ids, export_type);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const fetchAllLeads = createAsyncThunk(
  'leadsSlice/fetchAllLeads',
  async ({ gaViewId, startDate, endDate, leads_order, q, per_page, queue_id, ...rest }) => {
    const response = await geAllLeads({
      page: 1,
      gaViewId,
      leads_order,
      queue_id,
      q,
      startDate,
      endDate,
      per_page,
      ...rest,
    });
    return response.data;
  }
);

export const fetchLeadsPerPage = createAsyncThunk(
  'leadsSlice/fetchLeadsPerPage',
  async ({ page, gaViewId, startDate, endDate, leads_order, queue_id, q, ...rest }) => {
    const response = await geAllLeads({
      page,
      gaViewId,
      leads_order,
      queue_id,
      q,
      startDate,
      endDate,
      ...rest,
    });
    return {
      data: response.data,
      page,
    };
  }
);

export const leadsSlice = createSlice({
  name: 'leadsSlice',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    setFiltersData(state, payload) {
      state.filters = payload;
    },
  },
  extraReducers: {
    [fetchLeadById.pending]: (state) => {
      state.detailsStatus = LOADING;
    },
    [fetchLeadById.fulfilled]: (state, action) => {
      state.company = action.payload;
      state.detailsStatus = SUCCEED;
    },
    [fetchLeadById.rejected]: (state) => {
      state.detailsStatus = FAILURE;
    },

    [fetchLeadVisits.pending]: (state) => {
      state.detailsStatus = LOADING;
    },
    [fetchLeadVisits.fulfilled]: (state, action) => {
      state.visits = action.payload;
      state.detailsStatus = SUCCEED;
    },
    [fetchLeadVisits.rejected]: (state) => {
      state.detailsStatus = FAILURE;
    },

    [fetchLeadContacts.pending]: (state) => {
      state.detailsStatus = LOADING;
    },
    [fetchLeadContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
      state.detailsStatus = SUCCEED;
    },
    [fetchLeadContacts.rejected]: (state) => {
      state.detailsStatus = FAILURE;
    },

    [fetchLeadNotes.pending]: (state) => {
      state.detailsStatus = LOADING;
    },
    [fetchLeadNotes.fulfilled]: (state, action) => {
      state.notes = action.payload?.results;
      state.detailsStatus = SUCCEED;
    },
    [fetchLeadNotes.rejected]: (state) => {
      state.detailsStatus = FAILURE;
    },

    [fetchAllLeads.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllLeads.fulfilled]: (state, action) => {
      state.leads = action.payload.results;
      state.count = action.payload.count;
      state.page = 1;
      state.status = SUCCEED;
    },
    [fetchAllLeads.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchLeadsPerPage.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchLeadsPerPage.fulfilled]: (state, { payload }) => {
      const { data, page } = payload;
      state.page = page;
      state.leads = state.leads.concat(data.results);
      state.status = SUCCEED;
    },
    [fetchLeadsPerPage.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postLeadNote.pending]: (state) => {
      state.detailsStatus = LOADING;
    },
    [postLeadNote.fulfilled]: (state, action) => {
      state.detailsStatus = SUCCEED;
      state.notes = state.notes.concat(action.payload?.results?.results);
      console.log('actionPost: ', action.payload?.results);
    },
    [postLeadNote.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.detailsStatus = FAILURE;
      state.errors = payload?.message;
    },
    
    [exportLeads.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.export = action.payload?.results;
      console.log('actionPost: ', action.payload?.results);
    },
    [exportLeads.rejected]: (state, { payload }) => {
      state.status = FAILURE;
      state.errors = payload?.message;
    },
  },
});

export const { nextPage, setFiltersData } = leadsSlice.actions;

export default leadsSlice.reducer;
