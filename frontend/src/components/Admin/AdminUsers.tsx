import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: () => apiClient.getAllUsers(page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {(error as Error).message}</div>;
  }

  const { users, currentPage, totalPages } = data!;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const viewUserDetails = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">User ID</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Role</th>
                <th className="px-6 py-3 border-b">Avatar</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 border-b">{user.id}</td>
                  <td className="px-6 py-4 border-b">{user.name}</td>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">{user.role}</td>
                  <td className="px-6 py-4 border-b">
                    {user.avatar ? (
                      <img
                        src={user.avatar.url}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      "No Avatar"
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => viewUserDetails(user.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex my-4 justify-center gap-4 items-center">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
