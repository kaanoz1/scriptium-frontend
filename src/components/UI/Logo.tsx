"use client";
import { FC } from "react";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => {
  return <div className={className}>Logo</div>;
};

export default Logo;
