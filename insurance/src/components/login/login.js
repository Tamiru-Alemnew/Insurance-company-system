"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function LoginForm() {
  const router = useRouter();
  const [UserId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(e) {
    e.preventDefault();
    const signInAPI = "/api/login";

    const response = await fetch(signInAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: UserId, password: password }),
    });

    if (!response.ok) {
      toast.error("Invalid Credential");
      return;
    }
    toast.success("Login Successful");
    const user = await response.json();
    localStorage.setItem("name", user.name);
    localStorage.setItem("UserId", UserId);
    router.push("/portal/policy");
  }

  return (
    <div className="bg-gray-200 w-11/12 mx-auto my-32 p-8 rounded-md flex gap-6 justify-evenly flex-wrap">
      <div className="min-w-2/5">
        <h1 className="font-bold text-xl">Policyowner Log in</h1>
        <form className="flex flex-col gap-4 w-max my-5" onSubmit={signIn}>
          <div className="flex gap-4 justify-end">
            <label className="font-semibold">User ID</label>
            <input
              onChange={(e) => setUserId(e.target.value)}
              value={UserId}
              type="username"
              name="UserId"
              required
              className="border-2 rounded-sm border-blue-200"
            />
          </div>
          <div className="flex gap-4 justify-end">
            <label className="font-semibold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              type="password"
              required
              className="border-2 rounded-sm border-blue-200"
            />
          </div>
          <button className="bg-blue-500 w-max rounded-xl py-2 px-6 font-bold text-white self-end">
            Login
          </button>
        </form>
        <p className="text-sm">
          Forgot <span className="text-blue-500">User ID</span> or{" "}
          <span className="text-blue-500">Password</span>?
        </p>
      </div>
      <div className="flex flex-col gap-3 md:w-2/5">
        <h1 className="font-bold text-xl">First Time User</h1>
        <p className="text-sm">
          This secured website is for Life Insurance Policyowners only. If you
          don't have a policy in our company, please complete our short
          registration process, we would like to have you on board.
        </p>
        <button
          className="bg-blue-500 w-max rounded-xl py-2 px-6 font-bold text-white self-end"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
