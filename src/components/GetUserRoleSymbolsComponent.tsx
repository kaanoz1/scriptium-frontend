import { UserFetched } from "@/types/types";
import { RoleIcon } from "@/util/reactUtil";
import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import { FC, Fragment } from "react";

interface Props {
  rolesOfUser: UserFetched;
}

const GetUserRoleSymbolsComponent: FC<Props> = ({ rolesOfUser }) => {
  return (
    <Fragment>
      {rolesOfUser.roles.map((role, i) => (
        <Tooltip
          key={i}
          content={role}
          showArrow
          closeDelay={0}
          classNames={TOOL_TIP_CLASS_NAMES}
        >
          <span className="px-2">{RoleIcon[role].icon({ size: 20 })}</span>
        </Tooltip>
      ))}
    </Fragment>
  );
};

export default GetUserRoleSymbolsComponent;
