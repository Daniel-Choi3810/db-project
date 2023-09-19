"use client";
import GoogleButton from "react-google-button";
import { Button } from "@/components/ui/button";

import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <GoogleButton onClick={() => signIn()} />
        </div>
      )}
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
