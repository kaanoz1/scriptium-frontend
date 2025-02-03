import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import { FC } from "react";
import { LuLock } from "react-icons/lu";

const PrivateAccountIcon: FC = () => {
  return (
    <Tooltip
      showArrow
      placement="top"
      classNames={TOOL_TIP_CLASS_NAMES}
      content="Private account"
      closeDelay={100}
      delay={100}
    >
      <span className="px-2">
        <LuLock size={20} />
      </span>
    </Tooltip>
  );
};

export default PrivateAccountIcon;
