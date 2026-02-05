"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, ChevronDown, CalendarIcon } from "lucide-react";
import type { Application } from "../../lib/types";

interface ApplicationDetailDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: number,
    updates: Partial<Omit<Application, "id" | "user_id">>
  ) => Promise<void>;
}

const statusOptions = [
  { value: "APPLIED", label: "Applied" },
  { value: "SAVED", label: "Saved" },
  { value: "INTERVIEW", label: "Interviewing" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
];

export default function ApplicationDetailDialog({
  application,
  isOpen,
  onClose,
  onSave,
}: ApplicationDetailDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateApplied, setDateApplied] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    status: "APPLIED" as Application["status"],
    location: "",
    job_link: "",
    source: "",
    salary: "",
    notes: "",
  });

  useEffect(() => {
    if (application) {
      setFormData({
        company_name: application.company_name || "",
        role: application.role || "",
        status: (application.status as Application["status"]) || "APPLIED",
        location: application.location || "",
        job_link: application.job_link || "",
        source: application.source || "",
        salary: application.salary || "",
        notes: application.notes || "",
      });
      setDateApplied(
        application.date_applied
          ? new Date(application.date_applied)
          : undefined
      );
    }
  }, [application]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;
    setIsSubmitting(true);
    try {
      const updates: Partial<Omit<Application, "id" | "user_id">> = {
        ...formData,
        date_applied: dateApplied
          ? dateApplied.toISOString().split("T")[0]
          : undefined,
      };
      await onSave(application.id, updates);
      onClose();
    } catch (error) {
      console.error("Failed to update application", error);
      alert("Failed to update application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Application Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input
                required
                value={formData.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
                placeholder="Company"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role/Position</label>
              <Input
                required
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Role"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {statusOptions.find((s) => s.value === formData.status)
                      ?.label || "Select Status"}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {statusOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleChange("status", option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Applied</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateApplied
                      ? dateApplied.toLocaleDateString("en-GB")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateApplied}
                    onSelect={setDateApplied}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Input
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Link</label>
              <Input
                value={formData.job_link}
                onChange={(e) => handleChange("job_link", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Salary</label>
              <Input
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Notes about this application"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
