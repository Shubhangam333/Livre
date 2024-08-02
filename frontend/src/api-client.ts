import {
  ApiResponseType,
  LoginFormData,
  User,
  RegisterFormData,
  Tokens,
  EditProfileFormData,
  EditAvatarFormData,
} from "./types";
import { client } from "./utils/client";

export const register = async (
  formData: RegisterFormData
): Promise<ApiResponseType> => {
  const response = await client.post<ApiResponseType>(
    "/auth/sign-up",
    formData
  );

  return response.data;
};

export const login = async (formData: LoginFormData): Promise<Tokens> => {
  const response = await client.post<Tokens>("/auth/sign-in", formData);

  return response.data;
};

export const profile = async (): Promise<User> => {
  const response = await client.get<User>("/user/profile");

  return response.data;
};
export const updateProfile = async (
  formData: EditProfileFormData
): Promise<ApiResponseType> => {
  const response = await client.put<ApiResponseType>(
    "/user/update-profile",
    formData
  );

  return response.data;
};
export const updateAvatar = async (
  formData: EditAvatarFormData
): Promise<ApiResponseType> => {
  const response = await client.put<ApiResponseType>(
    "/user/update-avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
