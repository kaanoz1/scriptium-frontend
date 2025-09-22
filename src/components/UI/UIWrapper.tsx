import { FC, JSX, ReactNode } from "react";

interface Props {
  children: ReactNode | JSX.Element;
}
const UIWrapper: FC<Props> = ({ children }) => {
  return (
    <div
      className="
        flex justify-center items-stretch          
        bg-white dark:bg-dark
        overflow-x-hidden 
        overflow-y-hidden                   
        md:min-h-[calc(100dvh-130px)]              
      "
    >
      <div
        className="
          w-full max-w-7xl mx-auto
          bg-white dark:bg-dark
          p-4 sm:p-6 md:px-8 md:py-6               
          mt-4 sm:mt-6                               
        "
      >
        {children}
      </div>
    </div>
  );
};

export default UIWrapper;
