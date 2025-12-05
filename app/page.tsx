"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import profileImage from "@/public/pro3.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
      opacity: { duration: 0.6 },
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
      opacity: { duration: 0.5 },
    },
  },
};

const snowflakes = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: (index * 23) % 100,
  size: 2 + (index % 3),
  delay: -0.6 * (index % 10),
  duration: 7 + (index % 5),
}));

const aiNodes = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: (index * 11) % 100,
  left: (index * 17) % 100,
  delay: -(index % 6) * 1.5,
}));

const aiConnections = [
  { id: 1, top: "18%", left: "12%", width: "32%", rotation: 6 },
  { id: 2, top: "42%", left: "28%", width: "38%", rotation: -8 },
  { id: 3, top: "65%", left: "8%", width: "30%", rotation: 12 },
  { id: 4, top: "30%", left: "60%", width: "28%", rotation: 14 },
  { id: 5, top: "70%", left: "58%", width: "34%", rotation: -6 },
];

const codeColumns = [
  { id: 1, left: "18%", delay: 0 },
  { id: 2, left: "48%", delay: -4 },
  { id: 3, left: "78%", delay: -2 },
];

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
    name: "Face Fusion AI",
    description:
      "Realtime experimentation playground that melds two faces with landmark-driven warping, seamless cloning, and optional StyleGAN refinement.",
    work: [
      "Extract 68-key landmark constellations with Dlib / MediaPipe and stabilize them frame-to-frame.",
      "Warp and blend facial meshes via OpenCV Poisson cloning for photoreal merges.",
      "Optionally run StyleGAN/autoencoder passes for higher fidelity fusion + detail recovery.",
      "Pipe webcam frames straight through the fusion stack for live previews.",
    ],
    languages: ["Python"],
    technologies: ["OpenCV", "MediaPipe", "Dlib", "StyleGAN", "Seamless Cloning"],
    repoLink: "https://github.com/Sudipto-git/sudipto-cv-3",
  },
  {
    name: "Query-Focused Video Summarization",
    description:
      "Bachelor's thesis system that distills video narratives around a user prompt using fusion of shot detection, audio transcripts, and semantic scoring.",
    work: [
      "Align ASR transcripts + scene boundaries, then tag relevance against the query embedding.",
      "Rank segments with multi-factor scoring (visual saliency + language overlap + diversity).",
      "Generate storyboard plus textual synopsis for rapid review during presentations.",
      "Packaged the research as a reproducible notebook + CLI for faculty demos.",
    ],
    languages: ["Python"],
    technologies: ["PyTorch", "Transformers", "OpenCV", "NLTK"],
    repoLink: "https://github.com/Sudipto-git/sudipto-cv-3",
  },
  {
    name: "Azure Generative AI Delivery",
    description:
      "Cloud-native prompt-flow on Azure ML orchestrating entity extraction + sentiment pipelines for enterprise customer feedback.",
    work: [
      "Designed prompt variants + evaluation harness inside Azure Prompt Flow for grounded completions.",
      "Deployed scoring endpoints with Azure ML managed online endpoints + monitoring hooks.",
      "Chained sentiment + entity recognizers to auto-tag tickets and push structured insights to Power BI.",
      "Documented reusable deployment recipe for the internship cohort.",
    ],
    languages: ["Python"],
    technologies: ["Azure ML", "Prompt Flow", "Cognitive Services", "Azure Functions"],
    repoLink: "https://github.com/Sudipto-git/sudipto-cv-3",
  },
  {
    name: "UN SDG AI Agent",
    description:
      "IBM internship finale: production-style AI agent blueprint aligned to UN sustainability metrics with transparent ML workflow.",
    work: [
      "Shaped agent architecture covering perception → reasoning → action loops with human-in-the-loop gates.",
      "Ingested SDG datasets, cleaned pipelines, and exposed structured context to the agent brain.",
      "Showcased explainability dashboards for each policy recommendation + KPI impact.",
      "Wrapped everything in a live demo that mentors could probe end-to-end.",
    ],
    languages: ["Python", "TypeScript"],
    technologies: ["LangChain", "FastAPI", "Node.js", "IBM Cloud"],
    repoLink: "https://github.com/Sudipto-git/sudipto-cv-3",
  },
];

