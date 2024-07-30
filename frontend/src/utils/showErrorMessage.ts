import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const showErrorMessage = (error: Error) => {
  let message = error.message;
  if (error instanceof AxiosError) {
    const response = error.response;
    if (response) {
      message = response.data.message;
    }
  }

  toast.error(message);
};
