/** Row shape for `public.leads` inserts (matches supabase/leads.sql). */
export type LeadInsert = {
  name: string;
  email: string;
  subject: string | null;
  event_date: string | null;
  location: string | null;
  message: string | null;
  source: string | null;
};
