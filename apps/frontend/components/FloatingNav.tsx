import React from "react";
import { ChartLine, NotebookPen, BriefcaseBusiness } from "lucide-react";

export function FloatingNav() {
  return (
    <div className="flex justify-center sticky top-30">
      <nav className="rounded-xl px-6 flex gap-10 text-black/30 text-xl bg-[#f7f7f7]">
        <a className="floating-nav text-base py-5" href="#job-tracker">
          <span className="flex justify-center">
            <NotebookPen />
          </span>
          <span>Job Tracker</span>
        </a>

        <a className="floating-nav text-base py-5 " href="#job-search">
          <span className="flex justify-center">
            <BriefcaseBusiness />
          </span>
          <span className="">Job Search</span>
        </a>
        <a className="floating-nav text-base py-5" href="#analytics">
          <span className="flex justify-center">
            <ChartLine />
          </span>
          <span>Analytics</span>
        </a>
      </nav>
    </div>
  );
}
