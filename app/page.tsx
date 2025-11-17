import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Portfolio</h1>
        <p className="text-lg text-gray-600 mt-2">Welcome to my personal portfolio website</p>
      </header>
      
      <section className="max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
        <p className="text-gray-700">
          Hi, I'm [Your Name], a passionate [your profession, e.g., software developer] with experience in [your skills, e.g., web development, design].
          I love creating innovative solutions and bringing ideas to life through code.
        </p>
      </section>
      
      <section className="max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">Project 1</h3>
            <p>Description of your first project.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">Project 2</h3>
            <p>Description of your second project.</p>
          </div>
          {/* Add more projects as needed */}
        </div>
      </section>
      
      <footer className="mt-8 text-center text-gray-600">
        <p>Contact me at [your email] | [your social links]</p>
      </footer>
    </div>
  );
}