import { useSwitch } from "@heroui/switch";
import { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  className?: string;
  variation: string;
  required: string;
  children: ReactNode;
  onClick: () => void;
  font: string;
}

const VocalizationSwitch: NextPage<Props> = ({
  className,
  variation,
  required,
  children,
  onClick,
  font,
}) => {
  const props = { isSelected: required == variation };

  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props);

  return (
    <div onClick={onClick} className="flex flex-col gap-2 ">
      <Component {...getBaseProps()}>
        <div className="hidden">
          <input {...getInputProps()} />
        </div>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-16 h-16",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200  text-4xl",
              `${
                variation == required
                  ? "outline-blue-700 dark:outline-white"
                  : ""
              } ${className} ${font}`,
            ],
          })}
        >
          {children}
        </div>
      </Component>
    </div>
  );
};

export default VocalizationSwitch;
