import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as apiClient from "../../api-client";
import { yupValidate } from "../../utils/validator";
import { showErrorMessage } from "../../utils/showErrorMessage";
import { GenreInput } from "../../types";
import { genreSchema } from "../../utils/validator";

const CreateGenre: React.FC = () => {
  const [formData, setFormData] = useState<GenreInput>({
    name: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: GenreInput) => apiClient.createGenre(data),
    onSuccess: (d) => {
      console.log(d);
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

    const { values, error } = await yupValidate(genreSchema, formData);

    if (error) return toast.error(error);

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

  return (
    <div className="bg-base-200 min-h-screen flex p-24 justify-center">
      <form className="w-72 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center">Create Genre</h1>
        <label className="input input-bordered flex items-center gap-2">
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateGenre;
