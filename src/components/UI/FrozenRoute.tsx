import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FC, ReactNode, useContext, useRef } from "react";

interface Props {
  children: ReactNode;
}
//This component is about to fix the issue about Framer Motion exit animations. Visit: https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion
const FrozenRoute: FC<Props> = ({ children }) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
};

export default FrozenRoute;
