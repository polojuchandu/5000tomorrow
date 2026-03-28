'use client'

import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="bg-[#0A1628] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-white block"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
