"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface Props {
  session: Session | null;
}

export default function DropDown({ session }: Props) {
  return (
    <>
      {session ? (
        <div>
          <h1
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </h1>
        </div>
      ) : (
        <div onClick={() => signIn()}> Sign In</div>
      )}
    </>
  );
}
