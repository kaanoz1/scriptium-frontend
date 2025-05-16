import { UserFetchedDTO } from "@/types/classes/User";
import { RoleIcon } from "@/util/reactUtil";
import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import { FC, Fragment } from "react";

interface Props {
  user: UserFetchedDTO;
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
          {/*TODO: Create type for roles T_Roles */}
        </Tooltip>
      ))}
    </Fragment>
  );
};

export default GetUserRoleSymbolsComponent;
