import React from "react";
import { useAppContext } from "../contexts/AppContext";

const UserProfile: React.FC = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && (
        <div className="flex flex-col">
          <h1>{user.name} Profile Details</h1>
        </div>
      )}
    </>
  );
};

export default UserProfile;
