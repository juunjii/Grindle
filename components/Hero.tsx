import React from "react";
import Image from "next/image"; // image optimization
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section>
      <div className="md:pt-30 md:pb-50 text-center overflow-x-hidden">
        <h1 className="text-7xl px-2 md:text-8xl py-3 font-bold tracking-tighter bg-gradient-to-b from-black to-[#604bb2] text-transparent bg-clip-text">
          Your Career, Organized. <br />
          Your Next Job, Closer!
        </h1>
        <p className="text-xl text-[#604bb2] tracking-tight mt-6 mb-6">
          Take control of your job search with intelligent tools to track
          applications.
        </p>
        <div className="flex pb-5 gap-1 items-center justify-center">
          <Button
            className="text-base py-4 md:text-lg"
            effect="shine"
            size="sm"
          >
            Get Started - its FREE!
          </Button>
          <Button
            className="text-base py-4"
            size="sm"
            variant="ghost"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
