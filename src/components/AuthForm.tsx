import React from "react";
import { FormMode, UserCredentials, useAuth } from "../context/AuthContext";

export interface AuthFormProps {
  formMode: FormMode;
}

const AuthForm: React.FC<AuthFormProps> = ({ formMode }) => {
  const { handleAuth } = useAuth();
  const [credentials, setCredentials] = React.useState<UserCredentials>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.email !== "" && credentials.password !== "") {
      handleAuth(credentials, formMode);
    }
    setCredentials({ email: "", password: "" });
  };
  return (
    <form
      className="flex flex-col w-60 border-2 p-2 bg-slate-600 gap-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        value={credentials.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={credentials.password}
        onChange={handleInputChange}
        required
      />
      <button className="bg-red-400" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
