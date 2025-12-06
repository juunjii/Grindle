"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Job } from "./mock-data"
import { useMemo } from "react"

interface AnalysisModalProps {
  isOpen: boolean
  onClose: () => void
  jobs: Job[]
}

export default function AnalysisModal({ isOpen, onClose, jobs }: AnalysisModalProps) {
  const chartData = useMemo(() => {
    // Applications over time
    const jobsByDate: Record<string, number> = {}
    jobs.forEach((job) => {
      const date = new Date(job.dateApplied || job.dateSaved).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      jobsByDate[date] = (jobsByDate[date] || 0) + 1
    })

    return Object.entries(jobsByDate)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, count]) => ({ date, applications: count }))
  }, [jobs])

  const statusBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {
      Saved: 0,
      Applied: 0,
      Interviewing: 0,
      Offer: 0,
      Rejected: 0,
    }
    jobs.forEach((job) => {
      breakdown[job.status]++
    })
    return Object.entries(breakdown).map(([status, count]) => ({ status, count }))
  }, [jobs])

  const interviewRate = useMemo(() => {
    if (jobs.length === 0) return 0
    const interviewing = jobs.filter((j) => j.status === "Interviewing" || j.status === "Offer").length
    return Math.round((interviewing / jobs.length) * 100)
  }, [jobs])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Application Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Applications</p>
              <p className="text-3xl font-bold text-primary">{jobs.length}</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Interview Rate</p>
              <p className="text-3xl font-bold text-primary">{interviewRate}%</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Active Offers</p>
              <p className="text-3xl font-bold text-primary">{jobs.filter((j) => j.status === "Offer").length}</p>
            </div>
          </div>

          {/* Applications Over Time */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Applications Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Breakdown */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="status" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
