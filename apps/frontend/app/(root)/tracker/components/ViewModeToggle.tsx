"use client"

import { Button } from "@/components/ui/button"
import { Grid3x3, List } from "lucide-react"

interface ViewModeToggleProps {
  viewMode: "kanban" | "table"
  onChange: (mode: "kanban" | "table") => void
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center border border-border rounded-lg p-1 bg-muted">
      <Button
        variant={viewMode === "kanban" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("kanban")}
        className="gap-2"
      >
        <Grid3x3 className="w-4 h-4" />
        <span className="hidden sm:inline">Kanban</span>
      </Button>
      <Button
        variant={viewMode === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("table")}
        className="gap-2"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
    </div>
  )
}
