"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export default function GlobalLoadingOverlay() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Spinner />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <div className="relative h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border-2 border-foreground/15" />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
