import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode | JSX.Element;
}

const UIWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center min-h-[calc(100vh-130px)] bg-white dark:bg-dark">
      <div className="w-full max-w-7xl p-6 mt-6 mx-auto bg-white dark:bg-dark">
        <div className="flex w-full flex-col">{children}</div>
      </div>
    </div>
  );
};

export default UIWrapper;
