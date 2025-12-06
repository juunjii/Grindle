"use client";

import React from "react";
import Link from "next/link";
import { FormField } from "@/app/components/index";

const AuthForm = ({ mode }: { mode: "sign-up" | "login" }) => {
  const isSignUp = mode === "sign-up";
  return (
    <>
      <div className="md:w-lg bg-white/0 backdrop-blur-sm shadow-lg ring-1 ring-black/5 rounded-sm flex flex-col justify-center px-6 pb-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isSignUp ? "Create an account" : "Log in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {isSignUp && (
              <FormField
                label="First Name"
                type="text"
                name="fname"
                isSignUp={isSignUp}
              />
            )}
            {isSignUp && (
              <FormField
                label="Last Name"
                type="text"
                name="lname"
                isSignUp={isSignUp}
              />
            )}
            <FormField
              label="Email address"
              type="email"
              name="email"
              isSignUp={isSignUp}
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              isSignUp={isSignUp}
            />
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
