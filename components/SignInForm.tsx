"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(searchParams);
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

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

      <button onClick={handleSubmit}>Sign in</button>

      <p>{message}</p>
    </div>
  );
};

export default SignInForm;
