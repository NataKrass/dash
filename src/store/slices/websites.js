import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWebsites,
  getWebsitesDeleted,
  putWebsites,
  deleteWebsites,
  activateWebsites,
  postWebsites,
} from 'base/network/websites';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  per_page: 100,
  website: null,
  site: null,
  websites: [],
  deleted: [],
  errors: {}
};
export const deleteWebsite = createAsyncThunk(
  'websiteSlice/deleteWebsite',
  async (id) => {
    try {
      const response = await deleteWebsites(id);
      console.log('done delete');
      return response.data;
      
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const putWebsite = createAsyncThunk(
  'websitesSlice/putWebsite',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putWebsites(id, body);
      console.log('response body', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const recoverWebsite = createAsyncThunk(
  'websitesSlice/recoverWebsite',
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await activateWebsites(id);
      console.log('response body');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const fetchWebsites = createAsyncThunk(
  'websitesSlice/fetchWebsites',
  async ({ ...rest }) => {
    const response = await getWebsites({ page: 1, ...rest });
    return response.data;
  });

export const fetchWebsitesdeleted = createAsyncThunk(
  'websitesSlice/ffetchWebsitesdeleted',
  async ({ ...rest }) => {
    const response = await getWebsitesDeleted({ page: 1, ...rest });
    return response.data;
  });

export const postWebsite = createAsyncThunk(
  'websiteSlice/postAssignRule',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postWebsites(params);
      console.log('done');
      return response.data;    
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const websitesSlice = createSlice({
  name: 'websitesSlice',
  initialState,
  reducers: {
    nextPage (state) {
      state.page += 1;
    },
    setFiltersData (state, payload) {
      state.websites = payload;
    }
  },
  extraReducers: {
    [putWebsite.pending]: (state) => {
      state.status = LOADING;
    },
    [putWebsite.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.websites = state.websites.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('ruleUpd: ', state.websites);
    },
    [putWebsite.rejected]: (state, { payload, meta }) => {
      state.website = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },
 
    [recoverWebsite.pending]: (state) => {
      state.status = LOADING;
    },
    [recoverWebsite.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.websites = state.websites.concat(action.payload?.results);
      state.deleted = state.deleted.filter(x => {
        return x.id !=  action.payload?.results.id;
      });
      console.log('ruleUpd: ', state.websites);
    },
    [recoverWebsite.rejected]: (state, { payload, meta }) => {
      state.website = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchWebsites.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchWebsites.fulfilled]: (state, action) => {
      state.websites = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('actionWebsites:', state.websites);
    },
    [fetchWebsites.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchWebsitesdeleted.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchWebsitesdeleted.fulfilled]: (state, action) => {
      state.deleted = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('actionWebsites:', state.deleted);
    },
    [fetchWebsitesdeleted.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postWebsite.pending]: (state) => {
      state.status = LOADING;
    },
    [postWebsite.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.site = action.payload?.results;
      state.websites = state.websites.concat(action.payload?.results);
      console.log('actionPost: ', state.site);
    },
    [postWebsite.rejected]: (state, { payload }) => {
      // state.assignRules = Object.entries(meta.arg)
      //   .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [deleteWebsite.pending]: (state) => {
      state.status = LOADING;
    },
    [deleteWebsite.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.website = action.payload?.results;
      state.websites = state.websites.filter(x => {
        return x.id !=  action.payload?.results.id;
      });
      state.deleted = state.deleted.concat(action.payload?.results);
      console.log('actionDelete: ', action.payload?.results.id);
    },
    [deleteWebsite.rejected]: (state, { payload, meta }) => {
      state.websites = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.websites });
      state.status = FAILURE;
      state.errors = payload?.message;
    }
  }
});

export const { nextPage, setFiltersData } = websitesSlice.actions;


export default websitesSlice.reducer;
