"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Job } from "./type";

interface TableViewProps {
  jobs: Job[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onRowClick: (job: Job) => void;
}

export default function TableView({
  jobs,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
}: TableViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Applied":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Interviewing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-[48px]">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={jobs.length > 0 && selectedIds.length === jobs.length}
                onChange={onToggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Saved</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => {
            const isSelected = selectedIds.includes(job.id);
            return (
              <TableRow
                key={job.id}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => onRowClick(job)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={isSelected}
                    onChange={() => onToggleSelect(job.id)}
                    aria-label={`Select job ${job.position}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{job.position}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${getStatusColor(job.status)}`}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(job.dateSaved).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {job.dateApplied
                    ? new Date(job.dateApplied).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  {job.deadline
                    ? new Date(job.deadline).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {jobs.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No jobs found
        </div>
      )}
    </div>
  );
}
