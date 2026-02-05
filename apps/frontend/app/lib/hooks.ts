/**
 * Custom hook for managing applications with automatic refresh
 */

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./api";

import { Application } from "./types";

export function useApplications() {
  const router = useRouter();

  const fetchApplications = useCallback(async (): Promise<Application[]> => {
    return await getApplications();
  }, []);

  const addApplication = useCallback(
    async (
      application: Omit<Application, "id" | "user_id">,
      onRefresh?: () => void
    ) => {
      const newApp = await createApplication(application);
      // Refresh data after creating
      router.refresh();
      onRefresh?.();
      return newApp;
    },
    [router]
  );

  const editApplication = useCallback(
    async (
      applicationId: number,
      updates: Partial<Omit<Application, "id" | "user_id">>,
      onRefresh?: () => void
    ) => {
      const updated = await updateApplication(applicationId, updates);
      // Refresh data after updating
      router.refresh();
      onRefresh?.();
      return updated;
    },
    [router]
  );

  const removeApplication = useCallback(
    async (applicationId: number, onRefresh?: () => void) => {
      await deleteApplication(applicationId);
      // Refresh data after deleting
      router.refresh();
      onRefresh?.();
    },
    [router]
  );

  return {
    fetchApplications,
    addApplication,
    editApplication,
    removeApplication,
  };
}
