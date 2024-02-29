import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import {FaUser} from 'react-icons/fa'

export default function Navbar({links}) {
    const [openProfile, setOpenProfile] = React.useState(false)
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
                    <>
                        <Link href="/login" className="text-sm px-4 text-cyan-700 py-1.5 rounded-md border border-cyan-600 transition-[background,_color] hover:text-white hover:bg-cyan-600">Login</Link>
                        <Link href="/register" className="text-sm px-4 text-white py-1.5 rounded-md bg-cyan-600 transition-[background] hover:bg-cyan-700">Register</Link>
                    </>
                )}
                {session.status === "authenticated" && (
                    <div className="relative">
                        <button type="button" className="flex items-center justify-center w-10 h-10 border rounded-full" onClick={() => setOpenProfile(!openProfile)}>
                            <FaUser />
                        </button>

                        {openProfile && (
                            <div className="absolute right-0 flex flex-col p-4 mt-4 bg-white border rounded-md w-72 top-full">
                                <p className="text-sm">Hello,</p>
                                <h5 className="mb-8 text-lg font-medium">{session.data.user.name}</h5>

                                <button onClick={signOut} type="button" className="text-sm px-4 text-red-700 py-1.5 rounded-md border border-red-600 transition-[background,_color] hover:text-white hover:bg-red-600">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </nav>
  );
}
