import React from "react";
import Image from "next/image"; // image optimization
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="pt-36 padding-x bg-[#046865]">
          <h1>Your Career, Organized. Your Next Job, Closer!</h1>
          <p>
            Take control of your job search with intelligent tools to track
            applications.
          </p>
          <div className="flex gap-4 tracking-tight">
            <Button effect="gooeyLeft">Gooey right</Button>
            <Button
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
  );
};

export default Hero;
