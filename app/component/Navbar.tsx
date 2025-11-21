"use client";

import Link from "next/link";
import React, { useState, ReactElement } from "react";

type NavItem = { href: string; label: string };

export default function Navbar(): ReactElement {
    const [open, setOpen] = useState(false);
    const items: NavItem[] = [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/projects", label: "Projects" },
        { href: "/contact", label: "Contact" },
        // { href: "/resume", label: "Resume" }
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[linear-gradient(180deg,rgba(10,12,20,0.6),rgba(10,12,20,0.4))] border-b border-white/5">
            <div className="max-w-[1100px] mx-auto px-4 py-2.5 flex items-center gap-4">
                <Link className="inline-flex items-center gap-2.5 text-white font-semibold no-underline" href="#home" aria-label="Homepage">
                    <svg
                        className="w-9 h-9 text-cyan-400 flex-shrink-0"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 15c2-3 6-3 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-base">MyPortfolio</span>
                </Link>

                <button
                    className="ml-auto inline-flex flex-col justify-center gap-1 w-9 h-9 bg-transparent border-0 p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-300/40 rounded-md md:hidden"
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="block h-[2px] w-full bg-white rounded-sm" />
                    <span className="block h-[2px] w-full bg-white rounded-sm" />
                    <span className="block h-[2px] w-full bg-white rounded-sm" />
                </button>

                <nav
                    className={`${
                        open ? "flex" : "hidden"
                    } absolute right-4 top-full mt-2 bg-[#0f172a] border border-white/4 p-2 rounded-lg flex-col gap-1 min-w-[160px] md:static md:flex md:flex-row md:ml-auto md:bg-transparent md:p-0 md:gap-2 md:min-w-0 md:border-none`}
                    onClick={() => setOpen(false)}
                >
                    {items.map((it) => (
                        <Link
                            key={it.href}
                            href={it.href}
                            className="text-slate-400 no-underline px-3 py-2 rounded-md hover:text-white hover:bg-white/5 focus:text-white focus:bg-white/5"
                        >
                            {it.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
