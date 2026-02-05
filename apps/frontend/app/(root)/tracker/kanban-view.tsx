"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Job } from "./type";

const statuses = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];

interface KanbanViewProps {
  jobs: Job[];
  onDelete: (id: string) => void;
  onOpenDetail: (job: Job) => void;
  onMoveStatus: (job: Job, newStatus: string) => void;
}

export default function KanbanView({
  jobs,
  onDelete,
  onOpenDetail,
  onMoveStatus,
}: KanbanViewProps) {
  const getJobsByStatus = (status: string) => {
    return jobs.filter((job) => job.status === status);
  };

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
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statuses.map((status) => {
        const statusJobs = getJobsByStatus(status);
        return (
          <div
            key={status}
            className="flex flex-col gap-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const jobId = e.dataTransfer.getData("text/plain");
              const job = jobs.find((j) => j.id === jobId);
              if (job && job.status !== status) {
                onMoveStatus(job, status);
              }
            }}
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-foreground">{status}</h3>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                {statusJobs.length}
              </span>
            </div>
            <div className="space-y-3">
              {statusJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-md transition-shadow cursor-pointer relative group"
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", job.id)
                  }
                  onClick={() => onOpenDetail(job)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(job.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm line-clamp-2">
                          {job.position}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge className={`text-xs ${getStatusColor(status)}`}>
                          {status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(job.dateSaved).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {statusJobs.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground border border-dashed border-border rounded">
                  No jobs yet
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