const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

const skillCategories = [
  {
    title: "Frontend Development",
    items: [
      "Node.js e NPM",
      "JSSS",
      "Tailwind CSS",
      "CSS",
      "Next.js",
      "React",
      "Web Technologies (HTML5, CSS3, Bootstrap, Angular)",
      "HTML (Basics)",
    ],
  },
  {
    title: "Backend & Systems",
    items: [
      "UNIX/LINUX",
      "C programming",
      "MySQL",
      "Python (computer programming)",
      "Windows, Linux, AWS, Azure",
      "Java",
    ],
  },
  {
    title: "Design & Creative Tools",
    items: [
      "Design skills (Figma, Adobe Photoshop, Adobe Illustrator)",
      "Tool routing & calling",
      "Networking",
      "Canva",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Good communication skills",
      "Adapt to change",
      "Problem-solving with digital tools",
      "Learning agility",
      "Communication",
      "Manage teamwork",
      "Smart Focus",
      "Think creatively",
      "Understand written Hindi",
      "Think analytically",
      "Microsoft PowerPoint",
      "Microsoft Office",
      "Google Drive",
      "Microsoft Word",
      "Microsoft Excel",
      "Instagram",
      "LinkedIn",
      "Facebook",
      "Outlook",
    ],
  },
  {
    title: "AI & Fullstack Engineering",
    items: [
      "AI Agent",
      "LLM",
      "n8n",
      "LLM Providers (ChatGPT, Whisper, Groq, Mistral & Claude)",
      "Hugging Face Transformers",
      "Vercel AI SDK",
      "Torch, Keras, Tensorflow, Matplotlib, Numpy, Scikit-learn",
      "Mathematics and Statistics",
      "Prompt engineering",
      "Git/GitHub, Docker, Gitlab",
    ],
  },
];

