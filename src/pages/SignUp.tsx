import React from "react";
import { FormMode } from "../context/AuthContext";
import { AuthForm } from "../components";

const SignUp = () => {
  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      <h1>Sign-up Page</h1>
      <AuthForm formMode={FormMode.SIGNUP} />
    </div>
  );
};

export default SignUp;
