import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
};

const posts: Post[] = [
  {
    id: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 14",
    category: "Web Development",
    date: "October 26, 2023",
    excerpt:
      "A comprehensive guide to setting up your first Next.js project and understanding the new App Router.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "mastering-typescript",
    title: "Mastering TypeScript for Modern React",
    category: "TypeScript",
    date: "November 5, 2023",
    excerpt:
      "Dive deep into advanced TypeScript features like generics, conditional types, and decorators to build robust React applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "tailwind-css-tricks",
    title: "5 Tailwind CSS Tricks You Didn't Know",
    category: "CSS",
    date: "November 12, 2023",
    excerpt:
      "Unlock the full potential of Tailwind CSS with these lesser-known utilities and configuration tips for a faster workflow.",
    imageUrl:
      "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "state-management-in-react",
    title: "The Future of State Management in React",
    category: "React",
    date: "November 20, 2023",
    excerpt:
      "Exploring modern state management solutions beyond Redux, including Zustand, Jotai, and React Query.",
    imageUrl:
      "https://images.unsplash.com/photo-1634903239433-05ee46319a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
];

const featuredPost = posts[0];
const otherPosts = posts.slice(1);
const topics = ["Vision AI", "Edge ML", "LLMs", "Research Logs", "Dev Notes"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#03030b] text-slate-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr] items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/80">Journal · Lab Notes · Dispatches</p>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                Field reports from building intelligent systems.
              </h1>
              <p className="text-slate-300 text-lg">
                Weekly breakdowns on Vision AI, LangChain agents, design tactics, and the little discoveries that make
                ambitious projects feel tactile. Curated for builders and curious minds.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-[0.3em] uppercase text-cyan-100/80"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <div>
                <p className="text-3xl font-bold text-white">42k+</p>
                <p className="uppercase tracking-[0.35em] text-[0.65rem]">Readers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">Weekly</p>
                <p className="uppercase tracking-[0.35em] text-[0.65rem]">Publishing</p>
              </div>
            </div>
          </div>

          {featuredPost && (
            <article className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
              <div className="relative h-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.imageUrl}
                  alt={`Image for ${featuredPost.title}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]">
                  Featured
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <p className="text-sm text-cyan-200">{featuredPost.category}</p>
                  <h2 className="text-3xl font-bold leading-tight">{featuredPost.title}</h2>
                  <p className="text-slate-200 text-base">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                    <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center gap-2 font-semibold text-cyan-300">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-cyan-200/70">Latest dispatches</p>
              <h2 className="text-3xl font-semibold mt-2">Fresh drops from the build log</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-cyan-300 hover:text-white transition-colors">
              View archive
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {otherPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl border border-white/5 bg-white/5 p-5 lg:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/30"
              >
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={`Image for ${post.title}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em]">
                    {post.category}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <time dateTime={post.date} className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {post.date}
                  </time>
                  <Link href={`/blog/${post.id}`} className="block space-y-2">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-300">{post.excerpt}</p>
                  </Link>
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    Continue reading
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
