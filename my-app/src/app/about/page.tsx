'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Lightbulb, Target } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const sections = [
    { 
      icon: Users, 
      title: "Our Team", 
      description: "A diverse group of experts committed to excellence.",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-800/50"
    },
    { 
      icon: Lightbulb, 
      title: "Our Mission", 
      description: "To innovate and inspire through technology.",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-900/20",
      borderColor: "border-emerald-800/50"
    },
    { 
      icon: Target, 
      title: "Our Vision", 
      description: "To lead the industry in cutting-edge solutions.",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-800/50"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="space-y-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center mb-8"
            variants={fadeIn}
          >
            About Our Company
          </motion.h1>

          <motion.p 
            className="text-xl text-center max-w-3xl mx-auto text-gray-300"
            variants={fadeIn}
          >
            We are a team of passionate individuals dedicated to creating innovative solutions 
            that make a difference in people's lives.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {sections.map((section, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className={`${section.bgColor} border ${section.borderColor} backdrop-blur-sm`}>
                  <CardContent className="p-6 text-center">
                    <section.icon className={`w-12 h-12 mx-auto mb-4 ${section.iconColor}`} />
                    <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                    <p className="text-gray-300">{section.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center space-y-6"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to industry leaders, our journey has been one of 
              continuous growth and learning.
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            variants={fadeIn}
          >
            <Link href="/contact" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                Get in Touch <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated background elements with matching colors */}
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full opacity-5 ${section.bgColor}`}
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}