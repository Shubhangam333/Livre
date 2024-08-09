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
  GenreInput,
  PaginatedProductsResponse,
  Genre,
  CreateReviewRequest,
  Review,
  VerifyPaymentRequest,
  OrderInput,
  Order,
  Address,
  AddressInput,
  GetAddressesResponse,
  GetUserOrdersResponse,
  GetAllUsersResponse,
  GetAllUser,
  GetUserDetailsById,
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
export const getProductById = async (id: number): Promise<Product> => {
  const response = await client.get<{ product: Product }>(`/product/${id}`);
  return response.data.product;
};

export const getProducts = async (
  page: number,
  pageSize: number,
  genre?: string,
  priceRange?: [number, number],
  search?: string
): Promise<PaginatedProductsResponse> => {
  const response = await client.get<PaginatedProductsResponse>(
    "/product/getPaginatedProduct/all",
    {
      params: {
        page,
        pageSize,
        genre,
        minPrice: priceRange?.[0],
        maxPrice: priceRange?.[1],
        search,
      },
    }
  );
  return response.data;
};

export const createGenre = async (
  data: GenreInput
): Promise<ApiResponseType> => {
  const response = await client.post<ApiResponseType>("/genre/create", data);
  return response.data;
};

export const getGenreById = async (id: string): Promise<Genre> => {
  const response = await client.get<Genre>(`/genre/${id}`);
  return response.data;
};

export const updateGenreById = async (id: string, data: GenreInput) => {
  const response = await client.put(`/genre/${id}`, data);
  return response.data;
};

export const getAllGenres = async () => {
  const response = await client.get("/genre/get/all-genre");
  return response.data;
};

export const createReview = async (
  review: CreateReviewRequest
): Promise<Review> => {
  const response = await client.post<Review>("/review/new/create", review);
  return response.data;
};

export const verifyPayment = async (
  data: VerifyPaymentRequest
): Promise<ApiResponseType> => {
  const response = await client.post("/payment/verify-payment", data);
  return response.data;
};

export const createOrder = async (order: OrderInput): Promise<Order> => {
  const response = await client.post<Order>("/order/new/create", order);
  return response.data;
};

export const createAddress = async (
  address: AddressInput
): Promise<Address> => {
  const response = await client.post<Address>("/address/new/create", address);
  return response.data;
};

export const updateAddress = async (
  id: number,
  address: Partial<AddressInput>
): Promise<Address> => {
  const response = await client.put<Address>(`/address/${id}`, address);
  return response.data;
};

export const deleteAddress = async (
  id: number
): Promise<{ success: boolean; message: string }> => {
  const response = await client.delete<{ success: boolean; message: string }>(
    `/address/${id}`
  );
  return response.data;
};

export const getAddresses = async (): Promise<Address[]> => {
  const response = await client.get<GetAddressesResponse>("/address/addresses");
  return response.data.addresses;
};

export const getUserOrders = async (
  userId: number,
  page: number = 1,
  limit: number = 5
): Promise<GetUserOrdersResponse> => {
  const response = await client.get<GetUserOrdersResponse>(
    `/order/user/${userId}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getOrderById = async (orderId: number) => {
  const response = await client.get(`/order/${orderId}`);
  return response.data.order;
};
export const getAllOrders = async (
  page: number = 1,
  limit: number = 5
): Promise<GetUserOrdersResponse> => {
  const response = await client.get<GetUserOrdersResponse>(
    `/order/all/all-orders?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getAllUsers = async (
  page: number = 1,
  limit: number = 5
): Promise<GetAllUsersResponse> => {
  const response = await client.get<GetAllUsersResponse>(
    `/user/all/all-users?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getUserById = async (userId: number): Promise<GetAllUser> => {
  const response = await client.get<GetUserDetailsById>(`/user/get/${userId}`);
  return response.data.user;
};
