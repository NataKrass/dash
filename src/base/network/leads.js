import network from './index';

export const geAllLeads = ({
  page = 1,
  gaViewId = null,
  startDate = null,
  endDate = null,
  leads_order = null,
  queue_id = null,
  q = null,
  per_page = null,
  ...rest
}) => {
  return network.get('/api/leads', {
    params: {
      page,
      leads_order,
      queue_id,
      q,
      min_date: startDate,
      max_date: endDate,
      ga_view_id: +gaViewId,
      per_page,
      ...rest,
    },
  });
};

export const getLeadById = (id) => {
  return network.get(`/api/lead/${id}`);
};

export const getLeadCompany = (id) => {
  return network.get(`/api/lead/${id}/company`);
};

export const getLeadVisits = (id) => {
  return network.get(`/api/lead/${id}/visits`);
};

export const getLeadContacts = (id) => {
  return network.get(`/api/lead/${id}/contacts`);
};

export const getLeadNotes = (id) => {
  return network.get(`/api/lead/${id}/notes`);
};

export const postLeadNotes = (id, title, body ) => {
  return network.post(`/api/lead/${id}/notes`, 
    title,
    body
  );
};

export const exportLead = (ga_view_id, selected_ids, export_type) => {
  return network.post(`/api/leads/export`, 
    ga_view_id, selected_ids, export_type
  );
};