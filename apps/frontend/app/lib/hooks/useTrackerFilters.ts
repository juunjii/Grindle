import { useState } from "react"

export function useTrackerFilters(jobs: any[]) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredJobs,
  }
}
