import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0">
      <div className="py-5 px-10 md:px-30 items-center">
        <div className="flex items-center justify-between">
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
          <nav className="hidden md:flex gap-10 text-black/60 text-xl items-center justify-self-end">
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Insights</a>
            <a href="#">Help</a>
          </nav>
          <nav className="hidden md:flex gap-6 text-black/60 text-xl items-center justify-seld-end">
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
