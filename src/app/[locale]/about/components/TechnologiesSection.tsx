"use client";

import { motion, Variants } from "framer-motion";
import { TechnologyCard } from "@/app/[locale]/about/components/TechnologyCard";
import { ClientUtils } from "@/util/ClientUtils";



const TechnologiesSection = () => {
    return (
        <motion.section
            id="technologies-used"
            variants={technologyContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm"
        >
            <header className="mb-6 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground font-cinzel mb-2">
                    <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        Technologies Used
                    </span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Explore the stack below—each card links to the technology’s official
                    website.
                </p>
            </header>

            <motion.div
                variants={technologyContainerVariants}
                className="flex flex-wrap justify-center gap-4"
            >
                {ClientUtils.Constants.TechnologiesUsed.map((tech, idx) => (
                    <motion.div
                        key={idx}
                        variants={techItemVariants}
                        className="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)]"
                    >
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
        opacity: 0
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
        y: 20
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