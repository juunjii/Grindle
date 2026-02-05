import type { Application } from "../types"

export function mapBackendStatus(status: string): string {
  const statusMap: Record<string, string> = {
    APPLIED: "Applied",
    SAVED: "Saved",
    INTERVIEW: "Interviewing",
    OFFER: "Offer",
    REJECTED: "Rejected",
    WITHDRAWN: "Withdrawn",
    GHOSTED: "Ghosted",
  }
  return statusMap[status] || status
}

export function mapDisplayStatusToBackend(status: string): Application["status"] {
  const inverse: Record<string, Application["status"]> = {
    Applied: "APPLIED",
    Saved: "SAVED",
    Interviewing: "INTERVIEW",
    Offer: "OFFER",
    Rejected: "REJECTED",
  }
  return inverse[status] || "APPLIED"
}

export function transformApplicationToJob(app: Application) {
  return {
    id: String(app.id),
    position: app.role,
    company: app.company_name,
    status: mapBackendStatus(app.status),
    dateSaved: new Date(app.date_applied).toISOString().split("T")[0],
    dateApplied: app.date_applied,
    location: app.location || "Remote",
    deadline: undefined,
    job_link: app.job_link,
    source: app.source,
    salary: app.salary,
    notes: app.notes,
    application: app,
  }
}
