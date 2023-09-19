"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import DropDown from "./DropDown";

export default function NavMenu() {
  return (
    <>
      <NavigationMenu className="my-1">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <h1 className="font-bold p-4">Foot Stomp</h1>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropDown />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/jobs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/myjobs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <hr className="mt-1" />
    </>
  );
}
