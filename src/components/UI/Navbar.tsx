"use client";
import Logo from "./Logo";
import Link from "next/link";
import { FaUser, FaBook, FaMoon, FaSun } from "react-icons/fa";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import {
  getLocalItem,
  METHOD_NOT_ALLOWED_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  PROJECT_NAME,
  setLocalItem,
  SIGN_IN_URL,
  TOOL_TIP_CLASS_NAMES,
  UNAUTHORIZED_RESPONSE_CODE,
} from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import {
  NavbarBrand,
  NavbarContent,
  Navbar as NavbarWrapper,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useUser } from "@/hooks/useUser";
import { LuUser } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineExclamation } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { MdOutlineLanguage } from "react-icons/md";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LogOutModal from "./LogOutModal";

type Props = {
  showSearchBar?: boolean;
};

const Navbar: FC<Props> = ({ showSearchBar = true }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English"); //TODO: Add language string enum.

  useEffect(() => {
    const savedDarkMode = getLocalItem("dark") === "true";
    setDarkMode(savedDarkMode);

    if (savedDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => {
      const newDarkMode = !prev;

      if (newDarkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      setLocalItem("darkMode", JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };

  const handleLogout = async () => {
    const response = await axiosCredentialInstance.post(`/session/logout`);

    switch (response.status) {
      case METHOD_NOT_ALLOWED_RESPONSE_CODE:
      case OK_RESPONSE_CODE:
        setUser(null);
        setModalOpen(false);
        return;
      case UNAUTHORIZED_RESPONSE_CODE:
      case NOT_FOUND_RESPONSE_CODE:
        setUser(null);
        //TODO:Add toast.
        return;
      default:
        setUser(null);
        //TODO:Add toast.
        return;
    }
  };

  const themeTooltipText = darkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";

  return (
    <NavbarWrapper
      isBordered
      isBlurred={true}
      maxWidth="xl"
      classNames={{ content: "flex-[2]" }}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center">
          <Logo className="text-2xl font-bold text-neutral-900 dark:text-neutral-500" />
        </Link>
      </NavbarBrand>

      {showSearchBar && (
        <NavbarContent justify="center">
          <SearchBar />
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        <Tooltip
          classNames={TOOL_TIP_CLASS_NAMES}
          showArrow
          placement="bottom"
          content={themeTooltipText}
          delay={30}
          closeDelay={5}
        >
          <button
            onClick={toggleDarkMode}
            aria-label={themeTooltipText}
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
              {darkMode ? (
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
                  <FaSun size={20} />
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
                  <FaMoon size={20} />
                </motion.div>
              )}
            </motion.div>
          </button>
        </Tooltip>

        <Tooltip
          classNames={TOOL_TIP_CLASS_NAMES}
          showArrow
          placement="bottom"
          content={`About ${PROJECT_NAME}`}
          delay={30}
          closeDelay={5}
        >
          <Link href="/about" aria-label="About">
            <motion.div
              whileHover={{
                scale: 1.3,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            >
              <FaBook size={20} />
            </motion.div>
          </Link>
        </Tooltip>

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
                    <MdOutlineLanguage size={25} />
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
          content={user ? `Signed in as ${user.username}` : "Log in"}
        >
          <div>
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="default"
                    name={`${user.name} ${user.surname ?? ""}`.trim()}
                    size="sm"
                    src={user.image || undefined}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile-info"
                    isReadOnly
                    className="group !focus:ring-0 p-0"
                  >
                    <div className="flex items-center w-full h-full px-3 py-2 gap-2">
                      <p className="font-semibold">
                        Signed in as @{user.username}
                      </p>
                    </div>
                  </DropdownItem>

                  <DropdownItem
                    key="profile"
                    className="group !focus:ring-0 p-0"
                  >
                    <Link
                      href={`/user/${user.username}`}
                      className="flex items-center w-full h-full px-3 py-2 gap-2 group-hover:no-underline cursor-pointer"
                    >
                      <LuUser className="text-xl text-default-500 flex-shrink-0 group-hover:text-primary" />
                      <span className="text-default-500 group-hover:text-primary">
                        Profile
                      </span>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="savings"
                    className="group !focus:ring-0 p-0"
                  >
                    <Link
                      href="/savings"
                      className="flex items-center w-full h-full px-3 py-2 gap-2 group-hover:no-underline cursor-pointer"
                    >
                      <IoBookmarkOutline className="text-xl text-default-500 flex-shrink-0 group-hover:text-primary" />
                      <span className="text-default-500 group-hover:text-primary">
                        Savings
                      </span>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="user-settings"
                    className="group !focus:ring-0 p-0"
                  >
                    <Link
                      href="/settings"
                      className="flex items-center w-full h-full px-3 py-2 gap-2 group-hover:no-underline cursor-pointer"
                    >
                      <HiOutlineCog className="text-xl text-default-500 flex-shrink-0 group-hover:text-primary-500" />
                      <span className="text-default-500 group-hover:text-primary-500">
                        User Settings
                      </span>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="report-issue"
                    className="group !focus:ring-0 p-0"
                  >
                    <Link
                      href="/report-issue"
                      className="flex items-center w-full h-full px-3 py-2 gap-2 group-hover:no-underline cursor-pointer"
                    >
                      <HiOutlineExclamation className="text-xl text-default-500 flex-shrink-0 group-hover:text-warning-500" />
                      <span className="text-default-500 group-hover:text-warning-500">
                        Report an Issue
                      </span>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    className="group !focus:ring-0 p-0"
                    onPress={() => setModalOpen(true)}
                  >
                    <div className="flex items-center w-full h-full px-3 py-2 gap-2 cursor-pointer group-hover:no-underline">
                      <MdLogout className="text-xl text-default-500 flex-shrink-0 group-hover:text-red-500" />
                      <span className="text-default-500 group-hover:text-red-500">
                        Logout
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link href={SIGN_IN_URL} aria-label="User Profile">
                <motion.div
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.1, ease: "backIn" },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <FaUser size={20} />
                </motion.div>
              </Link>
            )}
          </div>
        </Tooltip>
      </NavbarContent>

      <LogOutModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setModalOpen}
        handleLogout={handleLogout}
      />
    </NavbarWrapper>
  );
};

export default Navbar;
