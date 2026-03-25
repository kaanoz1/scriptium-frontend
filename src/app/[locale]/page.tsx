"use client"

import {NextPage} from "next";
import SearchBar from "@/components/Navbar/SearchBar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {motion, Variants} from "framer-motion";
import {LuBookOpen} from "react-icons/lu";
import {usePathname} from "next/navigation";

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {delayChildren: 0.15}
    }
};

const itemVariants: Variants = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {type: "spring", stiffness: 300, damping: 24}
    }
};

const Page: NextPage = () => {

    const pathname = usePathname();


    return (
        <main
            className="relative flex min-h-[calc(100vh-150px)] flex-col items-center justify-center overflow-hidden px-6 py-12 md:px-8">

            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-75 w-150 rounded-full bg-primary/10 blur-[120px] pointer-events-none"/>

            <motion.div
                className="flex w-full max-w-5xl flex-col items-center gap-10 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Scriptium
                    </h1>
                    <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
                        Universal theology library. Explore texts, roots, and semantics seamlessly.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full max-w-2xl relative z-20">
                    <div className="relative w-full rounded-xl shadow-2xl shadow-black/5 dark:shadow-black/40">
                        <SearchBar isCentered={false}/>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}
                            className="w-full mt-6 flex flex-wrap justify-center gap-6 text-left">
                    <Link href={pathname + "/i/q"} className="group outline-none w-full sm:w-87.5">
                        <Card
                            className="h-full transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <div
                                        className="p-2 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <LuBookOpen size={22}/>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold">Al - Qur&apos;an</CardTitle>
                                <CardDescription className="text-sm font-medium">القرآن الكريم</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Access the complete Arabic text, translations, and advanced root-word methodology
                                    search.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>

            </motion.div>
        </main>
    )
}

export default Page;