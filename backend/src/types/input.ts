export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type SignInInput = {
  name: string;
  email: string;
  password: string;
};

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  publisher: string;
  author: string;
  stock: number;
  genreId: number;
};

export type OrderInput = {
  userId: number;
  totalAmount: number;
  paymentStatus: "pending" | "succeeded" | "cancelled" | "refund";
  paymentType: "cod" | "card";
  couponCode?: string;
  couponValue?: number;
  addressId?: number;
  items: {
    productId: number;
    payablePrice: number;
    purchasedQty: number;
  }[];
  orderStatus: {
    type: "ordered" | "packed" | "shipped" | "delivered";
    date?: Date;
    isCompleted?: boolean;
  }[];
};

export type ReviewInput = {
  comment: string;
  userId: number;
  productId: number;
  rating: number;
};

export type GenreInput = {
  name: string;
};
