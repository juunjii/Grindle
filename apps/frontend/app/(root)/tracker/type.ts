import type { Application } from "../../lib/types";

export interface Job {
  id: string;
  position: string;
  company: string;
  status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected";
  dateSaved: string;
  dateApplied?: string;
  location: string;
  deadline?: string;
  job_link?: string;
  source?: string;
  salary?: string;
  notes?: string;
  application?: Application;
}

