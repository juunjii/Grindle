"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthForm = () => {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";
  return (
    <>
      <div className="md:w-lg bg-white/20 shadow-lg ring-1 ring-black/5 rounded-sm flex flex-col justify-center px-6 pb-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isSignUp ? "Create an account" : "Log in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className={`${isSignUp ? "visible" : "hidden"}`}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="fname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className={`${isSignUp ? "visibile" : "hidden"}`}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="lname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-mint-500 hover:text-mint-300"
                  >
                    {isSignUp ? "" : "Forgot password?"}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-mint-500 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-mint-300"
              >
                {isSignUp ? "Sign Up" : "Log in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isSignUp ? "Already have an account?" : "Not a member?"}{" "}
            <Link
              href={`${isSignUp ? "/login" : "/sign-up"}`}
              className="font-semibold text-mint-500 hover:text-mint-300"
            >
              {isSignUp ? "Log in" : "Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
