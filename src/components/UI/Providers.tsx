"use client";
import { FC, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import FrozenRoute from "./FrozenRoute";
import { HeroUIProvider } from "@heroui/system";
import { UserProvider } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScriptureProvider } from "@/contexts/ScriptureContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastProvider } from "@heroui/toast";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  //This component has a part which is about to fix the issue about Framer Motion exit animations. Visit: https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion

  return (
    <HeroUIProvider locale="en-US" navigate={router.push}>
      <ToastProvider />
      <QueryClientProvider client={queryClient}>
        <ScriptureProvider>
          <AnimatePresence mode="wait">
            <motion.div key={pathname}>
              <FrozenRoute>
                <UserProvider>
                  <Navbar showSearchBar={pathname != "/"} />
                  {children}
                  <Footer />
                  <ReactQueryDevtools />
                </UserProvider>
              </FrozenRoute>
            </motion.div>
          </AnimatePresence>
        </ScriptureProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 60,
    },
  },
});
