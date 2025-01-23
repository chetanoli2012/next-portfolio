export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js and Stripe integration. Includes user authentication, product management, and order processing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    image:
      "https://placehold.co/600x400/1a1a1a/ffffff?text=E-Commerce+Platform",
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/username/ecommerce",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A real-time task management application with team collaboration features. Includes drag-and-drop functionality and real-time updates.",
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Task+Management",
    liveUrl: "https://task-app-demo.com",
    githubUrl: "https://github.com/username/task-app",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that helps create blog posts, social media content, and marketing copy.",
    technologies: ["Next.js", "OpenAI API", "Node.js", "MongoDB"],
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=AI+Generator",
    liveUrl: "https://ai-generator-demo.com",
    githubUrl: "https://github.com/username/ai-generator",
  },
];
