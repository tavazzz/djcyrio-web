import { motion } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";

export default function ScrollProgress() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.6)",
        }}
      />
    </div>
  );
}
