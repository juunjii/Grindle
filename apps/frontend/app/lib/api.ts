import {
  Application,
  ApplicationCreate,
  ApplicationUpdate,
  StatusHistory,
  AnalyticsSummary,
  StatusDistribution,
  TimeSeriesData,
  OfferMetrics,
  API_URL
} from "./types";

// Helper to get authorization header
function getAuthHeader() {
  // Use X-User-Id header as the backend expects
  return {
    "X-User-Id": "dev-user",
  };
}

// Application CRUD
export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
}

export async function getApplication(id: number): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error("Failed to fetch application");
  return response.json();
}

export async function createApplication(
  app: ApplicationCreate
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create application: ${error}`);
  }
  return response.json();
}

export async function updateApplication(
  id: number,
  app: ApplicationUpdate
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update application: ${error}`);
  }
  return response.json();
}

export async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error("Failed to delete application");
}

// Status Management
export async function updateApplicationStatus(
  id: number,
  status: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}/status`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
}

export async function getApplicationHistory(
  id: number
): Promise<StatusHistory[]> {
  const response = await fetch(`${API_URL}/applications/${id}/history`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error("Failed to fetch history");
  return response.json();
}

// Analytics
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await fetch(`${API_URL}/applications/analytics/summary`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error("Failed to fetch analytics summary");
  return response.json();
}

export async function getStatusDistribution(): Promise<StatusDistribution> {
  const response = await fetch(
    `${API_URL}/applications/analytics/status_distribution`,
    {
      headers: getAuthHeader(),
    }
  );
  if (!response.ok) throw new Error("Failed to fetch status distribution");
  return response.json();
}

export async function getTimeSeries(): Promise<TimeSeriesData> {
  const response = await fetch(
    `${API_URL}/applications/analytics/time_series`,
    {
      headers: getAuthHeader(),
    }
  );
  if (!response.ok) throw new Error("Failed to fetch time series");
  return response.json();
}

export async function getOfferMetrics(): Promise<OfferMetrics> {
  const response = await fetch(
    `${API_URL}/applications/analytics/offer_metrics`,
    {
      headers: getAuthHeader(),
    }
  );
  if (!response.ok) throw new Error("Failed to fetch offer metrics");
  return response.json();
}
