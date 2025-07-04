"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { ImFilePicture } from "react-icons/im";
import { Card, CardBody } from "@heroui/card";
import { User as UserComponent } from "@heroui/user";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  displayErrorToast,
  getFormattedNameAndSurnameFromString,
} from "@/util/utils";
import { UserOwnDTO } from "@/types/classes/User";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  PROJECT_URL,
} from "@/util/constants";
import { ResponseMessage } from "@/types/response";

interface Props {
  user: UserOwnDTO;
  setUser: (user: UserOwnDTO | null) => void;
}

interface FormValues {
  name?: string;
  surname?: string;
  username?: string;
  biography?: string;
  image?: FileList;
}

const UserSettingsEditUser: NextPage<Props> = ({ user, setUser }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: user.getName(),
      surname: user.getSurname() ?? "",
      username: user.getUsername() ?? "",
      biography: user.getBiography() ?? "",
    },
  });

  const imageRegister = register("image");

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    const nameChanged =
      data.name !== undefined && data.name.trim() !== user.getName();
    const surnameChanged =
      data.surname !== undefined &&
      data.surname.trim() !== (user.getSurname() ?? "");
    const usernameChanged =
      data.username !== undefined &&
      data.username.trim() !== user.getUsername();
    const biographyChanged =
      data.biography !== undefined &&
      data.biography.trim() !== (user.getBiography() ?? "");
    const imageChanged = data.image?.[0] != null;

    if (
      !nameChanged &&
      !surnameChanged &&
      !usernameChanged &&
      !biographyChanged &&
      !imageChanged
    ) {
      console.log("NoChanges detected");
      displayErrorToast("No changes detected.");
      return;
    }

    if (nameChanged)
      formData.append("name", data.name === "" ? "" : data.name!.trim());
    if (surnameChanged)
      formData.append(
        "surname",
        data.surname === "" ? "" : data.surname!.trim()
      );
    if (usernameChanged)
      formData.append(
        "username",
        data.username === "" ? "" : data.username!.trim()
      );
    if (biographyChanged)
      formData.append(
        "biography",
        data.biography === "" ? "" : data.biography!.trim()
      );
    if (imageChanged) formData.append("image", data.image![0]!);
    try {
      const response = await axiosCredentialInstance.put<ResponseMessage>(
        "/session/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === OK_HTTP_RESPONSE_CODE) {
        if (nameChanged && data.name) user.setName(data.name.trim());
        if (surnameChanged && data.surname)
          user.setSurname(data.surname.trim() ?? null);
        if (usernameChanged && data.username)
          user.setUsername(data.username.trim());
        if (biographyChanged && data.biography)
          user.setBiography(data.biography.trim());
        setUser(user);
        router.push(`/user/${user.getUsername()}`);
      } else if (response.status === CONFLICT_HTTP_RESPONSE_CODE) {
        setError("username", { message: "Username already in use." });
      }
    } catch (error) {
      console.error(error);
      console.log("düştü");
      displayErrorToast(
        "An unexpected error occurred while updating your profile."
      );
    }
  });

  return (
    <Fragment>
      <main className="flex flex-col items-center py-10 px-4 min-h-screen">
        <h2 className="mb-8 font-bold text-2xl">Edit Your Profile</h2>
        <Card className="max-w-2xl w-full mb-8">
          <CardBody>
            <div className="flex items-center justify-between">
              <UserComponent
                avatarProps={{
                  src: user.getImage() ?? "",
                  name: getFormattedNameAndSurnameFromString(
                    user.getName(),
                    user.getSurname()
                  ),
                  className: "h-20 w-20",
                }}
                name={user.getName()}
                description={
                  <Link
                    href={`${PROJECT_URL}/user/${user.getUsername()}`}
                    isExternal
                    size="sm"
                  >
                    @{user.getUsername()}
                  </Link>
                }
              />
              <Button
                color="primary"
                startContent={<ImFilePicture size={16} />}
                onPress={() => fileInputRef.current?.click()}
              >
                Change Profile Picture
              </Button>
              <input
                type="file"
                ref={(el) => {
                  fileInputRef.current = el;
                  imageRegister.ref(el);
                }}
                accept="image/jpeg,image/jpg"
                className="hidden"
                onChange={imageRegister.onChange}
                onBlur={imageRegister.onBlur}
                name={imageRegister.name}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="max-w-2xl w-full">
          <CardBody>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Input
                label="Name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Surname"
                variant="bordered"
                isInvalid={!!errors.surname}
                errorMessage={errors.surname?.message}
                {...register("surname")}
              />
              <Input
                label={
                  <div className="flex items-center gap-1">
                    <FiUser size={16} />
                    Username
                  </div>
                }
                variant="bordered"
                description="You can change your username 3 times within a week."
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
                {...register("username", {
                  minLength: {
                    value: 5,
                    message: "Username must be at least 5 characters long.",
                  },
                  maxLength: {
                    value: 16,
                    message: "Username cannot exceed 16 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])[a-z0-9._]+$/,
                    message:
                      "Username must contain at least one lowercase letter and can only include lowercase letters, numbers, '.', and '_'.",
                  },
                })}
              />
              <Textarea
                label="Biography"
                placeholder="Tell a bit about yourself..."
                variant="bordered"
                description="You can provide a short description about yourself (max 256 chars)."
                isInvalid={!!errors.biography}
                errorMessage={errors.biography?.message}
                minRows={3}
                {...register("biography", {
                  maxLength: {
                    value: 256,
                    message: "Biography cannot exceed 256 characters.",
                  },
                })}
              />
              <Button type="submit" color="primary" isLoading={isSubmitting}>
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </main>
    </Fragment>
  );
};

export default UserSettingsEditUser;
