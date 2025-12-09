import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Banner() {
  return (
    <>
      <div className ="flex justify-center pt-5 md:justify-start md:pl-5">
        <Link href="/">
          <Image
            className="hover:scale-105 transition-all"
            src="/grindle.svg"
            alt="grindle-logo"
            height={40}
            width={180}
          />
        </Link>
      </div>
    </>
  );
}