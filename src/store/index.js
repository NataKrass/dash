import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user';
import gaViewIdReducer from './slices/gaViewId';
import dashboardQueuesReducer from './slices/dashboardQueues';
import leadsReducer from './slices/leads';
import accFReducer from './slices/accFilters';
import userFReducer from './slices/userFilters';
import contactFReducer from './slices/contactFilters';
import personalizationsReducer from './slices/personalizations';
import conversionsReducer from './slices/conversions';
import assignRulesReducer from './slices/assignRules';
import hidingRulesReducer from './slices/hidingRules';
import notificationsReducer from './slices/notifications';
import websitesReducer from './slices/websites';
import accountReducer from './slices/account';
import usersReducer from './slices/users';
import statsReducer from './slices/stats';
import integrationsReducer from './slices/integrations';

const reducer = combineReducers({
  userReducer,
  gaViewIdReducer,
  leadsReducer,
  dashboardQueuesReducer,
  accFReducer,
  userFReducer,
  contactFReducer,
  personalizationsReducer,
  conversionsReducer,
  assignRulesReducer,
  hidingRulesReducer,
  notificationsReducer,
  websitesReducer,
  accountReducer,
  usersReducer,
  statsReducer,
  integrationsReducer
});

const store = configureStore({
  reducer
});

export default store;
