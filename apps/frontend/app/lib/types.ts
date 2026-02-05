export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export interface Application {
  id: number;
  company_name: string;
  user_id: string;
  role: string;
  status: "APPLIED" | "SAVED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN" | "GHOSTED";
  location?: string;
  job_link?: string;
  source?: string;
  salary?: string;
  date_applied: string;
  notes?: string;
}

export interface ApplicationCreate {
  company_name: string;
  role: string;
  status?: string;
  location?: string;
  job_link?: string;
  source?: string;
  salary?: string;
  date_applied: string;
  notes?: string;
  user_id?: string;
}

export interface ApplicationUpdate {
  company_name?: string;
  role?: string;
  status?: string;
  location?: string;
  job_link?: string;
  source?: string;
  salary?: string;
  date_applied?: string;
  notes?: string;
}

export interface StatusHistory {
  id: number;
  application_id: number;
  previous_status?: string;
  new_status: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  total_applications: number;
  applications_this_week: number;
  applications_this_month: number;
  applied_count: number;
  interviewing_count: number;
  offer_count: number;
  rejected_count: number;
  saved_count: number;
  average_days_to_apply: number;
}

export interface StatusDistribution {
  total_applications: number;
  by_status: Array<{ status: string; count: number }>;
}

export interface TimeSeriesData {
  data: Array<{ week: string; count: number }>;
}

export interface OfferMetrics {
  total_applications: number;
  total_offers: number;
  offer_rate: number;
}
