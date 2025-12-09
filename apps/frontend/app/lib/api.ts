const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface Application {
  id: number
  position: string
  company: string
  status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected"
  dateSaved: string
  dateApplied?: string
  location?: string
  job_title?: string
  job_link?: string
  notes?: string
  user_id?: string
  last_updated: string
}

export interface ApplicationCreate {
  company: string
  position: string
  job_title?: string
  job_link?: string
  location?: string
  status?: string
  dateApplied?: string
  notes?: string
}

export interface ApplicationUpdate {
  company?: string
  position?: string
  job_title?: string
  job_link?: string
  location?: string
  status?: string
  dateApplied?: string
  notes?: string
}

export interface StatusHistory {
  id: number
  application_id: number
  previous_status?: string
  new_status: string
  timestamp: string
}

export interface AnalyticsSummary {
  total_applications: number
  applications_this_week: number
  applications_this_month: number
  applied_count: number
  interviewing_count: number
  offer_count: number
  rejected_count: number
  saved_count: number
  average_days_to_apply: number
}

export interface StatusDistribution {
  total_applications: number
  by_status: Array<{ status: string; count: number }>
}

export interface TimeSeriesData {
  data: Array<{ week: string; count: number }>
}

export interface OfferMetrics {
  total_applications: number
  total_offers: number
  offer_rate: number
}

// Helper to get authorization header
function getAuthHeader() {
  // In a real app, this would get the JWT token from auth
  const token = localStorage.getItem("auth_token") || "demo-user-123"
  return {
    Authorization: `Bearer ${token}`,
  }
}

// Application CRUD
export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch applications")
  return response.json()
}

export async function getApplication(id: number): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch application")
  return response.json()
}

export async function createApplication(app: ApplicationCreate): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
  })
  if (!response.ok) throw new Error("Failed to create application")
  return response.json()
}

export async function updateApplication(id: number, app: ApplicationUpdate): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
  })
  if (!response.ok) throw new Error("Failed to update application")
  return response.json()
}

export async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to delete application")
}

// Status Management
export async function updateApplicationStatus(id: number, status: string): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}/status`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error("Failed to update status")
  return response.json()
}

export async function getApplicationHistory(id: number): Promise<StatusHistory[]> {
  const response = await fetch(`${API_URL}/applications/${id}/history`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch history")
  return response.json()
}

// Analytics
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await fetch(`${API_URL}/applications/analytics/summary`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch analytics summary")
  return response.json()
}

export async function getStatusDistribution(): Promise<StatusDistribution> {
  const response = await fetch(`${API_URL}/applications/analytics/status_distribution`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch status distribution")
  return response.json()
}

export async function getTimeSeries(): Promise<TimeSeriesData> {
  const response = await fetch(`${API_URL}/applications/analytics/time_series`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch time series")
  return response.json()
}

export async function getOfferMetrics(): Promise<OfferMetrics> {
  const response = await fetch(`${API_URL}/applications/analytics/offer_metrics`, {
    headers: getAuthHeader(),
  })
  if (!response.ok) throw new Error("Failed to fetch offer metrics")
  return response.json()
}
