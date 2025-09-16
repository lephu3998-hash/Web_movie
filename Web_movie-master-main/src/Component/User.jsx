import { useState, useEffect } from "react";

const User = () => {
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    // Fetch the avatar from localStorage or fetch it if not available
    let storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setUserAvatar(storedAvatar);
    } else {
      const fetchAvatar = async () => {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        storedAvatar = data.results[0].picture.thumbnail;
        localStorage.setItem("userAvatar", storedAvatar);
        setUserAvatar(storedAvatar);
      };
      fetchAvatar();
    }
  }, []);

  return (
    <div className="profile">
      <h1 className="text-2xl">Thông Tin Cá Nhân</h1>
      <div className="flex items-center gap-4">
        <img src={userAvatar} alt="User Avatar" className="w-16 h-16 rounded-full" />
        <div>
          <p>Username: {localStorage.getItem("userName")}</p>
          {/* Other user details */}
        </div>
      </div>
    </div>
  );
};

export default User;
