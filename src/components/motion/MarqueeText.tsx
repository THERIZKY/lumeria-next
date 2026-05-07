"use client";

import { motion } from "framer-motion";

interface MarqueeTextProps {
  texts: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export function MarqueeText({
  texts,
  speed = 30,
  separator = "✦",
  className = "",
}: MarqueeTextProps) {
  const combinedText = texts.join(` ${separator} `);
  const repeatedText = `${combinedText} ${separator} ${combinedText} ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block pr-4">{repeatedText}</span>
        <span className="inline-block pr-4">{repeatedText}</span>
      </motion.div>
    </div>
  );
}
