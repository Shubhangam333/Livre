import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { EditAvatarFormData } from "../../types";
import { toast } from "react-toastify";
import { queryClient } from "../../main";
import { showErrorMessage } from "../../utils/showErrorMessage";
import { FormEvent, FormEventHandler, useState } from "react";
import { useProfile } from "../../hooks/useProfile";

const UserAvatar: React.FC = () => {
  const { data: user } = useProfile();
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: (data: EditAvatarFormData) => apiClient.updateAvatar(data),
    onSuccess: async (d) => {
      toast.success(d.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!file) return toast.error("Please select a file to upload");
    const formData: EditAvatarFormData = {
      avatar: file,
    };

    mutation.mutate(formData);
  };

  // Example usage in a React component
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <>
      <div className="avatar self-center">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
          {user?.avatar ? (
            <img src={user.avatar.url} />
          ) : (
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          )}
        </div>
      </div>
      <form
        className="w-full sm:px-24 py-12 px-4 flex justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary">
          Update Avatar
        </button>
      </form>
    </>
  );
};

export default UserAvatar;
