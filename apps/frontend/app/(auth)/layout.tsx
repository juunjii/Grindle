import { Banner } from "@/app/components/index";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div
            className="absolute bottom-0 left-0 right-0 top-0"
            style={{
              background:
                "radial-gradient(circle 800px at 100% 200px, oklch(0.79 0.05 194), transparent)",
            }}
          ></div>
        </div>
        <Banner />
        <div className="auth-layout"> {children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
