"use client";
import { FC, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScriptureProvider } from "@/contexts/ScriptureContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  //This component has a part which is about to fix the issue about Framer Motion exit animations. Visit: https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion

  return (
    <HeroUIProvider locale="en-US" navigate={router.push}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <ToastProvider toastOffset={57} />
        <QueryClientProvider client={queryClient}>
          <ScriptureProvider>
            {/* <UserProvider> */}
            {/*
          This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
           */}
            <AnimatePresence mode="wait">
              <motion.div key={pathname}>
                {/* <FrozenRoute> */}
                <Navbar isMainPage={pathname != "/"} />
                {children}
                <Footer />
                <ReactQueryDevtools />
                {/* </FrozenRoute> */}
              </motion.div>
            </AnimatePresence>
            {/* </UserProvider> */}
          </ScriptureProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
};

const queryClient = new QueryClient();

export default Providers;
