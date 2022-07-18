import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPersonalizationById,
  getAllPersonalizations,
  postPersonalizations,
  deletePersonalizations,
  putPersonalizations,
  putPersonalizationStatus
} from 'base/network/personalizations';
import { LOADING, SUCCEED, FAILURE } from 'store/CONSTANTS';

export const initialState = {
  status: LOADING,
  page: 1,
  personalizations: [],
  personalization: null,
  filters: {},
  errors: {},
};

export const fetchPersonalizationById = createAsyncThunk(
  'personalizationSlice/fetchPersonalizationById',
  async (id) => {
    const response = await getPersonalizationById(id);
    return response.data;
  }
);

export const fetchAllPersonalizations = createAsyncThunk(
  'personalizationSlice/fetchAllPersonalizations',
  async ({ ...rest }) => {
    const response = await getAllPersonalizations({ page: 1, ...rest });
    return response.data;
  }
);

export const fetchPersonalizationsPerPage = createAsyncThunk(
  'personalizationSlice/fetchPersonalizationsPerPage',
  async ({ page, ...rest }) => {
    const response = await getAllPersonalizations({ page, ...rest });
    return {
      data: response.data,
      page,
    };
  }
);

export const postPersonalization = createAsyncThunk(
  'personalizationSlice/postPersonalization',
  async (params, { rejectWithValue }) => {
    try {
      const response = await postPersonalizations(params);
      console.log('done');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);
    }
  }
);

export const putPersonalization = createAsyncThunk(
  'personalizationSlice/putPersonalization',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putPersonalizations(id, body);
      console.log('response body');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const putPersonalizationRun = createAsyncThunk(
  'personalizationSlice/putPersonalizationRun',
  async ({id, body}, {rejectWithValue}) => {
    try {
      const response = await putPersonalizationStatus(id, body);
      console.log('response body');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data, error);    }
  }
);

export const deletePersonalization = createAsyncThunk(
  'personalizationSlice/deletePersonalization',
  async (id) => {
    try {
      const response = await deletePersonalizations(id);
      console.log('done delete');
      return response.data;
    } catch (error) {
      //return rejectWithValue(error.response?.data, error);
      return error;
    }
  }
);

export const personalizationSlice = createSlice({
  name: 'personalizationSlice',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    setFiltersData(state, payload) {
      state.personalizations = payload;
    },
  },
  extraReducers: {
    [putPersonalization.pending]: (state) => {
      state.status = LOADING;
    },
    [putPersonalization.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.personalizations = state.personalizations.map(rule => {
        if(rule.id === action.payload?.results?.id) {
          return action.payload?.results;
        }
        return rule;
      });
      console.log('persUpd: ', state.personalizations);
    },
    [putPersonalization.rejected]: (state, { payload, meta }) => {
      state.personalization = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [putPersonalizationRun.pending]: (state) => {
      state.status = LOADING;
    },
    [putPersonalizationRun.fulfilled]: (state) => {
      state.status = SUCCEED;
      // state.personalizations = state.personalizations.map(rule => {
      //   if(rule.id === action.payload?.results?.id) {
      //     return action.payload?.results;
      //   }
      //   return rule;
      // });
      console.log('statusUpd: ', state.personalizations);
    },
    [putPersonalizationRun.rejected]: (state, { payload, meta }) => {
      state.personalization = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.user });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchPersonalizationById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchPersonalizationById.fulfilled]: (state, action) => {
      state.personalization = action.payload;
      state.status = SUCCEED;
      console.log('actionPerssonaliz:', action.payload);
    },
    [fetchPersonalizationById.rejected]: (state) => {
      state.status = FAILURE;
    },

    [fetchAllPersonalizations.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchAllPersonalizations.fulfilled]: (state, action) => {
      state.personalizations = action.payload?.results;
      state.page = 1;
      state.status = SUCCEED;
      console.log('actionPerssonaliz:', state.personalizations);
    },
    [fetchAllPersonalizations.rejected]: (state) => {
      state.status = FAILURE;
    },

    [postPersonalization.pending]: (state) => {
      state.status = LOADING;
    },
    [postPersonalization.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.personalizations = state.personalizations.concat(action.payload?.results);
      console.log('actionPost: ', state.personalizations);
    },
    [postPersonalization.rejected]: (state, { payload, meta }) => {
      state.assignRules = Object.entries(meta.arg)
        .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), { ...state.assignRules });
      state.status = FAILURE;
      state.errors = payload?.message;
    },

    [fetchPersonalizationsPerPage.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchPersonalizationsPerPage.fulfilled]: (state, { payload }) => {
      const { data, page } = payload;
      state.page = page;
      state.personalizations = state.personalizations.concat(
        data.personalizations
      );
      state.status = SUCCEED;
    },
    [fetchPersonalizationsPerPage.rejected]: (state) => {
      state.status = FAILURE;
    },

    [deletePersonalization.pending]: (state) => {
      state.status = LOADING;
    },
    [deletePersonalization.fulfilled]: (state, action) => {
      state.status = SUCCEED;
      state.personalization = action.payload?.results;
      state.personalizations = state.personalizations.filter((x) => {
        return x.id != action.payload?.results.id;
      });
      console.log('actionDelete: ', state.personalizations);
    },
    [deletePersonalization.rejected]: (state, { payload, meta }) => {
      state.personalizations = Object.entries(meta.arg).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        { ...state.assignRules }
      );
      state.status = FAILURE;
      state.errors = payload?.message;
    },
  },
});

export const { nextPage, setFiltersData } = personalizationSlice.actions;

export default personalizationSlice.reducer;
