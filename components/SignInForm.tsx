"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/jobs");
    }
  }, [status]);

  const router = useRouter();

  const handleSubmit = async () => {
    setMessage("Signing in...");
    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      setMessage(err as string);
    }

    setMessage(message);
  };

  return (
    <>
      <div className="space-y-32">
        <h1 className="text-center font-bold text-4xl">
          Welcome Back to FootStomp!
        </h1>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            FootStomp
          </h1>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Email:</span>
              </label>
              <input
                className="w-full input input-bordered"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password:</span>
              </label>
              <input
                className="w-full input input-bordered"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={handleSubmit} className="btn btn-block">
                Sign In
              </Button>
            </div>
            <p className="text-center">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
