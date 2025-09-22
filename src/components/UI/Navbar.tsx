"use client";
import Logo from "./Logo";
import Link from "next/link";
import {
  FaUser,
  FaBook,
  FaMoon,
  FaSun,
  FaBookOpen,
  FaChartBar,
  FaDiscord,
} from "react-icons/fa";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

import { Tooltip } from "@heroui/tooltip";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarWrapper,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { HiChevronDown } from "react-icons/hi";
import { MdOutlineLanguage } from "react-icons/md";
import { PROJECT_NAME, TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { Button } from "@heroui/button";
const ScriptiumText = dynamic(() => import("@/components/main/ScriptiumText"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

type Props = {
  isMainPage: boolean;
};

const Navbar: FC<Props> = ({ isMainPage = true }) => {
  const isUserLoading: boolean = false;
  const { theme, setTheme } = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarWrapper
      isBordered
      isBlurred={true}
      maxWidth="xl"
      classNames={{ content: "flex-[2]" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <Logo className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-black dark:text-white" />
          </Link>
          {isMainPage || (
            <span>
              <ScriptiumText />
            </span>
          )}
        </NavbarBrand>
      </NavbarContent>

      {isMainPage && (
        <NavbarContent className="hidden sm:flex" justify="center">
          <SearchBar />
        </NavbarContent>
      )}

      <NavbarContent className="hidden sm:flex" justify="end">
        <Tooltip
          classNames={TOOL_TIP_CLASS_NAMES}
          showArrow
          placement="bottom"
          content={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
          delay={30}
          closeDelay={5}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            className="focus:outline-none"
          >
            <motion.div
              whileHover={{
                scale: 1.3,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    rotate: 20,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                >
                  <FaSun className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  transition={{ duration: 0.019 }}
                  whileHover={{
                    rotate: 20,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }}
                >
                  <FaMoon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.div>
              )}
            </motion.div>
          </button>
        </Tooltip>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                radius="sm"
                variant="light"
                endContent={
                  <HiChevronDown
                    size={16}
                    className="text-black dark:text-white"
                  />
                }
                className="text-black dark:text-white font-medium px-2"
                aria-label={`About ${PROJECT_NAME}`}
              >
                <FaBook className="w-5 h-5 md:w-6 md:h-6 mr-1 text-black dark:text-white" />
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="About Menu"
            className="min-w-[260px] px-1"
            itemClasses={{
              base: "rounded-md transition-all duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            }}
          >
            <DropdownItem key="about" textValue="About">
              <Link
                href="/about"
                className="flex items-center gap-3 px-2 py-2 hover:no-underline"
              >
                <FaBookOpen className="w-5 h-5 md:w-6 md:h-6 text-neutral-800 dark:text-neutral-300" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">About Project</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Learn more about our mission and {PROJECT_NAME}.
                  </span>
                </div>
              </Link>
            </DropdownItem>

            <DropdownItem key="statistics" textValue="Statistics">
              <Link
                href="/statistics"
                className="flex items-center gap-3 px-2 py-2 hover:no-underline"
              >
                <FaChartBar className="w-5 h-5 md:w-6 md:h-6 text-neutral-800 dark:text-neutral-300" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Site Statistics</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    View user and usage data.
                  </span>
                </div>
              </Link>
            </DropdownItem>

            <DropdownItem key="discord" textValue="Discord">
              <Link
                href="/discord"
                className="flex items-center gap-3 px-2 py-2 hover:no-underline"
              >
                <FaDiscord className="w-5 h-5 md:w-6 md:h-6 text-neutral-800 dark:text-neutral-300" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {PROJECT_NAME}'s Discord bot
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Inform about Discord bot of {PROJECT_NAME}.
                  </span>
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Tooltip
          classNames={TOOL_TIP_CLASS_NAMES}
          delay={30}
          closeDelay={5}
          showArrow
          placement="bottom"
          content="Site Language"
        >
          <aside>
            <Dropdown>
              <DropdownTrigger>
                <motion.div
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <div className="cursor-pointer">
                    <MdOutlineLanguage className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </motion.div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Language"
                onAction={(key) => setSelectedLanguage(key as string)}
              >
                <DropdownSection title="Select Website Language">
                  <DropdownItem
                    key="English"
                    className={
                      selectedLanguage === "English" ? "text-primary-500" : ""
                    }
                  >
                    English
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </aside>
        </Tooltip>

        <Tooltip
          classNames={TOOL_TIP_CLASS_NAMES}
          showArrow
          delay={30}
          closeDelay={5}
          placement="bottom"
          content={isUserLoading ? "Loading..." : "Not supported yet. Log in"}
        >
          <motion.div
            whileHover={{
              scale: 1.3,
              transition: { duration: 0.1, ease: "backIn" },
            }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          >
            <FaUser className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </Tooltip>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            className="w-full flex items-center gap-3 px-2 py-2 hover:no-underline focus:outline-none"
          >
            {theme === "dark" ? (
              <FaSun className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
            ) : (
              <FaMoon className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
            )}
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">Theme</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {theme === "dark"
                  ? "Currently Dark Mode"
                  : "Currently Light Mode"}
              </span>
            </div>
          </button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/about"
            className="flex items-center gap-3 px-2 py-2 hover:no-underline"
          >
            <FaBookOpen className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">About Project</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Learn more about our mission and {PROJECT_NAME}.
              </span>
            </div>
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            href="/statistics"
            className="flex items-center gap-3 px-2 py-2 hover:no-underline"
          >
            <FaChartBar className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Site Statistics</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                View user and usage data.
              </span>
            </div>
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            href="/discord"
            className="flex items-center gap-3 px-2 py-2 hover:no-underline"
          >
            <FaDiscord className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {PROJECT_NAME}'s Discord bot
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Inform about Discord bot of {PROJECT_NAME}.
              </span>
            </div>
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Button
            radius="sm"
            variant="light"
            className="text-black dark:text-white font-medium px-2"
            aria-label={`Log In for ${PROJECT_NAME}`}
          >
            <FaUser className="w-5 h-5 mr-1 text-black dark:text-white" />
            Log In (Not supported yet.)
          </Button>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:no-underline">
                <MdOutlineLanguage className="w-6 h-6 text-neutral-800 dark:text-neutral-300" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">Language</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Select website language
                  </span>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Language"
              onAction={(key) => setSelectedLanguage(key as string)}
            >
              <DropdownSection title="Select Website Language">
                <DropdownItem
                  key="English"
                  className={
                    selectedLanguage === "English" ? "text-primary-500" : ""
                  }
                >
                  English
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
