"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const profileImage = "/pro3.jpg";
const snowflakes = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: (index * 23) % 100,
  size: 2 + (index % 3),
  delay: -0.6 * (index % 10),
  duration: 7 + (index % 5),
}));

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A0F1F] to-[#0F172A] text-white">
      <div className="snow-overlay" aria-hidden="true">
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
      {/* NAVBAR */}
      {/* <header className="w-full py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-wide">Sudipto.dev</h1>

          <nav className="flex gap-6 text-sm text-gray-300">
            <Link href="#about" className="hover:text-white">About</Link>
            <Link href="#skills" className="hover:text-white">Skills</Link>
            <Link href="#projects" className="hover:text-white">Projects</Link>
            <Link href="#contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </header> */}

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-12">
        
        {/* TEXT */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-cyan-300/70">
              Computer Vision · ML · AI
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mt-4">
              Hi, I&apos;m <span className="text-cyan-400">Sudipto</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-xl">
            I design delightful, intelligent systems that blend computer vision, deep learning,
            and edge automation. Currently building expressive AI experiences that feel
            handcrafted and futuristic.
          </p>

          <div className="flex gap-4 pt-2">
            <Link
              href="#projects"
              className="px-5 py-2.5 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400"
            >
              View Projects
            </Link>

            <Link
              href="#contact"
              className="px-5 py-2.5 border border-white/20 rounded-lg font-semibold hover:bg-white/10"
            >
              Contact Me
            </Link>
          </div>

          {/* <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-4">
            <div>
              <p className="text-white text-2xl font-semibold">3+ yrs</p>
              <p className="uppercase tracking-[0.3em] text-[0.65rem]">Experience</p>
            </div>
            <div>
              <p className="text-white text-2xl font-semibold">15+</p>
              <p className="uppercase tracking-[0.3em] text-[0.65rem]">Projects</p>
            </div>
            <div>
              <p className="text-white text-2xl font-semibold">AI/ML</p>
              <p className="uppercase tracking-[0.3em] text-[0.65rem]">Specialist</p>
            </div>
          </div> */}
        </div>

        {/* IMAGE / AVATAR */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="wave-blur wave-blur--one" />
            <div className="wave-blur wave-blur--two" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-indigo-600/20 to-transparent blur-3xl" />
            <div className="absolute inset-4 rounded-full border border-white/15" />
            <div className="absolute -inset-5 rounded-full border border-cyan-400/25 animate-[spin_38s_linear_infinite]" />

            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0d1c3b] via-[#122145] to-[#050914] backdrop-blur-3xl border border-white/10 shadow-[0_40px_120px_rgba(8,145,178,0.35)]">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-[0.6rem] tracking-[0.3em] uppercase text-cyan-100/80">
                Open to Work
              </div>
              <Image
                src={profileImage}
                alt="Sudipto profile"
                fill
                priority
                sizes="(max-width: 768px) 16rem, 20rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-cyan-300/40 bg-cyan-500/15 backdrop-blur-lg text-[0.65rem] tracking-[0.35em] uppercase text-cyan-100 shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
              Open to Work
            </div>

            <span className="dot dot-top-right" />
            <span className="dot dot-bottom-left" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .snow-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .snowflake {
          position: absolute;
          top: -5%;
          border-radius: 999px;
          background: rgba(191, 219, 254, 0.85);
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.8;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.35));
        }
        .snowflake:nth-child(even) {
          background: rgba(125, 211, 252, 0.9);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.35));
        }
        @keyframes snowfall {
          0% {
            transform: translate3d(0, -10%, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(-10px, 110vh, 0) scale(1);
            opacity: 0;
          }
        }
        .wave-blur {
          position: absolute;
          inset: -15%;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.55;
          background: conic-gradient(from 90deg, rgba(34,211,238,0.75), rgba(59,130,246,0.2), rgba(248,113,113,0.45));
        }
        .wave-blur--one {
          animation: wave-spin 26s linear infinite;
        }
        .wave-blur--two {
          animation: wave-spin 32s linear infinite reverse;
          mix-blend-mode: screen;
        }
        .dot-top-right,
        .dot-bottom-left {
          position: absolute;
          border-radius: 999px;
        }
        .dot-top-right {
          width: 1.2rem;
          height: 1.2rem;
          top: -0.6rem;
          right: -0.6rem;
          background: #67e8f9;
          box-shadow: 0 0 28px rgba(103, 232, 249, 0.6);
          animation: float-dot 8s ease-in-out infinite;
        }
        .dot-bottom-left {
          width: 1.6rem;
          height: 1.6rem;
          bottom: -0.8rem;
          left: -0.8rem;
          background: #ff88d2;
          box-shadow: 0 0 35px rgba(255, 136, 210, 0.45);
          animation: float-dot 10s ease-in-out infinite reverse;
        }
        @keyframes wave-spin {
          0% {
            transform: rotate(0deg) scale(0.9);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(0.9);
          }
        }
        @keyframes float-dot {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(6px, -6px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">About Me</h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          I’m Sudipto Paul, an AI-focused developer with hands-on experience in AI agents, large language models, Python, machine learning, and cloud computing. I work on building reliable, efficient, and scalable intelligent systems that support automation, data-driven decision-making, and operational improvement.
My strengths include working with Python-based AI workflows, performing data analysis with pandas, and developing structured, well-documented solutions aligned with business requirements. I have completed several AI-oriented projects, particularly involving AI agent design and LLM integration.
I am motivated to contribute to teams working in AI, ML, and cloud-based application development, with a focus on delivering stable, secure, and maintainable systems.
        </p>
      </section>
      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-10">Skills</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Python",
            "OpenCV",
            "Deep Learning",
            "NLP",
            "Machine Learning",
            "Arduino",
            "Computer Vision",
            "Data Processing",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:-translate-y-2 duration-200">
            <h4 className="text-xl font-semibold">Face Fusion AI</h4>
            <p className="text-gray-300 mt-2 text-sm">
              Real-time face fusion and seamless blending using OpenCV + DL models.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:-translate-y-2 duration-200">
            <h4 className="text-xl font-semibold">Solar Tracker (IoT)</h4>
            <p className="text-gray-300 mt-2 text-sm">
              Intelligent sunlight detection system for automatic solar rotation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:-translate-y-2 duration-200">
            <h4 className="text-xl font-semibold">Video Summarizer AI</h4>
            <p className="text-gray-300 mt-2 text-sm">
              Query-based video highlight extraction using DL + CV + NLP.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-10 text-center text-gray-400 text-sm">
        {/* <p>Contact: sudiptop760@gmail.com</p> */}
      </footer>
      </div>
    </div>
  );
}
