import network from './index';

export const getCountries = ({ websiteId = null}) => {
  return network.get('/api/dashboard_stats/countries', {
    params: {
      website_id: websiteId
    }
  });
};

export const getChart = ({ websiteId = null}) => {
  return network.get('api/dashboard_stats/unique_chart', {
    params: {
      website_id: websiteId
    }
  });
};

export const getSummary = ({ websiteId = null, stats = null }) => {
  return network.get('api/dashboard_stats/summary', {
    params: {
      website_id: websiteId,
      previous_summary_stats_load: stats
    }
  });
};

