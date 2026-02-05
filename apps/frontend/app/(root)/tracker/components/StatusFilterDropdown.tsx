"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface StatusFilterDropdownProps {
  value: string | null
  onChange: (status: string | null) => void
}

export function StatusFilterDropdown({ value, onChange }: StatusFilterDropdownProps) {
  const statuses = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange(null)}>All Statuses</DropdownMenuItem>
        {statuses.map((status) => (
          <DropdownMenuItem key={status} onClick={() => onChange(status)}>
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
