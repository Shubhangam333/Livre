import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => apiClient.getUserById(Number(userId)),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user details: {(error as Error).message}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <div>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Avatar:</strong>{" "}
          {user.avatar ? (
            <img
              src={user.avatar.url}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            "No Avatar"
          )}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
