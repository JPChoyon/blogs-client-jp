"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold hover:text-blue-400">
        MyBlog
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link href="/new" className="hover:text-blue-400">
          Create Post
        </Link>
      </div>
    </nav>
  );
}
