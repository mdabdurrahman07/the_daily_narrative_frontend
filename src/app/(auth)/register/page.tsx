import React from "react";
import RegisterForm from "../_authComponents/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-gray-500">
              Register Your Account For Free!
            </p>
          </div>
          {/* FORM */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
