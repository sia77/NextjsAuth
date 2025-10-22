"use client";

import Link from "next/link";
import LogoutButton from "./logoutbutton";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { authenticated, loading } = useAuth();

  if (loading) return null; // or a small skeleton loader

  return (
    <header>
      <nav className="flex justify-around">
        <div className="flex w-[400px] mt-[40px] mb-[40px] justify-between items-center">
          {authenticated ? (
            <>
              <Link href="/profile">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
