import Link from "next/link";

export default function Navbar() {
  return (

<header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">

<div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

<div>

<h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">

StoryVerse AI

</h1>

<p className="text-xs text-gray-400">

AI Story Visual Generator

</p>

</div>

<nav className="hidden md:flex items-center gap-8 text-gray-300">

<Link
href="/"
className="hover:text-white transition"
>

Home

</Link>

<Link
href="/upload"
className="hover:text-white transition"
>

Upload

</Link>

<Link
href="/dashboard"
className="hover:text-white transition"
>

Dashboard

</Link>

</nav>

<button className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition">

Generate Story

</button>

</div>

</header>

  )
}