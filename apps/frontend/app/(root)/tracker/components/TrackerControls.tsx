"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Trash2, BarChart3 } from "lucide-react"
import { ViewModeToggle } from "./ViewModeToggle"
import { StatusFilterDropdown } from "./StatusFilterDropdown"

interface TrackerControlsProps {
  appliedCount: number
  selectedCount: number
  viewMode: "kanban" | "table"
  onViewModeChange: (mode: "kanban" | "table") => void
  statusFilter: string | null
  onStatusFilterChange: (status: string | null) => void
  onAnalysis: () => void
  onBulkDelete: () => void
  isBulkDeleting: boolean
}

export function TrackerControls({
  appliedCount,
  selectedCount,
  viewMode,
  onViewModeChange,
  statusFilter,
  onStatusFilterChange,
  onAnalysis,
  onBulkDelete,
  isBulkDeleting,
}: TrackerControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Stats and Delete Button */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Applied: <span className="text-primary font-bold">{appliedCount}</span> Jobs
        </span>
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            size="icon"
            disabled={isBulkDeleting}
            onClick={onBulkDelete}
            title={`Delete ${selectedCount} selected application${selectedCount > 1 ? "s" : ""}`}
          >
            {isBulkDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-2">
        <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
        <StatusFilterDropdown value={statusFilter} onChange={onStatusFilterChange} />
        <Button onClick={onAnalysis} variant="outline" size="sm" className="gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Analysis</span>
        </Button>
      </div>
    </div>
  )
}
