import { Spinner } from "@heroui/spinner";
import { FC } from "react";

interface Props {
  size?: "lg" | "md" | "sm";
}

const LoadingSpinner: FC<Props> = ({ size = "lg" }) => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Spinner color="default" size={size} />
    </div>
  );
};

export default LoadingSpinner;
