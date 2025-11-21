"use client";
import React from "react";

interface Project {
    name: string;
    description: string;
    work: string[];
    languages: string[];
    technologies: string[];
    liveLink?: string;
    repoLink?: string;
}

const projectsData: Project[] = [
    {
        name: "AI-Powered Code Assistant",
        description:
            "An IDE-native companion that blends LLM-powered suggestions with telemetry on developer flow to remove friction.",
        work: [
            "Crafted a responsive command palette with React Server Components and streaming updates.",
            "Built prompt pipelines that merge repo context + fine-tuned models for tailored completions.",
            "Instrumented latency budgets and fallbacks to keep the assistant dependable offline.",
        ],
        languages: ["TypeScript", "Python", "Bash"],
        technologies: ["Next.js", "LangChain", "Express", "TensorFlow", "Docker"],
        liveLink: "https://example.com/live-demo-1",
        repoLink: "https://github.com/your-username/project-1",
    },
    {
        name: "E-commerce Analytics Dashboard",
        description:
            "An immersive observability surface for revenue, retention, and logistics streams powering daily stand-ups.",
        work: [
            "Designed D3 storytelling views with animated bezier paths for cohort drift.",
            "Automated ETL with Pandas + Airflow into a partitioned warehouse (S3 + Athena).",
            "Shipped alerting workflows that DM anomalies to Slack with drill-through links.",
        ],
        languages: ["JavaScript", "Python", "SQL"],
        technologies: ["React", "D3.js", "Pandas", "Flask", "AWS", "PostgreSQL"],
        liveLink: "https://example.com/live-demo-2",
        repoLink: "https://github.com/your-username/project-2",
    },
];

const projectStats = [
    { label: "Vision + ML", value: "08", detail: "Research deployments" },
    { label: "Ship Velocity", value: "2-3/mo", detail: "Experiments & pilots" },
    { label: "Stack", value: "Edge → Cloud", detail: "Python · Next.js · LangChain" },
];

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-[#03030b] text-slate-100">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
                <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
                    <div className="space-y-6">
                        <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/80">
                            Launch logs · Experiments · Build diaries
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black leading-tight">
                            Systems that feel cinematic yet measurable.
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl">
                            Each project is an exploration into tactile AI—mixing realtime perception, resilient infra, and warm
                            interfaces. I document the design playbook, trade-offs, and telemetry so teams can remix the approach.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {projectStats.map((stat) => (
                                <div key={stat.label} className="glow-pill px-5 py-3 rounded-3xl border border-white/10">
                                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">{stat.label}</p>
                                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-[0.75rem] text-slate-300">{stat.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative rounded-[32px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent p-10 border border-white/10 overflow-hidden">
                        <div className="absolute inset-0 noise-layer" />
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-cyan-300/20 animate-slow-spin" />
                        <div className="absolute -left-10 bottom-6 w-32 h-32 rounded-full border border-pink-300/20 animate-slower-spin" />
                        <div className="relative space-y-4">
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Live Telemetry</p>
                            <h2 className="text-3xl font-semibold">Ship, learn, remix.</h2>
                            <p className="text-slate-200 text-base">
                                A snapshot of workflows currently in experimentation—from on-device CV stacks to multi-agent notebooks.
                                Hover below to explore full case studies.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {projectsData.map((project) => (
                                    <div key={project.name} className="rounded-2xl border border-white/10 bg-white/5 p-4 project-glimmer">
                                        <p className="text-cyan-200 text-xs uppercase tracking-[0.3em]">Case study</p>
                                        <p className="text-lg font-semibold">{project.name}</p>
                                        <p className="text-slate-300 text-xs mt-1">{project.languages.join(" · ")}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/70">Projects</p>
                        <h2 className="text-3xl font-semibold mt-2">Deep dives & interactive tours</h2>
                    </div>

                    <div className="grid gap-8">
                        {projectsData.map((project) => (
                            <article key={project.name} className="project-card relative rounded-[28px] border border-white/5 bg-white/5 px-6 py-8 backdrop-blur-xl">
                                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-cyan-300">
                                    <span>Featured build</span>
                                    <span className="h-0.5 w-10 bg-cyan-300/50" />
                                    <span>{project.languages[0]} stack</span>
                                </div>
                                <div className="mt-4 flex flex-col gap-3">
                                    <h3 className="text-3xl font-semibold text-white">{project.name}</h3>
                                    <p className="text-slate-300 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="mt-6 grid gap-3 text-sm text-slate-200">
                                    {project.work.map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {[...project.languages, ...project.technologies].map((tech) => (
                                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-cyan-300">
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                            View live build
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                    {project.repoLink && (
                                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-200">
                                            Source
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <style jsx>{`
                .glow-pill {
                    background: radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.15), rgba(34, 197, 94, 0.05));
                    box-shadow: 0 20px 60px rgba(9, 9, 11, 0.35);
                }
                .noise-layer {
                    background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
                    background-size: 3px 3px;
                    opacity: 0.35;
                }
                .project-glimmer {
                    position: relative;
                    overflow: hidden;
                }
                .project-glimmer::after {
                    content: "";
                    position: absolute;
                    inset: -150% -50%;
                    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transform: rotate(12deg);
                    animation: shimmer 6s infinite;
                }
                .project-card {
                    overflow: hidden;
                }
                .project-card::before {
                    content: "";
                    position: absolute;
                    inset: -40%;
                    background: radial-gradient(circle, rgba(14, 165, 233, 0.18), transparent 60%);
                    animation: pulse 7s infinite;
                    opacity: 0.4;
                }
                .project-card > * {
                    position: relative;
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-10%);
                    }
                    100% {
                        transform: translateX(60%);
                    }
                }
                @keyframes pulse {
                    0%,
                    100% {
                        transform: scale(0.8);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                .animate-slow-spin {
                    animation: slowSpin 30s linear infinite;
                }
                .animate-slower-spin {
                    animation: slowSpin 45s linear infinite reverse;
                }
                @keyframes slowSpin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;