import React from "react";
import Image from "next/image"; // image optimization
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="container">
      <section>
        <div className="px-30 py-32 sm:py-48 lg:py-60 ">
          {/* "bg-[#046865] */}
          {/* bg-[#82cac8] */}
          <div className="text-center">
            <h1 className="text-8xl py-1 font-bold tracking-tighter bg-gradient-to-b from-black to-[#604bb2] text-transparent bg-clip-text">
              Your Career, Organized. <br />
              Your Next Job, Closer!
            </h1>
            <p className="text-xl text-[#604bb2] tracking-tight mt-6 mb-6">
              Take control of your job search with intelligent tools to track
              applications.
            </p>
            <div className="flex gap-1 items-center justify-center">
              <Button className="text-lg" effect="shine" size="lg">
                Get Started - its FREE!
              </Button>
              <Button
                className="text-lg"
                size="lg"
                variant="ghost"
                effect="expandIcon"
                icon={ArrowRight}
                iconPlacement="right"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
