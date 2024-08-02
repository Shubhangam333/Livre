// types.ts

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface EditProfileFormData {
  email: string;
  name: string;
}

export interface EditAvatarFormData {
  avatar: File;
}

export const Role: {
  USER: "USER";
  ADMIN: "ADMIN";
} = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export type Role = (typeof Role)[keyof typeof Role];
export type Avatar = {
  id: number;
  public_id: string;
  url: string;
  userId: number; // This will be a relation to User
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: Avatar | null; // This is an optional property
  createdAt: Date;
  updatedAt: Date;
};
// export type User = {
//   profile: Profile;
//   tokens: Tokens;
// };

export type ApiResponseType = {
  success: boolean;
  message: string;
};
