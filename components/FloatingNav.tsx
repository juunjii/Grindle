import React from "react";
import { ChartLine, NotebookPen, BriefcaseBusiness } from "lucide-react";

function FloatingNav() {
  return (
    <div className="sticky top-30 w-sm">
      <nav className="px-20 md:flex gap-10 text-black/60 text-xl items-center bg-[#f7f7f7]">
        <a className="text-base py-5" href="#">
          <span>
            <NotebookPen />
          </span>
          <span>Job Tracker</span>
        </a>

        <a className="" href="#">
          <span className="text-center">
            <BriefcaseBusiness />
          </span>
          <span>Job Search</span>
        </a>
        <a className="" href="#">
          <span>
            <ChartLine />
          </span>
          <span>Analytics</span>
        </a>
      </nav>
    </div>
  );
}

export default FloatingNav;
