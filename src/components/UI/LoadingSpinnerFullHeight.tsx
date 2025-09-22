import { Spinner } from "@heroui/spinner";
import { FC } from "react";

const LoadingSpinnerHeight: FC = ({}) => {
  return (
    <div className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <Spinner color="default" size="lg" />
    </div>
  );
};

export default LoadingSpinnerHeight;
