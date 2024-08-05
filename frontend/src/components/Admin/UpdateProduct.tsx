import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as apiClient from "../../api-client";
import { yupValidate } from "../../utils/validator";
import { showErrorMessage } from "../../utils/showErrorMessage";
import { ProductInput, Product } from "../../types";
import { updateProductSchema } from "../../utils/validator";

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    description: "",
    price: 0,
    publisher: "",
    author: "",
    stock: 0,
    genreId: 0,
    images: [], // Assuming images is an array of file objects
  });

  const navigate = useNavigate();

  const { data: existingProduct, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => apiClient.getProductById(id!),
    enabled: !!id,
    onSuccess: (data: Product) => {
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        publisher: data.publisher,
        author: data.author,
        stock: data.stock,
        genreId: data.genreId,
        images: [], // or process existingProduct.images if necessary
      });
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ProductInput) => apiClient.updateProductById(id!, data),
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/products");
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { values, error } = await yupValidate(updateProductSchema, formData);

    if (error) {
      toast.error(error);
      return;
    }

    if (values) {
      mutation.mutate(values);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: Array.from(event.target.files),
      }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!existingProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-base-200 min-h-screen flex p-24 justify-center ">
      <form className="w-72 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center">Update Product</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder="Price"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Publisher"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Author"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder="Stock"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder="Genre ID"
            id="genreId"
            name="genreId"
            value={formData.genreId}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="file"
            className="grow"
            placeholder="Images"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
