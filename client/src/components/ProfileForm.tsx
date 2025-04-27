import React, {useState, useEffect} from 'react'
import {IoImageOutline} from "react-icons/io5"
import Cookies from "js-cookie";
import axios, {AxiosResponse} from "axios";
import {toast} from 'react-hot-toast'
import {useUser} from "../context/userContext";
import BaseUrl from '../config'


const ProfileForm = () => {
  interface UserData {
    _id: string;
   
    email: string;
    
  }
  const  {user, refreshUserData} = useUser();
useEffect(() => {
  if (user) {
    setFirstName(user.firstName || ""); // fallback if null
    setLastName(user.lastName || "");
    setProfilePhoto(user.profilePicture || "");
  }
}, [user]);

 
       const [firstName, setFirstName] = useState<string>("No name yet");
  const [lastName, setLastName] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");

    
        const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          // Validate image size (e.g., max 2MB)
          if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size should be less than 2MB");
            return;
          }
if(file){
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePhoto(reader.result as string);
          };
          reader.readAsDataURL(file);
        };
      }
   
      const handleSave  = async () => {
          let hasError = false;
          setFirstNameError("");
          setLastNameError("");

          if (!firstName.trim()) {
            setFirstNameError("Please enter a first name");
            hasError = true;
          }

          if (!lastName.trim()) {
            setLastNameError("Please enter a last name");
            hasError = true;
          }

          if (hasError) return;
        setIsLoading(true);
        if(user) {
          const response: AxiosResponse<any> = await axios.post(
            `${BaseUrl}/api/profile`,
            {
              userId : user._id,
              firstName,
              lastName,
              profilePhoto
            }
          );
          console.log(response.data);


          setIsLoading(false);
            await refreshUserData(); 
            
          toast.success("Profile updated!");
        } else {
          console.error("Error saving links:");
        }
      };

  return (
    <div className="overflow-hidden">
      {" "}
      {/* Add overflow-hidden to prevent any scrolling */}
      <div className="bg-white w-full max-w-[41.5rem] lg:p-8 p-4 flex flex-col gap-y-2 mx-auto px-4">
        {" "}
        {/* Added px-4 for mobile padding */}
        <h2 className="font-bold text-xl">Profile Details</h2>
        <p className="text-gray-500">
          Add your details to create a personal touch to your profile.
        </p>
        <form className="w-full">
          {" "}
          {/* Ensure form takes full width but doesn't exceed */}
          {/* Profile Picture Section - Simplified structure */}
          <div className="flex sm:flex-col lg:flex-row gap-4 p-4 sm:p-6">
            {" "}
            {/* Reduced padding on mobile */}
            <span className="text-sm text-center lg: mt-12 sm:text-base text-[#737373]">
              Profile picture
            </span>
            <div className="flex lg:flex-row sm:flex-col items-center gap-4 w-full">
              <input
                type="file"
                name="image"
                id="profilePhoto"
                className="hidden"
                onChange={handlePhotoChange}
                accept="image/jpg, image/png, image/jpeg"
              />
              <label
                htmlFor="profilePhoto"
                className={`flex w-full max-w-[16.2rem] cursor-pointer flex-col items-center gap-2 rounded-xl bg-[#efebff] bg-cover bg-center p-4 sm:p-8`}
                style={{
                  backgroundImage:
                    profilePhoto || user?.profilePicture
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${
                          profilePhoto || user?.profilePicture
                        })`
                      : "",
                }}
              >
                <IoImageOutline
                  size={"3rem"}
                  className="sm:size-[4rem]"
                  color="#633cff"
                />
                <span className="text-sm sm:text-[1.2rem] font-semibold text-[#633cff]">
                  + Upload Image
                </span>
              </label>

              <p className="text-xs sm:text-sm text-[#737373] text-center max-w-[16.5rem]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
          {/* Form Fields Section - Simplified responsive layout */}
          <div className="space-y-4 p-4 sm:p-8">
            {/* First Name */}
            <div className="flex sm:flex-col md:flex-row lg:flex-row sm:items-center gap-2 sm:gap-[0.6rem]">
              <label
                htmlFor="firstName"
                className="w-full sm:w-[10rem] text-sm sm:text-base text-[#737373]"
              >
                First name*
              </label>
              <div className="relative flex-1">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="e.g. John"
                  id="firstName"
                  value={firstName}
                  className={`w-full rounded-lg border border-solid bg-white px-4 py-2 text-sm sm:text-base outline-none focus:shadow-purple-sh`}
                />
                {firstNameError && (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#ff3939]">
                    {firstNameError}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="flex sm:flex-col md:flex-row lg:flex-row sm:items-center gap-2 sm:gap-[0.6rem]">
              <label
                htmlFor="lastName"
                className="w-full sm:w-[10rem] text-sm sm:text-base text-[#737373]"
              >
                Last name*
              </label>
              <div className="relative flex-1">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="e.g. Appleseed"
                  id="lastName"
                  value={lastName}
                  className={`w-full rounded-lg border border-solid bg-white px-4 py-2 text-sm sm:text-base outline-none focus:shadow-purple-sh`}
                />
                {lastNameError && (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#ff3939]">
                    {lastNameError}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex sm:flex-col md:flex-row lg:flex-row sm:items-center gap-2 sm:gap-[0.6rem]">
              <label
                htmlFor="email"
                className="w-full sm:w-[10rem] text-sm sm:text-base text-[#737373]"
              >
                Email
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  id="email"
                  className={`w-full rounded-lg border border-solid border-[#d9d9d9] bg-white px-4 py-2 text-sm sm:text-base text-[#333] outline-none disabled:bg-[#eee]`}
                  disabled
                  value={user?.email || ""}
                />
              </div>
            </div>
          </div>
          {/* Save Button - Centered properly */}
          <div className="flex justify-center sm:justify-end p-4 sm:px-6 w-full">
            <button
              onClick={handleSave}
              type="button"
              disabled={isLoading}
              className={`w-full sm:w-36 rounded-lg bg-[#633cff] px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#5433d1] transition-colors ${
                isLoading ? "opacity-70" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm