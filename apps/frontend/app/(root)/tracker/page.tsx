"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Grid3x3, List, BarChart3, Plus, Search, Filter } from "lucide-react"
import DashboardHeader from "./dashboard-header"
import KanbanView from "./kanban-view"
import TableView from "./table-view"
import AnalysisModal from "./analysis-modal"
import { mockJobs } from "./mock-data"

export default function Tracker() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [jobs, setJobs] = useState(mockJobs)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const appliedCount = jobs.filter((job) => job.status === "Applied").length

  return (
    <main className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}

      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Top Section: Search and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="w-4 h-4" />
                Add New Application
              </Button>
            </div>

            {/* View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Applied: <span className="text-primary font-bold">{appliedCount}</span> Jobs
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex items-center border border-border rounded-lg p-1 bg-muted">
                  <Button
                    variant={viewMode === "kanban" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                    className="gap-2"
                  >
                    <Grid3x3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Kanban</span>
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="gap-2"
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Table</span>
                  </Button>
                </div>

                {/* Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Saved")}>Saved</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Applied")}>Applied</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Interviewing")}>Interviewing</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Offer")}>Offer</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>Rejected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Analysis Button */}
                <Button onClick={() => setShowAnalysis(true)} variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analysis</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {viewMode === "kanban" ? <KanbanView jobs={filteredJobs} /> : <TableView jobs={filteredJobs} />}
      </div>

      {/* Analysis Modal */}
      <AnalysisModal isOpen={showAnalysis} onClose={() => setShowAnalysis(false)} jobs={jobs} />
    </main>
  )
}
