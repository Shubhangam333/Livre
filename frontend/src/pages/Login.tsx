import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { toast } from "react-toastify";
import { signInSchema, yupValidate } from "../utils/validator";
import { LoginFormData } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { showErrorMessage } from "../utils/showErrorMessage";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { setHeaderToken } from "../utils/client";
import { queryClient } from "../main";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const { setTokens } = useAppContext();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => apiClient.login(data),
    onSuccess: async (d) => {
      toast.success("Login Successfull");
      localStorage.setItem("tokens", JSON.stringify(d));
      setHeaderToken(d.accessToken);
      setTokens(d);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/");
    },
    onError: (error: any) => {
      showErrorMessage(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { values, error } = await yupValidate(signInSchema, formData);

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
    <div className="bg-base-200 min-h-screen flex justify-center p-24 ">
      <form className="w-72 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center">Login</h1>
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
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
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
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
