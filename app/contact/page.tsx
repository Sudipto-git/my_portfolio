"use client";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaX } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";

// Animation variants for scroll-triggered animations with smooth easing
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
      opacity: { duration: 0.6 }
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
      opacity: { duration: 0.5 }
    }
  }
};

const socialLinks = [
	{ name: "GitHub", href: "https://github.com/Sudipto-git?tab=repositories", icon: FaGithub },
	{ name: "LinkedIn", href: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile", icon: FaLinkedin },
	{ name: "Instagram", href: "https://www.instagram.com/_su_dip_to_/", icon: FaInstagram },
	{ name: "Facebook", href: "https://www.facebook.com/sudip.to.14268", icon: FaFacebook },
	{ name: "X.com", href: "https://x.com/Sudipto29589981", icon: FaX },
];

export default function ContactPage() {
	return (
		<div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<motion.div 
					className="text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
					variants={fadeInUp}
				>
					<motion.h1 
						className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
						variants={fadeInUp}
					>
						Contact Me
					</motion.h1>
					<motion.p 
						className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400"
						variants={fadeInUp}
					>
						I&apos;m open to discussing new projects, creative ideas, or opportunities to be part of your visions.
					</motion.p>
				</motion.div>

				<motion.div 
					className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
					variants={staggerContainer}
				>
					<motion.div className="space-y-8" variants={itemAnimation}>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sudipto Paul</h2>
						<div className="space-y-4">
							<a
								href="mailto:sudiptop760@gmail.com"
								className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
							>
								<MdOutlineEmail className="flex-shrink-0 h-6 w-6 mr-3" />
								<span className="text-lg">sudiptop760@gmail.com</span>
							</a>
							<a
								href="https://wa.me/917043864601"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
							>
								<FaWhatsapp className="flex-shrink-0 h-6 w-6 mr-3" />
								<span className="text-lg">+91 70438 64601</span>
							</a>
						</div>
						<div className="flex space-x-6">
							{socialLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
								>
									<span className="sr-only">{link.name}</span>
									<link.icon className="h-6 w-6" aria-hidden="true" />
								</a>
							))}
						</div>
					</motion.div>

					<motion.div 
						className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
						variants={itemAnimation}
					>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
						<form action="#" method="POST" className="space-y-6">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Full Name
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="name"
										id="name"
										autoComplete="name"
										className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Email
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Message
								</label>
								<div className="mt-1">
									<textarea
										id="message"
										name="message"
										rows={4}
										className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
										defaultValue={""}
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Submit
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}