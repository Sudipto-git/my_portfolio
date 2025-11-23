"use client";

import Link from "next/link";
import React, { useState, ReactElement } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export default function Navbar(): ReactElement {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const pathname = usePathname?.() ?? "/";

    const items: NavItem[] = [
        // { href: "/", label: "Home" },
        // { href: "/projects", label: "Projects" },
        // { href: "/blog", label: "Blog" },
        // { href: "/resume", label: "Resume" },
        // { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50">
            <div className="backdrop-blur-md bg-gradient-to-b from-black/60 to-black/30 border-b border-white/5">
                <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-4">
                    <Link href="/" aria-label="Homepage" className="inline-flex items-center gap-3 no-underline">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1" opacity="0.12" />
                                <path d="M7 15c2-3 6-3 8 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold tracking-wide">Sudipto</span>
                    </Link>

                    <nav className="hidden md:flex md:ml-6 md:items-center md:gap-1 flex-1">
                        {items.map((it) => {
                            const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href));
                            return (
                                <Link
                                    key={it.href}
                                    href={it.href}
                                    className={`relative px-4 py-2 mr-1 rounded-md no-underline transition-colors duration-200 ${
                                        active ? "text-white" : "text-slate-300 hover:text-white"
                                    }`}
                                >
                                    <span className="inline-block">{it.label}</span>
                                    <span
                                        className={`absolute left-3 right-3 h-[2px] bottom-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transform origin-left transition-transform duration-300 ${
                                            active ? "scale-x-100" : "scale-x-0"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="ml-auto flex items-center gap-3">
                        <button
                            aria-label="Search"
                            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Search size={18} />
                        </button>

                        <button
                            onClick={() => setDark((d) => !d)}
                            aria-label="Toggle theme"
                            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-full font-semibold hover:scale-105 transform transition"
                            onClick={() => (window.location.href = "#contact")}
                        >
                            Hire Me
                        </button>

                        <button
                            className="ml-2 md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5"
                            aria-label="Toggle menu"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            <div
                className={`md:hidden fixed inset-x-4 top-16 rounded-lg bg-[#071026]/80 backdrop-blur-md border border-white/6 shadow-lg transform transition-all duration-300 z-50 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="p-4 flex flex-col gap-2">
                    {items.map((it) => (
                        <Link
                            key={it.href}
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 rounded-md text-slate-200 hover:bg-white/5 hover:text-white"
                        >
                            {it.label}
                        </Link>
                    ))}

                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3">
                        <button className="flex-1 px-4 py-2 rounded-md bg-white/5 text-white">Resume</button>
                        <button className="px-3 py-2 rounded-md border border-white/6">Sign in</button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                header { }
                .project-pill { }
            `}</style>
        </header>
    );
}
