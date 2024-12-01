"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Repeat,
  BarChart,
  Zap,
  Shield,
  Workflow,
  Star,
} from "lucide-react";
import Link from "next/link";
import { testimonials } from "@/components/testimonials";
export default function Component() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="#"
            className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
          >
            Showcase
          </Link>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section with Grid Background and Fade Effect */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            The Modern Task Management Platform
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Used by thousands of teams worldwide. Built to enable your team to
            create high-performance workflows and boost productivity.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-white hover:bg-blue-500 hover:text-white transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">
          What&apos;s in TaskFlow?
        </h2>
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Clock,
              title: "Real-time Updates",
              desc: "See changes as they happen. Get instant updates when tasks are modified or completed.",
              color: "border-blue-500",
              textColor: "text-blue-500",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              desc: "Work together seamlessly. Share tasks, assign responsibilities, and track progress.",
              color: "border-green-500",
              textColor: "text-green-500",
            },
            {
              icon: Calendar,
              title: "Smart Scheduling",
              desc: "Plan ahead with intelligent scheduling. Set deadlines and get reminders.",
              color: "border-yellow-500",
              textColor: "text-yellow-500",
            },
            {
              icon: Repeat,
              title: "Automated Workflows",
              desc: "Create custom workflows. Automate repetitive tasks and save time.",
              color: "border-purple-500",
              textColor: "text-purple-500",
            },
            {
              icon: BarChart,
              title: "Analytics & Insights",
              desc: "Track productivity metrics. Get insights into team performance and project progress.",
              color: "border-red-500",
              textColor: "text-red-500",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              desc: "Keep your data safe. Enterprise-grade security with advanced permissions.",
              color: "border-indigo-500",
              textColor: "text-indigo-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`border-2 ${feature.color} bg-gray-900 p-6 hover:bg-gray-800 transition-colors`}
            >
              <feature.icon className={`mb-4 h-8 w-8 ${feature.textColor}`} />
              <h3 className={`mb-2 text-xl font-semibold ${feature.textColor}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-6 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">
          What Our Users Say
        </h2>
        <div className="relative mx-auto max-w-4xl h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <p className="mb-4 text-xl italic">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="border-t border-gray-800 px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Built on a foundation of performance and reliability
        </h2>
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
            <Zap className="mb-4 h-8 w-8 text-yellow-500" />
            <h3 className="mb-2 text-xl font-semibold text-yellow-500">
              Lightning Fast
            </h3>
            <p className="text-sm text-gray-400">
              Optimized for speed and responsiveness.
            </p>
          </Card>
          <Card className="border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
            <Workflow className="mb-4 h-8 w-8 text-blue-500" />
            <h3 className="mb-2 text-xl font-semibold text-blue-500">
              Scalable
            </h3>
            <p className="text-sm text-gray-400">
              Grows with your team and workload.
            </p>
          </Card>
          <Card className="border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
            <Shield className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="mb-2 text-xl font-semibold text-green-500">
              Secure
            </h3>
            <p className="text-sm text-gray-400">
              Enterprise-grade security built-in.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="mb-10 text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl font-medium bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-lg text-white no-underline hover:no-underline">
                How does TaskFlow compare to other task management tools?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-800 mt-2 px-6 py-4 rounded-lg text-gray-300">
                TaskFlow stands out with its real-time collaboration features,
                intuitive interface, and powerful analytics. Unlike other tools,
                we focus on providing a seamless experience for both small teams
                and large enterprises.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl font-medium bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-lg text-white no-underline hover:no-underline">
                Can I integrate TaskFlow with other tools we use?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-800 mt-2 px-6 py-4 rounded-lg text-gray-300">
                Yes, TaskFlow offers a wide range of integrations with popular
                tools like Slack, Google Workspace, and Microsoft Office. We
                also provide a robust API for custom integrations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl font-medium bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-lg text-white no-underline hover:no-underline">
                Is TaskFlow suitable for remote teams?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-800 mt-2 px-6 py-4 rounded-lg text-gray-300">
                TaskFlow is perfect for remote teams. Our real-time updates,
                collaborative features, and cloud-based infrastructure ensure
                that your team stays connected and productive, no matter where
                they are located.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <p className="mt-12 text-gray-400 text-lg">
            Ready to get started?{" "}
            <a
              href="#"
              className="text-blue-500 no-underline hover:no-underline hover:text-blue-400"
            >
              Sign up now
            </a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 px-6 py-24 text-center">
        <h2 className="mb-8 text-3xl font-bold">Get started in seconds</h2>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg py-6 px-8">
          Start Using TaskFlow
        </Button>
      </section>
    </div>
  );
}
