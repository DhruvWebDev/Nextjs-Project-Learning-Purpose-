'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function GridTaskPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating check circles */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1], 
                  scale: [1, 1.2, 1],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <CheckCircle className="text-green-500 opacity-10" size={Math.random() * 20 + 15} />
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/50 to-zinc-950/20" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-white mb-6">Completed Tasks</h1>
        {/* Add your completed tasks list component here */}
      </div>
    </div>
  )
}