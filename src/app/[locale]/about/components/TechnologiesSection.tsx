"use client";

import { motion, Variants } from "framer-motion";
import { TechnologyCard } from "@/app/[locale]/about/components/TechnologyCard";
import { ClientUtils } from "@/util/ClientUtils";
import { instrumentSerif } from "@/fonts";

const TechnologiesSection = () => {
  return (
    <motion.section
      id="technologies-used"
      variants={technologyContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm sm:p-8"
    >
      <header className="mb-6 flex flex-col gap-1">
        <h2 className={`${instrumentSerif.className} text-4xl tracking-tight`}>
          Technologies Used
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore the stack below—each card links to the technology’s official
          website.
        </p>
      </header>

      <motion.div
        variants={technologyContainerVariants}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {ClientUtils.Constants.TechnologiesUsed.map((tech, idx) => (
          <motion.div key={idx} variants={techItemVariants} className="h-full">
            <TechnologyCard technology={tech} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TechnologiesSection;

const technologyContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const techItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
