"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-12">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-500 dark:text-white"
            >
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-500 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-gray-500 dark:text-white"
            >
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-500 dark:text-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-gray-500 dark:text-white"
            >
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-gray-500 dark:text-white"
              placeholder="Your message..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {submitStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                submitStatus === "success"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {submitStatus === "success"
                ? "Message sent successfully!"
                : "Something went wrong. Please try again."}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
