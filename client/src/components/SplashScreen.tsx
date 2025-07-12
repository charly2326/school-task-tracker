// src/components/SplashScreen.tsx
import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center bg-violet-500 text-white text-3xl font-bold"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      MisCosas
    </motion.div>
  );
}

