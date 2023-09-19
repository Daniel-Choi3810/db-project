import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthText() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div>
          <h1
            onClick={() => {
              signOut();
            }}
          >
            Sign Out {session.user?.name}
          </h1>
        </div>
      ) : (
        <div onClick={() => signIn()}> Sign In</div>
      )}
    </>
  );
}

export default function DropDown() {
  const { data: session } = useSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">Profile</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {session ? session.user?.name : "Signed Out"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={session ? () => signOut() : () => signIn()}
          >
            {session ? <h1>Sign Out</h1> : <h1>Sign In</h1>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
