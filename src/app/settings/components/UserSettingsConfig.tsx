import { NextPage } from "next";

import { UserOwnDTO } from "@/types/classes/User";
import ChangePasswordCard from "./ChangePasswordCard";
import DeleteAccountCard from "./DeleteAccountCard";
import FreezeAccountCard from "./FreezeAccountCard";
import ChangeEmailCard from "./ChangeEmailCard";

type Props = {
  user: UserOwnDTO;
  setUser: (user: UserOwnDTO | null) => void;
};

const UserSettingsConfig: NextPage<Props> = ({ setUser }) => {
  return (
    <section className="flex flex-col items-center py-10 px-4 min-h-screen gap-6">
      <h2 className="mb-4 font-bold text-2xl">Account Configuration</h2>
      <ChangeEmailCard />
      <ChangePasswordCard />
      <FreezeAccountCard setUser={setUser} />
      <DeleteAccountCard />
    </section>
  );
};

export default UserSettingsConfig;
