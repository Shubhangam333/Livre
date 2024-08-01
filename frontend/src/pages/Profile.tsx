import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import { Link, useLocation } from "react-router-dom";

const Profile: React.FC = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {tab == "user" && <UserProfile />}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content text-lg min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <li>
            <Link to="/profile?tab=user">Profile</Link>
          </li>
          <li>
            <Link to="/profile?tab=orders">Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
