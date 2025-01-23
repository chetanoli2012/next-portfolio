"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-300">
              With over 5 years of experience in software development, I
              specialize in building modern web applications using JavaScript,
              React, and Next.js. My journey in tech has been driven by a
              passion for creating intuitive and performant user experiences.
            </p>
            <p className="text-lg text-gray-300">
              I&apos;ve worked on various projects ranging from e-commerce
              platforms to complex enterprise applications, always focusing on
              writing clean, maintainable code and implementing best practices.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3">Core Expertise:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "REST APIs",
                  "GraphQL",
                  "AWS",
                ].map((skill) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">
              Experience Highlights
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">Senior Software Developer</h4>
                <p className="text-gray-400">2021 - Present</p>
                <p className="text-sm text-gray-300 mt-1">
                  Leading development of modern web applications using Next.js
                  and React
                </p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">Full Stack Developer</h4>
                <p className="text-gray-400">2019 - 2021</p>
                <p className="text-sm text-gray-300 mt-1">
                  Developed and maintained multiple client projects
                </p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">Frontend Developer</h4>
                <p className="text-gray-400">2018 - 2019</p>
                <p className="text-sm text-gray-300 mt-1">
                  Specialized in React-based application development
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
