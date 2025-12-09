"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const HeaderProduct = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu when viewport is at or above the md breakpoint (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "About", href: "#" },
    { name: "Insights", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Help", href: "#help" },
  ];

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="z-5 top-0 sticky backdrop-blur-sm">
      <div className={`${isMenuOpen ? "pt-5 pb-100 " : "py-5"} `}>
        <div className="flex items-center md:gap-10 justify-between px-8 md:justify-self-center">
          <Link href="#">
            <Image
              className="hover:scale-105 transition-all h-auto"
              src="/grindle.svg"
              alt="grindle-logo"
              height={40}
              width={180}
            />
          </Link>
          <Image
            onClick={handleMenuClick}
            src="/menu.svg"
            alt="menu"
            height={20}
            width={20}
            className="md:hidden cursor-pointer"
          />
          <div
            className={`small-nav ${
              isMenuOpen ? "opacity-100" : "opacity-0 invisible"
            }`}
          >
            <ul className="small-nav-item">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMenuClick}
                >
                  <li className="list-none w-full text-center p-4 cursor-pointer">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <nav className="navbar gap-10">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <li className="list-none floating-nav">{item.name}</li>
              </Link>
            ))}
          </nav>
          <nav className="navbar gap-2">
            <Button
              className="text-lg  p-4 bg-[#E8DB7D] text-black hover:bg-[#D6C965]"
              effect="ringHover"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button
              className="text-lg  p-4 bg-[#21A0A0] text-black hover:bg-[#1F8C8C]"
              effect="ringHover"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
