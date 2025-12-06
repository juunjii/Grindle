export interface Job {
  id: string
  position: string
  company: string
  status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected"
  dateSaved: string
  dateApplied?: string
  location: string
  deadline?: string
}

export const mockJobs: Job[] = [
  {
    id: "1",
    position: "Senior Frontend Engineer",
    company: "TechCorp",
    status: "Applied",
    dateSaved: "2024-11-15",
    dateApplied: "2024-11-18",
    location: "San Francisco, CA",
    deadline: "2024-12-15",
  },
  {
    id: "2",
    position: "Full Stack Developer",
    company: "StartupXYZ",
    status: "Interviewing",
    dateSaved: "2024-11-10",
    dateApplied: "2024-11-12",
    location: "Remote",
    deadline: "2024-12-10",
  },
  {
    id: "3",
    position: "React Developer",
    company: "CloudServices Inc",
    status: "Saved",
    dateSaved: "2024-12-01",
    location: "New York, NY",
  },
  {
    id: "4",
    position: "Product Engineer",
    company: "InnovateTech",
    status: "Applied",
    dateSaved: "2024-11-20",
    dateApplied: "2024-11-22",
    location: "Austin, TX",
    deadline: "2024-12-20",
  },
  {
    id: "5",
    position: "Software Engineer",
    company: "DataSystems",
    status: "Offer",
    dateSaved: "2024-11-05",
    dateApplied: "2024-11-08",
    location: "Boston, MA",
    deadline: "2024-12-05",
  },
  {
    id: "6",
    position: "Backend Engineer",
    company: "OldCorp",
    status: "Rejected",
    dateSaved: "2024-10-30",
    dateApplied: "2024-11-01",
    location: "Seattle, WA",
  },
  {
    id: "7",
    position: "DevOps Engineer",
    company: "CloudNative",
    status: "Interviewing",
    dateSaved: "2024-11-18",
    dateApplied: "2024-11-20",
    location: "Remote",
    deadline: "2024-12-18",
  },
  {
    id: "8",
    position: "JavaScript Developer",
    company: "WebStudio",
    status: "Applied",
    dateSaved: "2024-11-25",
    dateApplied: "2024-11-26",
    location: "Los Angeles, CA",
  },
  {
    id: "9",
    position: "Senior Software Engineer",
    company: "TechLeader",
    status: "Saved",
    dateSaved: "2024-12-02",
    location: "Mountain View, CA",
  },
]
