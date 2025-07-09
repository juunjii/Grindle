import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="z-5 mx-auto sticky top-0 backdrop-blur-sm">
      <div className="py-5 px-10 md:px-4">
        <div className="flex items-center gap-2 md:gap-10 justify-between justify-self-center">
          <Image
            src="/grindle.svg"
            alt="grindle-logo"
            height={40}
            width={180}
          />
          <Image
            src="/menu.svg"
            alt="menu"
            height={20}
            width={20}
            className="md:hidden"
          />
          <nav className="navbar gap-10">
            <a className="anchor" href="#">
              About
            </a>
            <a className="anchor" href="#features">
              Features
            </a>
            <a className="anchor" href="#">
              Insights
            </a>
            <a className="anchor" href="#help">
              Help
            </a>
          </nav>
          <nav className="navbar gap-2">
            <Button
              className="text-xl font-bold p-6 bg-[#E8DB7D] text-black hover:bg-[#D6C965]"
              effect="ringHover"
            >
              Sign Up
            </Button>
            <Button
              className="text-xl font-bold p-6 bg-[#21A0A0] text-white hover:bg-[#1F8C8C]"
              effect="ringHover"
            >
              Log In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
