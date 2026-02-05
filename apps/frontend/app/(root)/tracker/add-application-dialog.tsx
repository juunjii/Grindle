"use client";

import { useState } from "react";
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
import { ChevronDown, Loader2, CalendarIcon } from "lucide-react";

interface AddApplicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (application: {
    company_name: string;
    role: string;
    status: string;
    location?: string;
    job_link?: string;
    source?: string;
    salary?: string;
    date_applied: string;
    notes?: string;
  }) => Promise<void>;
}

const statusOptions = [
  { value: "APPLIED", label: "Applied" },
  { value: "SAVED", label: "Saved" },
  { value: "INTERVIEW", label: "Interviewing" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
];

export default function AddApplicationDialog({
  isOpen,
  onClose,
  onAdd,
}: AddApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateApplied, setDateApplied] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    status: "APPLIED",
    location: "",
    job_link: "",
    source: "",
    salary: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only send non-empty optional fields
      const payload: any = {
        company_name: formData.company_name,
        role: formData.role,
        status: formData.status,
        date_applied:
          dateApplied?.toISOString().split("T")[0] ||
          new Date().toISOString().split("T")[0],
      };

      if (formData.location) payload.location = formData.location;
      if (formData.job_link) payload.job_link = formData.job_link;
      if (formData.source) payload.source = formData.source;
      if (formData.salary) payload.salary = formData.salary;
      if (formData.notes) payload.notes = formData.notes;

      await onAdd(payload);

      // Reset form and close
      setDateApplied(new Date());
      setFormData({
        company_name: "",
        role: "",
        status: "APPLIED",
        location: "",
        job_link: "",
        source: "",
        salary: "",
        notes: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding application:", error);
      alert("Failed to add application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Company Name <span className="text-destructive">*</span>
              </label>
              <Input
                required
                placeholder="e.g., Google"
                value={formData.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Role/Position <span className="text-destructive">*</span>
              </label>
              <Input
                required
                placeholder="e.g., Software Engineer"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status <span className="text-destructive">*</span>
              </label>
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
              <label className="text-sm font-medium">
                Date Applied <span className="text-destructive">*</span>
              </label>
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

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Remote, San Francisco"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Input
                placeholder="e.g., LinkedIn, Indeed"
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Link</label>
              <Input
                type="url"
                placeholder="https://example.com/job"
                value={formData.job_link}
                onChange={(e) => handleChange("job_link", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Salary</label>
              <Input
                placeholder="e.g., $100k-$120k"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background"
              placeholder="Additional notes about this application..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
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
                  Adding...
                </>
              ) : (
                "Add Application"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
