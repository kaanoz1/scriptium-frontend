import { Button } from "@heroui/button";
import { Dispatch, FC, SetStateAction } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

interface Props {
  stateFunctionOfInformationModal: Dispatch<SetStateAction<boolean>>;
}

const UserPageInformationButton: FC<Props> = ({
  stateFunctionOfInformationModal,
}) => {
  return (
    <Button
      onPress={() => stateFunctionOfInformationModal(true)}
      isIconOnly
      variant="light"
      radius="md"
      color="primary"
      className="p-0"
    >
      <IoInformationCircleOutline size={16} />
    </Button>
  );
};

export default UserPageInformationButton;
