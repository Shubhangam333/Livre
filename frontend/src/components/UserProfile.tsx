import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { useAppContext } from "../contexts/AppContext";
import { EditProfileFormData } from "../types";
import { toast } from "react-toastify";
import { EditProfileSchema, yupValidate } from "../utils/validator";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { showErrorMessage } from "../utils/showErrorMessage";
import { queryClient } from "../main";

const UserProfile: React.FC = () => {
  const { user } = useAppContext();

  const [formData, setFormData] = useState<EditProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (data: EditProfileFormData) => apiClient.updateProfile(data),
    onSuccess: async (d) => {
      toast.success(d.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { values, error } = await yupValidate(EditProfileSchema, formData);

    if (values?.name == user?.name && values?.email == user?.email) {
      return toast.error("No change in fields");
    }

    if (error) return toast.error(error);

    if (values) {
      mutation.mutate(values);
    }
  };

  return (
    <>
      {user && (
        <form
          className="w-full sm:px-24 py-12 px-4 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl text-center">
            {user.name.toUpperCase()} Profile
          </h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" disabled={mutation.isPending}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default UserProfile;
