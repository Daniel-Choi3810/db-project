"use client";

import { signUp } from "@/app/actions/users/signUp";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpForm = () => {
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
    setMessage("Signing up...");
    await signUp(email, password);
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
    }

    setMessage(message);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-400 p-4">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Sign up</button>

      <p>{message}</p>
    </div>
  );
};

export default SignUpForm;
