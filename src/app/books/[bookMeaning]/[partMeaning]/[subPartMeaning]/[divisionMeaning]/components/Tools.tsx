import { FC, ReactNode } from "react";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import { TOOL_TIP_CLASS_NAMES } from "@/util/constants";

type Props = {
  functionWhichOpensSettingsModal: () => void;
};

const Tools: FC<Props> = ({ functionWhichOpensSettingsModal }): ReactNode => {
  return (
    <div className="py-1 px-2 flex items-center justify-evenly gap-5">
      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <span className="flex items-center justify-center">
          {/*Since items-center tag does not affect this span as it is located in Tooltip, I had to adjust it again. */}
          <Link isDisabled={true} color="foreground">
            <IoPlayOutline size={21} />
          </Link>
        </span>
      </Tooltip>
      <IoSettingsOutline
        className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
        onClick={functionWhichOpensSettingsModal}
        size={19}
      />
      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <MdTranslate size={19} className="opacity-50" />
      </Tooltip>
    </div>
  );
};

export default Tools;
