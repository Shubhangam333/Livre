import {
  ApiResponseType,
  LoginFormData,
  User,
  RegisterFormData,
  Tokens,
  EditProfileFormData,
  EditAvatarFormData,
  UpdateProductInput,
  ProductInput,
  Product,
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

export const createProduct = async (
  formData: ProductInput
): Promise<ApiResponseType> => {
  const formDataWithImages = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((image) => formDataWithImages.append(key, image));
    } else {
      formDataWithImages.append(key, value as string | Blob);
    }
  });

  const response = await client.post<ApiResponseType>(
    "/product/create-product",
    formDataWithImages,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Product
export const updateProductById = async (
  id: string,
  formData: UpdateProductInput
): Promise<ApiResponseType> => {
  const formDataWithImages = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((image) => formDataWithImages.append(key, image));
    } else {
      formDataWithImages.append(key, value as string | Blob);
    }
  });

  const response = await client.put<ApiResponseType>(
    `/products/${id}`,
    formDataWithImages,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await client.get<Product>(`/products/${id}`);
  return response.data;
};
