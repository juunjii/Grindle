import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getApplications, createApplication, deleteApplication, updateApplication } from "../api"
import type { Application } from "../types"
import { transformApplicationToJob, mapDisplayStatusToBackend } from "../utils/applicationTransformers"

export function useApplicationTracker() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch applications from backend
  const fetchApplications = useCallback(async () => {
    try {
      setError(null)
      const applications = await getApplications()
      const transformedJobs = applications.map(transformApplicationToJob)
      setJobs(transformedJobs)
    } catch (err) {
      console.error("Error fetching applications:", err)
      setError("Failed to load applications. Please check if the backend is running.")
    }
  }, [])

  // Refresh data and revalidate
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await fetchApplications()
      router.refresh()
    } finally {
      setIsRefreshing(false)
    }
  }, [fetchApplications, router])

  // Handle add application with auto-refresh
  const handleAddApplication = async (applicationData: any) => {
    try {
      await createApplication(applicationData)
      await fetchApplications()
    } catch (err) {
      console.error("Error adding application:", err)
      throw err
    }
  }

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteApplication(Number(id))
      await fetchApplications()
    } catch (err) {
      console.error("Error deleting application:", err)
      throw err
    }
  }

  const handleBulkDelete = async (selectedIds: string[], clearSelection: () => void) => {
    if (selectedIds.length === 0) return
    try {
      await Promise.all(selectedIds.map((id) => deleteApplication(Number(id))))
      clearSelection()
      await fetchApplications()
    } catch (err) {
      console.error("Error bulk deleting applications:", err)
      throw err
    }
  }

  const handleMoveStatus = async (job: any, newDisplayStatus: string) => {
    if (!job?.application) return
    const backendStatus = mapDisplayStatusToBackend(newDisplayStatus)
    try {
      await updateApplication(job.application.id, { status: backendStatus })
      await fetchApplications()
    } catch (err) {
      console.error("Error moving application status:", err)
      throw err
    }
  }

  const handleSaveDetail = async (
    id: number,
    updates: Partial<Omit<Application, "id" | "user_id">>
  ) => {
    try {
      await updateApplication(id, updates)
      await fetchApplications()
    } catch (err) {
      console.error("Error saving application details:", err)
      throw err
    }
  }

  // Fetch applications on component mount
  useEffect(() => {
    const initFetch = async () => {
      try {
        setIsLoading(true)
        await fetchApplications()
      } finally {
        setIsLoading(false)
      }
    }

    initFetch()
  }, [fetchApplications])

  return {
    jobs,
    isLoading,
    isRefreshing,
    error,
    fetchApplications,
    handleRefresh,
    handleAddApplication,
    handleDeleteApplication,
    handleBulkDelete,
    handleMoveStatus,
    handleSaveDetail,
  }
}
