import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{
        duration: 0.45,
        ease: "easeOut"
      }}
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "20px 0"
      }}
    >
      {children}
    </motion.div>
  );
}