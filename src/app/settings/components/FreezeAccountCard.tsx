import { FC, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useForm } from "react-hook-form";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { useRouter } from "next/navigation";

const passwordValidation = {
  required: { value: true, message: "Password is required." },
  minLength: { value: 6, message: "Minimum 6 characters." },
};

type FreezeAccountCardProps = {
  setUser: (user: null) => void;
};

const FreezeAccountCard: FC<FreezeAccountCardProps> = ({ setUser }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ password: string }>();

  const onSubmit = handleSubmit(async ({ password }) => {
    setError(null);
    try {
      const res = await axiosCredentialInstance.post(`/session/freeze`, { password });
      if (res.status === 200) {
        setUser(null);
        router.push("/");
      } else setError("Failed to freeze account.");
    } catch (e) {
      setError("Something went wrong.");
    }
  });

  return (
    <Card className="max-w-md w-full">
      <CardBody className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Freeze Account</h3>
        <p className="text-sm text-default-500">Freezing your account disables access until re-login.</p>
        <Button onPress={() => setOpen(true)} variant="bordered" color="primary">Freeze Account</Button>
      </CardBody>

      <Modal isOpen={open} onOpenChange={(open) => { setOpen(open); if (!open) reset(); }}>
        <ModalContent>
          <ModalHeader>Freeze Account</ModalHeader>
          <form onSubmit={onSubmit}>
            <ModalBody>
              <Input type="password" label="Password" fullWidth {...register("password", passwordValidation)} isInvalid={!!errors.password} errorMessage={errors.password?.message} />
              {error && <p className="text-red-500 text-sm font-medium mt-2">{error}</p>}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" isLoading={isSubmitting} color="primary">Freeze</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default FreezeAccountCard;