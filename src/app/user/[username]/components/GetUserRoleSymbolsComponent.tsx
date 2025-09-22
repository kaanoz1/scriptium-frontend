import { UserFetched } from "@/types/classes/model/User/User";
import { TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { RoleIcon } from "@/util/reactUtil";
import { Tooltip } from "@heroui/tooltip";
import { FC, Fragment } from "react";

interface Props {
  user: UserFetched;
}

const GetUserRoleSymbolsComponent: FC<Props> = ({ user }) => {
  return (
    <Fragment>
      {user.getRoles().map((role, i) => (
        <Tooltip
          key={i}
          content={role}
          showArrow
          closeDelay={0}
          classNames={TOOL_TIP_CLASS_NAMES}
        >
          <span className="px-2">{RoleIcon[role]?.icon({ size: 20 })}</span>{" "}
        </Tooltip>
      ))}
    </Fragment>
  );
};

export default GetUserRoleSymbolsComponent;
