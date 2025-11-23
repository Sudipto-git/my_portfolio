"use client";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-200 px-6 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand / Contact */}
                <div>
                    <div className="text-2xl font-semibold">Sudipto Paul</div>
                    <p className="mt-2 text-sm text-gray-400">
                        “AI Developer | Specializing in Agentic AI, LLMs, and Intelligent Automation | Passionate About Human-AI Collaboration”
                    </p>

                    <div className="mt-4 flex items-center space-x-3">
                        <a
                            href="mailto:sudiptop760@gmail.com"
                            className="text-sm text-gray-300 hover:text-white"
                        >
                            sudiptop760@gmail.com
                        </a>
                        <span className="hidden md:inline text-gray-600">·</span>
                        <a
                            href="/resume.pdf"
                            className="text-sm text-gray-300 hover:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            
                        </a>
                    </div>
                </div>

                {/* Quick links */}
                <nav>
                    <div className="text-sm font-medium text-gray-300">Quick links</div>
                    <ul className="mt-3 space-y-2 text-gray-400">
                        <li>
                            <Link href="#about" className="hover:text-white">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#projects" className="hover:text-white">
                                Projects
                            </Link>
                        </li>
                        
                        <li>
                            <Link href="#contact" className="hover:text-white">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Social */}
                <div>
                    <div className="text-sm font-medium text-gray-300">Social</div>
                    <div className="mt-3 flex items-center space-x-4">
                        <a
                            href="https://github.com/Sudipto-git?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-gray-400 hover:text-white"
                        >
                            {/* GitHub SVG */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.14 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.48 5.92.43.37.823 1.102.823 2.222 0 1.605-.015 2.898-.015 3.293 0 .322.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>

                        <a
                            href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-gray-400 hover:text-white"
                        >
                            {/* LinkedIn SVG */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.49 6S0 4.88 0 3.5 1.1 1 2.49 1 4.98 2.12 4.98 3.5zM0 8.98h4.98V24H0zM8.98 8.98h4.78v2.04h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 3.33 6 7.66V24h-4.98v-7.14c0-1.7 0-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.75V24H8.98z"/>
                            </svg>
                        </a>

                        <a
                            href="https://x.com/Sudipto29589981"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X.com"
                            className="text-gray-400 hover:text-white"
                        >
                            {/* Twitter SVG */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.556-3.594-1.556-2.72 0-4.92 2.2-4.92 4.917 0 .386.045.762.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.212 7.557 2.212 9.054 0 14-7.497 14-13.986 0-.21 0-.423-.015-.634.961-.694 1.8-1.56 2.46-2.548l-.047-.02z"/>
                            </svg>
                        </a>

                        <a
                            href="mailto:sudiptop760@gmail.com"
                            aria-label="Email"
                            className="text-gray-400 hover:text-white"
                        >
                            {/* Mail SVG */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 13.065L0 5.25V18c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2V5.25L12 13.065zM12 11L24 3H0l12 8z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-8 border-t border-gray-800 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
                <span>© {year} Sudipto. All rights reserved.</span>
                <div className="mt-3 md:mt-0">
                    <Link href="/privacy" className="mr-4 hover:text-white">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-white">
                        Terms
                    </Link>
                </div>
            </div>
        </footer>
    );
}