import { updateUserData } from '@/redux/slices/userSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from '@/Components/TopBar';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';


const ProfileComponent=() => {

  const dispatch = useDispatch();
  // @ts-expect-error ake
  const { userData } = useSelector(state => state.user);
  const { username, email, profileImage,joinedAt } = userData;
  const formattedDate = new Date(joinedAt).toDateString();
  
  const joinedAtDate=formattedDate;
  const [displayName, setDisplayName] = useState<string>(username || '');
  const [profilePicture, setProfilePicture] = useState<string>(profileImage || '');
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  

  // Display Name Handler 
  const updateDisplayNameHandler = async () => {
    if (username == displayName)
      toast.error("new Display Name is same as old");

    else {
      try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}api/v1/user/update-profile`, { displayName, currentPassword, newPassword }, {
          withCredentials: true,
        });

        if (response.status == 200) {
          toast.success(response.data.message);
          dispatch(updateUserData(response.data.userData));
          setDisplayName(response.data.userData.username);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Now TypeScript knows 'error' is an AxiosError
          toast.error(error.response?.data?.message || "An API error occurred.");
          console.log("Axios error during profile update request:", error.response?.data);
        }
      }
    }
  }

  // Password Updater
  const updatePasswordHandler = async () => {
    if (confirmPassword != newPassword)
      toast.error("confirm password not match with current password");

    else if (!currentPassword) {
      toast.error("current password is missing");
    }

    else {
      try {
        console.log("in the updateUsernamePAsswrod");
        console.log("sending data", { displayName, newPassword, currentPassword })
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}api/v1/user/update-profile`, { currentPassword, newPassword }, {
          withCredentials: true,
        });

        if (response.status == 200)
          toast.success(response.data.message);


      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Now TypeScript knows 'error' is an AxiosError
          toast.error(error.response?.data?.message || "An API error occurred.");
          console.log("Axios error during profile update request:", error.response?.data);
        }

      }
    }
  }

  // Delete Account
  const deleteAccountHandler = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}api/v1/user/delete-profile`, {
        withCredentials: true,
      });

      if (response.status == 200)
        toast.success(response.data.message);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows 'error' is an AxiosError
        toast.error(error.response?.data?.message || "An API error occurred.");
        console.log("Axios error during delete account request:", error.response?.data);
      }
    }
  }

  // Image Updater 
  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64data = reader.result;

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/v1/user/profileImage-uploader`, { image: base64data }, {
          withCredentials: true,
        });
        console.log(response);
        if (response.status == 200) {
          toast.success(response.data.message);
          dispatch(updateUserData(response.data.userData));
          setProfilePicture(response.data.userData.profileImage);
        }
      } catch (error) {
        if (AxiosError)
          console.log("error occur in imageUploadHandler", error);
      }
    }
  }

  return (
    <>
      <TopBar />
      <div className='bg-[#F4F6FA] flex justify-center items-center flex-col  pt-10'>

        <h2 className="text-4xl font-bold mb-6 border-b-3 pb-3 border-gray-200 w-[50%] ">Profile</h2>
        <div className="max-w-3xl mx-auto px-6 py-10 text-gray-800  rounded-lg  bg-white  ">

          {/* Display Name */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Preferences</h3>
            <label className="block mb-1 text-sm font-medium">Display Name</label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 w-full"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button
              onClick={() => updateDisplayNameHandler()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer" >
              Update display name
            </button>
          </div>

          {/* Profile Picture */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Profile Picture</h3>
            <div className="flex items-center gap-4">
              {profilePicture && (
                <img src={profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              )}
              <input type="file" accept="image/*" onChange={imageUploadHandler} />
            </div>
          </div>

          {/* Email & Joined Date */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Account Info</h3>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="border rounded-md px-4 py-2 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Joined Date</label>
              <input
                type="text"
                value={joinedAtDate}
                readOnly
                className="border rounded-md px-4 py-2 w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-6 pb-6 border-b-2 border-gray-200 ">
            <h3 className="text-xl font-semibold mb-2">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                autoComplete="new-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
              />
              <button onClick={() => updatePasswordHandler()} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                Change password
              </button>
            </div>
          </div>
          {/* Delete Button */}
          <button onClick={() => deleteAccountHandler()} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
