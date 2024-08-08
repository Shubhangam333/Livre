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

export interface CreateReviewRequest {
  comment: string;
  productId: number;
  rating: number;
  userId: number;
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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  publisher: string;
  author: string;
  stock: number;
  genreId: number;
  images: File[];
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  publisher?: string;
  author?: string;
  stock?: number;
  genreId?: number;
  images?: File[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  publisher: string;
  author: string;
  stock: number;
  genreId: number;
  images: {
    public_id: string;
    secure_url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
export interface GenreInput {
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  comment: string;
  userId: number;
  productId: number;
  rating?: number;
  user: {
    id: number;
    name: string;
    avatar: Avatar;
  };
}

export interface PaginatedProductsResponse {
  success: boolean;
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  publisher: string;
  author: string;
  stock: number;
  genreId: number;
  images: { secure_url: string; public_id: string }[];
  genre: { id: number; name: string };
  reviews: Review[];
}

// Type for the response of fetching a product
export interface FetchProductResponse {
  product: Product;
}

export interface CreateReviewResponse {
  review: Review;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface VerifyPaymentRequest {
  orderID: string;
}

export type OrderInput = {
  userId: number;
  totalAmount: number;
  paymentStatus: "pending" | "succeeded" | "cancelled" | "refund";
  paymentType: "cod" | "card";
  couponCode?: string;
  couponValue?: number;
  addressId?: number;
  items: {
    productId: string;
    payablePrice: number;
    purchasedQty: number;
  }[];
  orderStatus: {
    type: "ordered" | "packed" | "shipped" | "delivered";
    date?: Date;
    isCompleted?: boolean;
  }[];
};

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  paymentStatus: string;
  paymentType: string;
  couponCode?: string;
  couponValue?: number;
  addressId: number;
  items: Array<{ productId: number; quantity: number }>;
  orderStatus: { status: string; updatedAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AddressInput {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface GetAddressesResponse {
  success: boolean;
  addresses: Address[];
}

// resposne for user orders

export interface GetUserOrdersResponse {
  success: boolean;
  orders: {
    id: string;
    totalamount: number;
    paymentStatus: string;
    createdAt: Date;
  };
  currentPage: number;
  totalPages: number;
}
