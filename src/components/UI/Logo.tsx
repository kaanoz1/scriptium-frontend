"use client";
import { FC } from "react";
import ScriptiumLogo from "@/assets/svgs/scriptium-svg-light-theme.svg";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <ScriptiumLogo
        className={
          className ??
          "w-12 h-12 text-black bg-amber-50 dark:text-white dark:bg-dark"
        }
      />
    </div>
  );
};

export default Logo;
