import { Banner } from "@/components/index";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Banner />
      <div className="auth-layout"> {children}</div>
    </div>
  );
};

export default AuthLayout;
