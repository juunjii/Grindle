"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Plus, Search } from "lucide-react"

interface TrackerToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  isRefreshing: boolean
  onAddNew: () => void
}

export function TrackerToolbar({
  searchTerm,
  onSearchChange,
  onRefresh,
  isRefreshing,
  onAddNew,
}: TrackerToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="gap-2"
          title="Refresh data from server"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={onAddNew}
        >
          <Plus className="w-4 h-4" />
          Add New Application
        </Button>
      </div>
    </div>
  )
}
