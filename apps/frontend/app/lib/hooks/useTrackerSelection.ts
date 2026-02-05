import { useState } from "react"

export function useTrackerSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleToggleSelectAll = (visibleJobIds: string[]) => {
    const allSelected = visibleJobIds.every((id) => selectedIds.includes(id))
    setSelectedIds(allSelected ? [] : visibleJobIds)
  }

  const clearSelection = () => setSelectedIds([])

  return {
    selectedIds,
    handleToggleSelect,
    handleToggleSelectAll,
    clearSelection,
  }
}
