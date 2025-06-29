"use client";

import { NextPage } from "next";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { ImFilePicture } from "react-icons/im";
import { Card, CardBody } from "@heroui/card";
import { User as UserComponent } from "@heroui/user";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import InternalServerError from "../../../components/UI/InternalServerError";
import TooManyRequest from "../../../components/UI/TooManyRequest";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import {
  T_NoAuthenticationRequestErrorCode,
  ResponseMessage,
} from "@/types/response";
import { UserOwnDTO } from "@/types/classes/User";
import {
  OK_HTTP_RESPONSE_CODE,
  SIGN_IN_URL,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  PROJECT_URL,
} from "@/util/constants";
import { getFormattedNameAndSurnameFromString } from "@/util/utils";

type Props = {
  user: UserOwnDTO;
  setUser: (user: UserOwnDTO | null) => void;
  fetchUser: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserOwnDTO>>;
};

interface IUserUpdateProfile {
  email?: string;
  username?: string;
  image?: FileList;
  name?: string;
  surname?: string;
  languageId?: string;
  biography?: string;
  gender?: string;
}

const UserSettingsEditUser: NextPage<Props> = ({
  user,
  setUser,
  fetchUser,
}) => {
  const router = useRouter();

  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [showCropModal, setShowCropModal] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [nameValue, setNameValue] = useState<string | undefined>(undefined);
  const [surnameValue, setSurnameValue] = useState<string | undefined>(
    undefined
  );
  const [usernameValue, setUsernameValue] = useState<string | undefined>(
    undefined
  );
  const [emailValue, setEmailValue] = useState<string | undefined>(undefined);
  const [biographyValue, setBiographyValue] = useState<string | undefined>(
    undefined
  );
  const [genderValue, setGenderValue] = useState<string | undefined>(undefined);
  const [languageValue, setLanguageValue] = useState<number | undefined>(
    undefined
  );
  const [error, setError] = useState<
    T_NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
    clearErrors,
  } = useForm<IUserUpdateProfile>();

  const {
    ref: imageRef,
    onChange: imageOnChange,
    onBlur,
    name,
  } = register("image");

  useEffect(() => {
    if (user) {
      setNameValue(user.getName());
      setSurnameValue(user.getSurname() ?? undefined);
      setUsernameValue(user.getUsername() ?? undefined);
      setEmailValue(user.getEmail() ?? undefined);
      setBiographyValue(user.getBiography() ?? undefined);
      setGenderValue(user.getGender() ?? undefined);
      setLanguageValue(user.getLangId());
    }
  }, [user, setUser]);

  const onSubmit = handleSubmit(async () => {
    if (!user) return;

    const data = new FormData();

    if (nameValue !== undefined && nameValue !== user.getName())
      data.append("name", nameValue);
    if (surnameValue !== undefined && surnameValue !== user.getSurname())
      data.append("surname", surnameValue);
    if (usernameValue !== undefined && usernameValue !== user.getUsername())
      data.append("username", usernameValue);
    if (emailValue !== undefined && emailValue !== user.getEmail())
      data.append("email", emailValue);
    if (biographyValue !== undefined && biographyValue !== user.getBiography())
      data.append("biography", biographyValue);
    if (genderValue !== undefined && genderValue !== user.getGender())
      data.append("gender", genderValue);
    if (languageValue !== undefined && languageValue !== user.getLangId())
      data.append("languageId", languageValue.toString());

    if (originalFile) data.append("image", originalFile);

    try {
      const response = await axiosCredentialInstance.put<ResponseMessage>(
        `/session/update`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          await fetchUser();
          router.push(user ? `user/${user.getUsername()}` : SIGN_IN_URL);
          return;
        case CONFLICT_HTTP_RESPONSE_CODE:
          switch (response.data.message) {
            case "Username already exists.":
              setFormError("username", {
                message: "Username is in use.",
              });
              return;
            case "Email already exists.":
              setFormError("email", {
                message: "Email already in use.",
              });
              return;
            default:
              setFormError("root", {
                message:
                  "Something went wrong. This might has to do something with server.",
              });
              return;
          }
        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          setError(TOO_MANY_REQUEST_HTTP_RESPONSE_CODE);
          return undefined;
        default:
          setError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
          return undefined;
      }
    } catch (error) {
      console.error(error);
      setError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
    }
  });

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      setProfilePicture(user.getImage());
      setOriginalFile(null);
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;

    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
    } catch {
      setFormError("image", { message: "Invalid image file." });
      URL.revokeObjectURL(url);
      return;
    }

    const isSquare = image.width === image.height;
    const withinBounds =
      image.width <= 1080 && image.height <= 1080 && isSquare;

    URL.revokeObjectURL(url);

    if (!withinBounds) {
      setShowCropModal(true);
      setOriginalFile(file);
    } else {
      clearErrors("image");
      setProfilePicture(URL.createObjectURL(file));
      setOriginalFile(file);
    }
  };

  const handleCrop = () => {
    setShowCropModal(false);

    if (originalFile) {
      setProfilePicture(URL.createObjectURL(originalFile));
    }
  };
  if (error && error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <InternalServerError />;

  const formattedName = getFormattedNameAndSurnameFromString(
    nameValue ?? user.getName(),
    surnameValue
  );

  //TODO: Implement crop model.

  return (
    <Fragment>
      <main className="flex flex-col items-center py-10 px-4 min-h-screen">
        <h2 className="mb-8 font-bold text-2xl">Edit Your Profile</h2>
        <Card className="max-w-2xl w-full mb-8">
          <CardBody>
            <div className="flex items-center justify-between">
              <UserComponent
                avatarProps={{
                  src: profilePicture || user.getImage(),
                  name: formattedName,
                  className: "h-20 w-20",
                }}
                name={formattedName}
                description={
                  <Link
                    href={`${PROJECT_URL}/user/${
                      usernameValue ?? user.getUsername()
                    }`}
                    isExternal
                    size="sm"
                  >
                    @{usernameValue || user.getUsername()}
                  </Link>
                }
                classNames={{
                  wrapper: "mt-2",
                  name: "text-base font-semibold",
                  description: "text-sm text-default-500",
                }}
              />

              <Button
                color="primary"
                startContent={<ImFilePicture size={16} />}
                onPress={handleProfilePictureClick}
              >
                Change Profile Picture
              </Button>

              <input
                ref={(element) => {
                  imageRef(element);
                  fileInputRef.current = element;
                }}
                className="hidden"
                id="profile-pic-input"
                type="file"
                accept=".jpeg,.jpg"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                  imageOnChange(e);
                  handleProfilePictureChange(e);
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="max-w-2xl w-full">
          <CardBody className="flex flex-col gap-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-2 gap-4">
                <NAME_INPUT
                  errors={errors}
                  nameValue={nameValue}
                  setNameValue={setNameValue}
                  register={register}
                />
                <SURNAME_INPUT
                  errors={errors}
                  surnameValue={surnameValue}
                  setSurnameValue={setSurnameValue}
                  register={register}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <USERNAME_INPUT
                  errors={errors}
                  usernameValue={usernameValue}
                  setUsernameValue={setUsernameValue}
                  register={register}
                />
                <EMAIL_INPUT
                  errors={errors}
                  setEmailValue={setEmailValue}
                  register={register}
                />
              </div>
              <BIOGRAPHY_INPUT
                errors={errors}
                biographyValue={biographyValue}
                setBiographyValue={setBiographyValue}
                register={register}
              />
              {/* <div className="flex justify-between gap-8">
                <Select
                  label="Gender"
                  placeholder="Select your gender"
                  variant="bordered"
                  className="max-w-xs"
                  description="This data will not be publicly shared."
                  selectedKeys={[genderValue ?? "unspecified"]}
                  onChange={(e) => setGenderValue(e.target.value)}
                >
                  <SelectItem value="m" key="male">
                    Male
                  </SelectItem>
                  <SelectItem value="f" key="female">
                    Female
                  </SelectItem>
                  <SelectItem value={undefined} key="unspecified">
                    I do not want to specify
                  </SelectItem>
                </Select>

                <Select
                  className="w-80"
                  label="Language"
                  placeholder="Select your language"
                  variant="bordered"
                  selectedKeys={[
                    langId in SystemLanguages
                      ? SystemLanguages[langId].toString()
                      : "1",
                  ]}
                  description="Sets the default language for the content available to you."
                  onChange={(e) => setLanguageValue(parseInt(e.target.value))}
                >
                  <SelectItem key="1" value={1}>
                    English
                  </SelectItem>
                </Select>
              </div> */}{" "}
              {/*TODO: Add language select */}
              <Button type="submit" color="primary" isLoading={isSubmitting}>
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </main>

      <Modal isOpen={showCropModal} onClose={() => setShowCropModal(false)}>
        <ModalHeader>Crop your image</ModalHeader>
        <ModalBody>
          <p>This image is too large or not square. Please crop it.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onPress={() => setShowCropModal(false)}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onPress={handleCrop}>
            Confirm Crop
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default UserSettingsEditUser;

const NAME_INPUT = ({
  errors,
  nameValue,
  setNameValue,
  register,
}: {
  errors: FieldErrors<IUserUpdateProfile>;
  nameValue: string | undefined;
  setNameValue: (val: string) => void;
  register: UseFormRegister<IUserUpdateProfile>;
}) => {
  return (
    <Input
      type="text"
      label="Name"
      variant="bordered"
      fullWidth
      value={nameValue ?? ""}
      onValueChange={setNameValue}
      isInvalid={!!errors.name}
      errorMessage={errors.name?.message}
      placeholder="Enter your name"
      {...register("name")}
    />
  );
};

const SURNAME_INPUT = ({
  errors,
  surnameValue,
  setSurnameValue,
  register,
}: {
  errors: FieldErrors<IUserUpdateProfile>;
  surnameValue: string | undefined;
  setSurnameValue: (val: string) => void;
  register: UseFormRegister<IUserUpdateProfile>;
}) => {
  return (
    <Input
      type="text"
      label="Surname"
      variant="bordered"
      fullWidth
      value={surnameValue ?? ""}
      onValueChange={setSurnameValue}
      isInvalid={!!errors.surname}
      errorMessage={errors.surname?.message}
      placeholder="Enter your surname"
      {...register("surname")}
    />
  );
};

const USERNAME_INPUT = ({
  errors,
  usernameValue,
  setUsernameValue,
  register,
}: {
  errors: FieldErrors<IUserUpdateProfile>;
  usernameValue: string | undefined;
  setUsernameValue: (val: string) => void;
  register: UseFormRegister<IUserUpdateProfile>;
}) => {
  return (
    <Input
      type="text"
      label={
        <div className="flex items-center gap-1">
          <FiUser size={20} className="text-neutral-500" />
          <span>Username</span>
        </div>
      }
      variant="bordered"
      fullWidth
      value={usernameValue ?? ""}
      onValueChange={setUsernameValue}
      isInvalid={!!errors.username}
      errorMessage={errors.username?.message}
      placeholder="Enter a unique username"
      description="You can change your username 3 times within a week."
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
  );
};

const EMAIL_INPUT = ({
  errors,
  setEmailValue,
  register,
}: {
  errors: FieldErrors<IUserUpdateProfile>;
  setEmailValue: (email: string) => void;
  register: UseFormRegister<IUserUpdateProfile>;
}) => {
  return (
    <Input
      type="email"
      label={
        <div className="flex items-center gap-1">
          <HiOutlineMail size={20} className="text-neutral-500" />
          <span>Email</span>
        </div>
      }
      variant="bordered"
      fullWidth
      isInvalid={!!errors.email}
      errorMessage={errors.email?.message}
      placeholder="Enter your email"
      description="A confirmation email may be sent to this address."
      onValueChange={setEmailValue}
      {...register("email", {
        maxLength: {
          value: 255,
          message: "Email cannot exceed 255 characters.",
        },
        pattern: {
          value: /^[a-z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/i,
          message:
            "Email must be a valid address with gmail, outlook, or yahoo.",
        },
      })}
    />
  );
};

const BIOGRAPHY_INPUT = ({
  errors,
  biographyValue,
  setBiographyValue,
  register,
}: {
  errors: FieldErrors<IUserUpdateProfile>;
  biographyValue: string | undefined;
  setBiographyValue: (bio: string) => void;
  register: UseFormRegister<IUserUpdateProfile>;
}) => {
  return (
    <Textarea
      label="Biography"
      placeholder="Tell a bit about yourself..."
      description="You can provide a short description about yourself (max 256 chars)."
      variant="bordered"
      isInvalid={!!errors.biography}
      errorMessage={errors.biography?.message}
      className="w-full"
      minRows={3}
      value={biographyValue ?? ""}
      onValueChange={setBiographyValue}
      {...register("biography", {
        maxLength: {
          value: 256,
          message: "Biography cannot exceed 256 characters.",
        },
      })}
    />
  );
};
