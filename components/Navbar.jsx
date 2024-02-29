import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export default function Navbar({links}) {
    const session = useSession()

  return (
    <nav class="flex items-center sticky top-0 left-0 w-full h-14 bg-white z-[1000] border-b">
        <div className="flex items-center justify-between w-11/12 mx-auto">
            <span className="text-3xl font-bold tracking-wider text-cyan-800">LOGO</span>

            <div className="flex items-center justify-end gap-1.5">
                {links.map(l => (
                    <Link className="text-xs px-3 py-1.5 transition-[background] hover:bg-cyan-100 rounded-md capitalize" href={"/category/" + l}>{l}</Link>
                ))}
            </div>

            <div className="flex items-center justify-end gap-1.5">
                {session.status === "unauthenticated" && (
                    <Link href="/api/auth/signin" className="text-sm px-4 text-white py-1.5 rounded-md bg-cyan-600 transition-[background] hover:bg-cyan-700">Login</Link>
                )}
            </div>
        </div>
    </nav>
  );
}
