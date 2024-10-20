'use client';

import { motion } from 'framer-motion';

const AnimatedTitle = () => (
  <motion.h1
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="text-4xl font-bold text-center mb-12 text-gray-800"
  >
    How It Works
  </motion.h1>
);

export default AnimatedTitle;
