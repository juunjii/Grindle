"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import KanbanView from "./kanban-view";
import TableView from "./table-view";
import AnalysisModal from "./analysis-modal";
import AddApplicationDialog from "./add-application-dialog";
import ApplicationDetailDialog from "./application-detail-dialog";
import { TrackerToolbar } from "./components/TrackerToolbar";
import { TrackerControls } from "./components/TrackerControls";
import { useApplicationTracker } from "../../lib/hooks/useApplicationTracker";
import { useTrackerFilters } from "../../lib/hooks/useTrackerFilters";
import { useTrackerSelection } from "../../lib/hooks/useTrackerSelection";
import type { Application } from "../../lib/types";

export default function Tracker() {
  // UI State
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);

  // Custom Hooks
  const {
    jobs,
    isLoading,
    isRefreshing,
    error,
    handleRefresh,
    handleAddApplication,
    handleDeleteApplication,
    handleBulkDelete,
    handleMoveStatus,
    handleSaveDetail,
  } = useApplicationTracker();

  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredJobs } =
    useTrackerFilters(jobs);

  const { selectedIds, handleToggleSelect, handleToggleSelectAll, clearSelection } =
    useTrackerSelection();

  // Computed Values
  const appliedCount = jobs.filter((job) => job.status === "Applied").length;

  // Handlers
  const handleOpenDetail = (job: any) => {
    if (job?.application) {
      setActiveApplication(job.application);
      setShowDetailDialog(true);
    }
  };

  const closeDetailDialog = () => {
    setShowDetailDialog(false);
    setActiveApplication(null);
  };

  const onBulkDelete = async () => {
    await handleBulkDelete(selectedIds, clearSelection);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Error Alert */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 mb-4">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-4 h-4 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading your applications...</p>
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4">
                {/* Toolbar with search and actions */}
                <TrackerToolbar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onRefresh={handleRefresh}
                  isRefreshing={isRefreshing}
                  onAddNew={() => setShowAddDialog(true)}
                />

                {/* Controls with stats, delete, view mode, and filters */}
                <TrackerControls
                  appliedCount={appliedCount}
                  selectedCount={selectedIds.length}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  onAnalysis={() => setShowAnalysis(true)}
                  onBulkDelete={onBulkDelete}
                  isBulkDeleting={false}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {viewMode === "kanban" ? (
              <KanbanView
                jobs={filteredJobs}
                onDelete={handleDeleteApplication}
                onOpenDetail={handleOpenDetail}
                onMoveStatus={handleMoveStatus}
              />
            ) : (
              <TableView
                jobs={filteredJobs}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={() => handleToggleSelectAll(filteredJobs.map(j => j.id))}
                onRowClick={handleOpenDetail}
              />
            )}
          </div>

          {/* Modals */}
          <AnalysisModal
            isOpen={showAnalysis}
            onClose={() => setShowAnalysis(false)}
            jobs={jobs}
          />

          <AddApplicationDialog
            isOpen={showAddDialog}
            onClose={() => setShowAddDialog(false)}
            onAdd={handleAddApplication}
          />

          <ApplicationDetailDialog
            isOpen={showDetailDialog}
            onClose={closeDetailDialog}
            application={activeApplication}
            onSave={handleSaveDetail}
          />
        </>
      )}
    </main>
  );
}
