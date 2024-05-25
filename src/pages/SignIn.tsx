import React from "react";
import { AuthForm } from "../components";
import { FormMode } from "../context/AuthContext";

const SignIn = () => {
  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      <h1>Sign-in Page</h1>
      <AuthForm formMode={FormMode.SIGNIN} />
    </div>
  );
};

export default SignIn;
