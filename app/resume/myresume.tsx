"use client";
import React from 'react';

const ResumePage = () => {
    return (
        <main className="p-4 sm:p-8 bg-gray-50 text-gray-800">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg rounded-lg">
                
                {/* Header */}
                <header className="text-center border-b-2 pb-6 border-gray-200">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Your Name</h1>
                    <p className="text-lg text-gray-600 mt-2">Your Professional Title</p>
                    <div className="flex justify-center gap-4 sm:gap-6 mt-4 text-sm text-gray-500">
                        <span>your.email@example.com</span>
                        <span>|</span>
                        <span>(123) 456-7890</span>
                        <span>|</span>
                        <span>your-linkedin-profile</span>
                    </div>
                </header>

                {/* Summary Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2">Summary</h2>
                    <p className="mt-4 text-gray-700">
                        A brief summary of your professional background, skills, and career goals. 
                        Highlight your key achievements and what you bring to the table. 
                        Keep it concise and impactful.
                    </p>
                </section>

                {/* Experience Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2">Experience</h2>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">Job Title</h3>
                        <div className="flex justify-between items-baseline">
                            <p className="text-lg font-medium text-gray-700">Company Name</p>
                            <p className="text-sm text-gray-500">City, State | Month Year - Present</p>
                        </div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                            <li>Describe your responsibilities and achievements in this role.</li>
                            <li>Use action verbs to start each point.</li>
                            <li>Quantify your accomplishments whenever possible (e.g., &quot;Increased user engagement by 20%&quot;).</li>
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold">Previous Job Title</h3>
                        <div className="flex justify-between items-baseline">
                            <p className="text-lg font-medium text-gray-700">Previous Company Name</p>
                            <p className="text-sm text-gray-500">City, State | Month Year - Month Year</p>
                        </div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                            <li>Add another job experience here.</li>
                            <li>Focus on skills and experiences relevant to the job you are applying for.</li>
                        </ul>
                    </div>
                </section>

                {/* Education Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2">Education</h2>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">Your Degree</h3>
                        <div className="flex justify-between items-baseline">
                            <p className="text-lg font-medium text-gray-700">University Name</p>
                            <p className="text-sm text-gray-500">City, State | Graduation Year</p>
                        </div>
                        <p className="mt-2 text-gray-700">Minor/Concentration, GPA, any honors or awards.</p>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2">Skills</h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <h4 className="font-semibold text-lg">Technical Skills:</h4>
                            <ul className="list-disc pl-5 mt-1">
                                <li>Programming Languages (e.g., TypeScript, Python)</li>
                                <li>Frameworks (e.g., React, Next.js, Node.js)</li>
                                <li>Tools (e.g., Git, Docker, Webpack)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Soft Skills:</h4>
                            <ul className="list-disc pl-5 mt-1">
                                <li>Team Collaboration</li>
                                <li>Problem Solving</li>
                                <li>Communication</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default ResumePage;