"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

// callbackUrl controls where the user lands after logout — clients return to the public
// site ("/"), agency staff return to their own door ("/admin/login").
export function LogoutButton({ callbackUrl = "/" }: { callbackUrl?: string }) {
  return (
    <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl })}>
      Log out
    </Button>
  );
}
