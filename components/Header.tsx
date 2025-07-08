import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg- sticky top-0 backdrop-blur-sm">
      <div className="py-5 px-10 md:px-15 items-center">
        <div className="flex items-center gap-3 justify-between">
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
            <a className="anchor" href="#">
              Features
            </a>
            <a className="anchor" href="#">
              Insights
            </a>
            <a className="anchor" href="#">
              Help
            </a>
          </nav>
          <nav className="navbar gap-6">
            <button className="auth-button bg-[#E8DB7D] text-black">
              Sign Up
            </button>
            <button className="auth-button bg-[#21A0A0] text-white">
              Log In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
