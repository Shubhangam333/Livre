import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as apiClient from "../../api-client";
import { yupValidate } from "../../utils/validator";
import { showErrorMessage } from "../../utils/showErrorMessage";
import { ProductInput, Genre } from "../../types";
import { newProductSchema } from "../../utils/validator";
import Loading from "../../ui/Loader";

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    description: "",
    price: 0,
    publisher: "",
    author: "",
    stock: 0,
    genreId: 0,
    images: [],
  });

  const navigate = useNavigate();

  const { data: genres, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAllGenres,
  });

  const mutation = useMutation({
    mutationFn: (data: ProductInput) => apiClient.createProduct(data),
    onSuccess: (d) => {
      toast.success(d.message);
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { values, error } = await yupValidate(newProductSchema, formData);

    if (error) return toast.error(error);

    if (values) {
      mutation.mutate(values);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    return <Loading />;
  }

  return (
    <div className="bg-base-200 min-h-screen flex p-24 justify-center">
      <form className="w-72 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center">Create Product</h1>
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
          <select
            className="grow"
            id="genreId"
            name="genreId"
            value={formData.genreId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Genre
            </option>
            {genres.genres.map((genre: Genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
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
        {mutation.isPending && <Loading />}
      </form>
    </div>
  );
};

export default CreateProduct;