type VantaBirdsType = (options: Record<string, unknown>) => { destroy: () => void };
type VantaEffectInstance = { destroy: () => void } | null;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroVantaRef = useRef<HTMLDivElement | null>(null);
  const vantaInstance = useRef<VantaEffectInstance>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.7 });
  const parallaxY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.7 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const elementHeight = elementRect.height;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max((viewportHeight - elementHeight) / 2, 0);
    const targetPosition = elementRect.top + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    });

    setActiveTab(sectionId);
    setIsMenuOpen(false);
  };

  const downloadCVAsPDF = async () => {
    const element = document.getElementById("cv-content");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Sudipto_Paul_CV.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => tab.id);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 30;
      const y = (event.clientY / window.innerHeight - 0.5) * 30;
      pointerX.set(x);
      pointerY.set(y);
    };

    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [pointerX, pointerY]);

  useEffect(() => {
    let cancelled = false;

    const initVanta = async () => {
      if (typeof window === "undefined" || !heroVantaRef.current) return;

      try {
        const threeModule = await import("three");
        const THREE = threeModule as typeof import("three");
        window.THREE = THREE;

        const VantaModule = await import("vanta/dist/vanta.birds.min.js");
        if (cancelled || !heroVantaRef.current) return;

        const VantaBirds = (VantaModule.default ?? VantaModule) as VantaBirdsType;
        if (typeof VantaBirds !== "function") {
          console.error("Vanta Birds module failed to load correctly");
          return;
        }

        vantaInstance.current = VantaBirds({
          THREE,
          el: heroVantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x07192f,
          backgroundAlpha: 1.0,
          color1: 0xff0000,
          color2: 0x0d1fff,
          colorMode: "varianceGradient",
          quantity: 5.0,
          birdSize: 1.0,
          wingSpan: 30.0,
          speedLimit: 5.0,
          separation: 20.0,
          alignment: 20.0,
          cohesion: 20.0,
        });
      } catch (error) {
        console.error("Failed to load Vanta effect", error);
      }
    };

    initVanta();

    return () => {
      cancelled = true;
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A0F1F] to-[#0F172A] text-white">
      <div className="background-ornaments pointer-events-none" aria-hidden="true">
        <div className="gradient-orb gradient-orb--one" />
        <div className="gradient-orb gradient-orb--two" />
        <div className="gradient-orb gradient-orb--three" />
        <div className="aurora-band" />
        <div className="neural-network">
          {aiConnections.map((connection) => (
            <span
              key={`connection-${connection.id}`}
              className="neural-connection"
              style={{
                top: connection.top,
                left: connection.left,
                width: connection.width,
                transform: `rotate(${connection.rotation}deg)`,
              }}
            />
          ))}
          {aiNodes.map((node) => (
            <span
              key={`node-${node.id}`}
              className="neural-node"
              style={{
                top: `${node.top}%`,
                left: `${node.left}%`,
                animationDelay: `${node.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="code-streams hidden sm:block" aria-hidden="true">
          {codeColumns.map((column) => (
            <div
              key={`code-column-${column.id}`}
              className="code-column"
              style={{ left: column.left, animationDelay: `${column.delay}s` }}
            >
              <span>01000111·1010·1101·AI</span>
              <span>λ→ƒ(x)·Σ·π·∇</span>
              <span>DATA·VISION·LLM</span>
            </div>
          ))}
        </div>
        <div className="grid-overlay" />
      </div>

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
        <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold tracking-wide">Portfolio</h1>
            <div className="flex items-center gap-3">
              <nav className="hidden md:flex gap-2 md:gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-cyan-500 text-black"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-sm text-white"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-[#0a0f1f]/95 border-t border-white/10 mt-3 px-4 pb-4">
              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "bg-cyan-500 text-black" : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        <section
          id="home"
          className="relative overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24 md:pt-32 md:pb-40 min-h-screen flex flex-col md:flex-row items-center gap-12"
        >
          <div ref={heroVantaRef} className="absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
          <motion.div
            className="flex-1 space-y-6 w-full"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div>
              <motion.p className="uppercase tracking-[0.4em] text-xs text-cyan-300/70" variants={fadeIn}>
                Computer Vision · ML · AI
              </motion.p>
              <motion.h2 className="text-4xl md:text-6xl font-extrabold leading-tight mt-4" variants={fadeInUp}>
                Hi, I&apos;m <span className="text-cyan-400">Sudipto</span>
              </motion.h2>
            </div>
            <motion.p className="text-gray-300 text-lg max-w-xl" variants={fadeInUp}>
              I design delightful, intelligent systems that blend computer vision, deep learning, and edge automation. Currently building expressive AI experiences that feel handcrafted and futuristic.
            </motion.p>
            <motion.div className="flex gap-4 pt-2" variants={fadeInUp}>
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="px-5 py-2.5 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="flex-1 flex justify-center w-full" initial="hidden" animate="visible" variants={fadeIn}>
            <motion.div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80" style={{ translateX: parallaxX, translateY: parallaxY }}>
              <div className="wave-blur wave-blur--one" />
              <div className="wave-blur wave-blur--two" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-indigo-600/20 to-transparent blur-3xl" />
              <div className="absolute inset-4 rounded-full border border-white/15" />
              <div className="absolute -inset-5 rounded-full border border-cyan-400/25 animate-[spin_38s_linear_infinite]" />
              <motion.span
                className="pulse-ring"
                aria-hidden="true"
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="scanner-orbit"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              />
              <motion.span
                className="scanner-orbit scanner-orbit--inner"
                aria-hidden="true"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              />
              <motion.span
                className="orbiting-node"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              >
                <span />
              </motion.span>
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
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="max-w-4xl mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col justify-center text-center scroll-mt-48 lg:scroll-mt-64"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
          variants={fadeInUp}
        >
          <motion.h3 className="text-3xl font-bold mb-4" variants={fadeInUp}>
            About Me
          </motion.h3>
          <motion.p className="text-gray-300 text-lg leading-relaxed" variants={fadeInUp}>
            I&apos;m Sudipto Paul, an AI-focused developer with hands-on experience building AI agents, LLM integrations, and cloud-native ML workflows. I obsess over reliable, scalable systems that make automation feel handcrafted.
          </motion.p>
        </motion.section>

        <motion.section
          id="skills"
          className="max-w-6xl mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col justify-center scroll-mt-48 lg:scroll-mt-64"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={itemAnimation}>
            <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/70 mb-2">Skills</p>
            <h3 className="text-3xl font-bold">Stacks I wield</h3>
            <p className="text-gray-400 mt-3">
              A snapshot of the engineering, design, and collaboration tools I rely on every day.
            </p>
          </motion.div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {skillCategories.map((category) => (
              <motion.article
                key={category.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                variants={itemAnimation}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full bg-white/10 text-xs text-gray-100 border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="max-w-6xl mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col justify-center scroll-mt-48 lg:scroll-mt-64"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
          variants={staggerContainer}
        >
          <motion.div variants={itemAnimation}>
            <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/70 text-center mb-2">Projects</p>
            <h2 className="text-3xl font-semibold text-center mb-12">Motiongraphy case studies</h2>
          </motion.div>

          <div className="grid gap-8">
            {projectsData.map((project) => (
              <motion.article
                key={project.name}
                className="relative overflow-hidden rounded-[28px] border border-white/5 bg-white/5 px-6 py-8 backdrop-blur-xl"
                variants={itemAnimation}
              >
                <div className="project-motion-graph" aria-hidden="true">
                  <span className="project-motion-ring project-motion-ring--one" />
                  <span className="project-motion-ring project-motion-ring--two" />
                  <span className="project-motion-node project-motion-node--one" />
                  <span className="project-motion-node project-motion-node--two" />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-cyan-300">
                  <span>Motiongraphy</span>
                  <span className="h-0.5 w-10 bg-cyan-300/50" />
                  <span>{project.languages[0]} stack</span>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <h3 className="text-3xl font-semibold text-white">{project.name}</h3>
                  <p className="text-slate-300 leading-relaxed">{project.description}</p>
                </div>
                <div className="mt-6 grid gap-3 text-sm text-slate-200">
                  {project.work.map((item) => (
                    <motion.div key={item} className="flex items-start gap-3" variants={itemAnimation}>
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                      <p className="leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-xs text-cyan-100">
                  {[...project.languages, ...project.technologies].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full border border-cyan-100/20 bg-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-white transition-colors"
                    >
                      View Live ↗
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-white transition-colors"
                    >
                      Repository ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="resume"
          className="max-w-6xl mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col justify-center scroll-mt-48 lg:scroll-mt-64"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
          variants={staggerContainer}
        >
          <motion.div
            id="cv-content"
            className="relative overflow-hidden rounded-[32px] bg-white text-slate-900 p-6 md:p-10 shadow-2xl border border-white/10"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-cyan-100 via-white to-transparent" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-8">
              <header className="space-y-3 text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-600">Curriculum Vitae</p>
                <h2 className="text-3xl font-semibold">Sudipto Paul</h2>
                <p className="text-slate-600">AI Developer · Computer Vision · Cloud AI</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 justify-center md:justify-start">
                  <span>📍 Ahmedabad, India</span>
                  <span>✉️ sudiptop760@gmail.com</span>
                  <span>🌐 sudipto90-portfolio.vercel.app</span>
                </div>
                <p className="text-xs text-slate-500">📅 Date of Birth: 23/05/2001 · 🏛️ Rajshahi, Bangladesh · 🇧🇩 Bangladeshi</p>
              </header>

              <div className="grid gap-8">
                <section className="mb-2">
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">
                    I&apos;m Sudipto Paul—developer, designer, and lifelong learner. I work with AI Agents and ML projects, explore AI technologies, and focus on creating clean, impactful digital products. Always improving. Always building.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Portfolio: <a href="https://sudipto90-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://sudipto90-portfolio.vercel.app/</a>
                  </p>
                </section>

                <section className="mb-2">
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Work Experience</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Microsoft - Data & AI Skills Virtual Internship</h4>
                        <p className="text-sm text-gray-600">02/07/2025 - 27/07/2025</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li>Completed Microsoft&apos;s Data & AI Internship focused on cloud AI solutions.</li>
                      <li>Worked on Azure AI Fundamentals (AI-900) concepts including responsible AI, computer vision, NLP, and ML basics.</li>
                      <li>Built an NLP solution using Azure AI Language (text analytics, sentiment analysis, entity recognition).</li>
                      <li>Hands-on with Generative AI models in Azure Machine Learning (prompt flow, model deployment).</li>
                      <li>Performed Power BI Data Analysis (PL-300) including data cleaning, modelling, and dashboards.</li>
                      <li>Completed post-training assessments for each module.</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">IBM - AI GTU Summer Internship (AI Agent Development)</h4>
                        <p className="text-sm text-gray-600">01/07/2025 - 29/07/2025</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li>Selected for IBM&apos;s AI GTU Summer Internship 2025 focused on AI agent workflows.</li>
                      <li>Trained on emerging agent architectures, ML fundamentals, and data analysis pipelines.</li>
                      <li>Worked on AI projects aligned with UN Sustainable Development Goals.</li>
                      <li>Participated in expert-led masterclasses, mentoring sessions, and webinars.</li>
                      <li>Presented a final AI agent capstone demonstrating explainability and SDG impact.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Self Projects</h4>
                        <p className="text-sm text-gray-600">Ahmedabad, India | Computer Engineering</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li><a href="https://drive.google.com/file/d/184EqKsh2XaWfRiJjMmMfHF3Oo64OmKVf/view" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Project Link 1</a></li>
                      <li><a href="https://drive.google.com/file/d/1yS01SsNYRXE584df8EmdnAsIWQ4nNt_N/view" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Project Link 2</a></li>
                    </ul>
                  </div>
                </section>

                <section className="mb-2">
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Education and Training</h3>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Bachelor of Engineering</h4>
                    <p className="text-sm text-gray-600">11/09/2022 - CURRENT | Ahmedabad, India</p>
                    <p className="text-sm text-gray-700">LD College of Engineering | <a href="http://ldce.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ldce.ac.in</a></p>
                    <p className="text-sm text-gray-700">Computer Engineering | Thesis: Query-Focused Video Summarization</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Online Python Course</h4>
                    <p className="text-sm text-gray-600">Ahmedabad, India</p>
                    <p className="text-sm text-gray-700">Spoken-Tutorial | <a href="https://spoken-tutorial.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">spoken-tutorial.org</a></p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Higher Secondary Certificate</h4>
                    <p className="text-sm text-gray-600">Bogura Cantonment Public School and College</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Secondary School Certificate</h4>
                    <p className="text-sm text-gray-600">Mohadevpur Sarba Mangala (Pilot) High School</p>
                  </div>
                </section>

                <section className="mb-2">
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Language Skills</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Mother tongue:</strong> Bangla</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Language</th>
                          <th className="border border-gray-300 px-3 py-2">Listening</th>
                          <th className="border border-gray-300 px-3 py-2">Reading</th>
                          <th className="border border-gray-300 px-3 py-2">Spoken Production</th>
                          <th className="border border-gray-300 px-3 py-2">Spoken Interaction</th>
                          <th className="border border-gray-300 px-3 py-2">Writing</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">Hindi</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">C2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">A2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">A2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">C2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">A1</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">English</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">B2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">B2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">B2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">B2</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">B2</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">Gujarati</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">A1</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">A1-A2: Basic user | B1-B2: Independent user | C1-C2: Proficient user</p>
                </section>

                <section className="mb-2">
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                    {["Microsoft Office", "Google Drive", "Python", "Java", "HTML", "CSS", "JavaScript", "Node.js", "AWS", "Azure", "AI Agent", "LLM", "n8n", "Networking", "Communication"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Networks and Memberships</h3>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Google Cloud Career Launchpad - APAC Member</h4>
                    <p className="text-sm text-gray-600">Joined: September 1, 2025</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Selected as a member of the Google Cloud Career Launchpad (APAC), focusing on cloud skill development with exclusive mentorship and resources.
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <a href="https://www.cloudskillsboost.google/my_account/programs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Program Link
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>

          <motion.div className="flex justify-center mt-8" variants={itemAnimation}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadCVAsPDF();
              }}
              className="px-8 py-3 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV as PDF
            </button>
          </motion.div>
        </motion.section>

        <style jsx>{`
          .background-ornaments {
            position: fixed;
            inset: -10%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
          }
          .gradient-orb {
            position: absolute;
            width: 30rem;
            height: 30rem;
            border-radius: 999px;
            filter: blur(120px);
            opacity: 0.35;
            animation: orbFloat 38s ease-in-out infinite;
            mix-blend-mode: screen;
          }
          .gradient-orb--one {
            top: 5%;
            left: -5%;
            background: radial-gradient(circle, rgba(34,211,238,0.95), transparent 60%);
          }
          .gradient-orb--two {
            bottom: -10%;
            right: -5%;
            background: radial-gradient(circle, rgba(248,113,113,0.9), transparent 70%);
            animation-delay: -12s;
          }
          .gradient-orb--three {
            top: 40%;
            right: 15%;
            width: 24rem;
            height: 24rem;
            background: radial-gradient(circle, rgba(129,140,248,0.85), transparent 65%);
            animation-delay: -24s;
          }
          .aurora-band {
            position: absolute;
            top: 20%;
            left: 10%;
            width: 80%;
            height: 50%;
            background: conic-gradient(from 120deg, rgba(14,165,233,0.35), transparent 35%, rgba(236,72,153,0.3), transparent 70%);
            filter: blur(140px);
            animation: auroraShift 26s ease-in-out infinite;
            opacity: 0.5;
            mix-blend-mode: screen;
          }
          .grid-overlay {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
            background-size: 140px 140px;
            opacity: 0.35;
            mix-blend-mode: overlay;
          }
          .neural-network {
            position: absolute;
            inset: 0;
            filter: drop-shadow(0 0 12px rgba(34,211,238,0.3));
            opacity: 0.75;
          }
          .neural-node {
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 999px;
            background: radial-gradient(circle, #5eead4 0%, rgba(13,148,136,0.3) 70%);
            box-shadow: 0 0 16px rgba(45,212,191,0.8);
            animation: pulseNode 4s ease-in-out infinite;
          }
          .neural-connection {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, rgba(56,189,248,0), rgba(56,189,248,0.8), rgba(248,113,113,0));
            transform-origin: left center;
            animation: connectionGlow 6s ease-in-out infinite;
            opacity: 0.65;
          }
          .code-streams {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            opacity: 0.55;
          }
          .code-column {
            position: absolute;
            top: -40%;
            width: 140px;
            color: rgba(226,232,240,0.55);
            font-size: 0.7rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            animation: codeFall 18s linear infinite;
            mix-blend-mode: lighten;
          }
          .code-column span {
            display: inline-block;
            margin: 1rem 0;
            opacity: 0.8;
          }
          .project-motion-graph {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.35;
          }
          .project-motion-ring {
            position: absolute;
            width: 16rem;
            height: 16rem;
            border-radius: 50%;
            border: 1px solid rgba(6,182,212,0.35);
            filter: blur(1px);
            animation: wave-spin 32s linear infinite;
          }
          .project-motion-ring--one {
            top: -30%;
            left: -20%;
          }
          .project-motion-ring--two {
            bottom: -35%;
            right: -15%;
            animation-direction: reverse;
          }
          .project-motion-node {
            position: absolute;
            width: 0.65rem;
            height: 0.65rem;
            border-radius: 999px;
            background: #22d3ee;
            box-shadow: 0 0 25px rgba(6,182,212,0.6);
            animation: float-dot 9s ease-in-out infinite;
          }
          .project-motion-node--one {
            top: 15%;
            left: 60%;
          }
          .project-motion-node--two {
            bottom: 10%;
            right: 50%;
            animation-delay: -3s;
          }
          .snow-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
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
          .scanner-orbit {
            position: absolute;
            inset: 0.75rem;
            border-radius: 50%;
            border: 1px solid rgba(94, 234, 212, 0.2);
            background: conic-gradient(
              from 120deg,
              rgba(14, 165, 233, 0),
              rgba(14, 165, 233, 0.55),
              rgba(236, 72, 153, 0.45),
              rgba(14, 165, 233, 0)
            );
            mix-blend-mode: screen;
            filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.35));
            opacity: 0.9;
          }
          .scanner-orbit--inner {
            inset: 1.8rem;
            border-color: rgba(147, 197, 253, 0.35);
            background: conic-gradient(
              from 300deg,
              rgba(59, 130, 246, 0),
              rgba(59, 130, 246, 0.65),
              rgba(20, 184, 166, 0.55),
              rgba(59, 130, 246, 0)
            );
            opacity: 0.7;
            filter: blur(0.5px);
          }
          .orbiting-node {
            position: absolute;
            inset: 1.2rem;
            border-radius: 999px;
            pointer-events: none;
          }
          .orbiting-node span {
            position: absolute;
            top: -0.4rem;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 999px;
            background: radial-gradient(circle, #67e8f9 0%, rgba(103, 232, 249, 0.05) 90%);
            box-shadow: 0 0 20px rgba(103, 232, 249, 0.65), 0 0 40px rgba(6, 182, 212, 0.4);
          }
          .pulse-ring {
            position: absolute;
            inset: -0.4rem;
            border-radius: 50%;
            border: 1px solid rgba(103, 232, 249, 0.35);
            box-shadow: 0 0 28px rgba(6, 182, 212, 0.35);
            filter: blur(1px);
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
          @keyframes orbFloat {
            0% {
              transform: translate3d(0, 0, 0) scale(0.9);
            }
            50% {
              transform: translate3d(20px, -30px, 0) scale(1.05);
            }
            100% {
              transform: translate3d(-10px, 15px, 0) scale(0.9);
            }
          }
          @keyframes auroraShift {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            50% {
              transform: translate3d(-40px, 30px, 0) rotate(6deg);
            }
            100% {
              transform: translate3d(10px, -20px, 0) rotate(-4deg);
            }
          }
          @keyframes pulseNode {
            0% {
              transform: scale(0.9);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
            100% {
              transform: scale(0.9);
              opacity: 0.6;
            }
          }
          @keyframes connectionGlow {
            0% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.85;
              filter: drop-shadow(0 0 10px rgba(59,130,246,0.8));
            }
            100% {
              opacity: 0.3;
            }
          }
          @keyframes codeFall {
            0% {
              transform: translateY(-10%) skewX(-6deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(120%) skewX(-6deg);
              opacity: 0;
            }
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
      </div>
    </div>
  );
}
