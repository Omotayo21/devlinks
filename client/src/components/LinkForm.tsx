import React, { useState, useEffect } from "react";
import { useLinkContext } from "../context/LinkContext";
import { toast } from "react-hot-toast";
import { HiOutlineLink } from "react-icons/hi";
import Cookies from "js-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useUser } from "../context/userContext";
import BaseUrl from "../config";
import Loader from '../components/Loader'
const platforms = [
  {
    name: "GitHub",
    baseUrl: "https://github.com/",
    logo: "/github.svg",
    color: "bg-black",
  },
  {
    name: "LinkedIn",
    baseUrl: "https://linkedin.com/in/",
    logo: "/icon-linkedin.svg",
    color: "bg-blue-700",
  },

  {
    name: "Youtube",
    baseUrl: " https://www.youtube.com/",
    logo: "/youtube.svg",
    color: "bg-orange-400",
  },

  {
    name: "Twitter",
    baseUrl: "https://twitter.com/",
    logo: "/twitter.svg",
    color: "bg-sky-500",
  },

  {
    name: "Facebook",
    baseUrl: "https://facebook.com/",
    logo: "/facebook.svg",
    color: "bg-blue-600",
  },
  {
    name: "Instagram",
    baseUrl: "https://instagram.com/",
    logo: "/instagram.svg",
    color: "bg-pink-600",
  },
  {
    name: "Hashnode",
    baseUrl: "https://hashnode.com/@/",
    logo: "/hashnode.svg",
    color: "bg-blue-600",
  },
  {
    name: "Email",
    baseUrl: "mailto:",
    logo: "/email.svg",
    color: "bg-red-500",
  },
  {
    name: "Dev.to",
    baseUrl: "https://www.dev.to/",
    logo: "/devto.svg",
    color: "bg-black",
  },
  {
    name: "Frontend Mentor",
    baseUrl: " https://www.frontendmentor.io/profile/",
    logo: "/frontendmentor.svg",
    color: "bg-white",
  },

  {
    name: "Gitlab",
    baseUrl: " https://www.gitlab.com/",
    logo: "/gitlab.svg",
    color: "bg-orange-400",
  },
  {
    name: "Stack overflow",
    baseUrl: "https://www.stackoverflow.com/users/",
    logo: "/stack-overflow.svg",
    color: "bg-orange-500",
  },
  {
    name: "Twitch",
    baseUrl: "https://twitch.tv/",
    logo: "/twitch.svg",
    color: "bg-purple-500",
  },
];
interface Link {
  _id: string;
  platform: string;
  baseUrl: string;
  username: string;
  showDropdown: boolean;
  logo: string;
  color: string;
}

interface Platform {
  name: string;
  baseUrl: string;
  logo: string;
  color: string;
}
const LinkForm = () => {
  
   const { user, token, refreshUserData } = useUser();
  

  const [links, setLinks] = useState<Link[]>([]);
      const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  const fetchExistingLinks = async () => {
    if (!user?._id) {
      setLinks([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Type guard for user.links
      const userLinks = user.links || [];

      const formattedLinks =
        userLinks.length > 0
          ? userLinks.map((link: any) => ({
              _id: link._id || "",
              platform: link.name || "",
              baseUrl: link.baseUrl || "",
              username: link.username || "",
              logo: link.logo || "",
              color: link.color || "",
              showDropdown: false,
            }))
          : [];

      setLinks(formattedLinks);
    } catch (error) {
      console.error("Failed to fetch links:", error);
      toast.error("Failed to load your existing links");
    } finally {
      setIsLoading(false);
    }
  };

  fetchExistingLinks();
}, [user?._id]);
 const handleAddLink = () => {
     if (!user || !token) return;
   if (links.length >= 5) return;
   setLinks([
     ...links,
     {
      _id:"",
       platform: "",
       baseUrl: "",
       username: "",
       showDropdown: false,
       logo: "",
       color: "",
     },
   ]);
 };

const handleRemoveLink = async (index) => {
  try {
    const linkToDelete = links[index];

    // Only call API if it's an existing link (has _id)
  if(user){  if (linkToDelete._id) {
      await axios.delete(`${BaseUrl}/api/links/delete`, {
        data: {
          userId: user._id,
          linkId: linkToDelete._id,
        },
      });
    }
  }

    // Remove from local state
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);

    await refreshUserData();
    toast.success("Link removed successfully");
  } catch (error) {
    console.error("Failed to delete link:", error);
    toast.error("Failed to remove link");
  }
};
 const handlePlatformSelect = (index: number, platform: Platform) => {
   setLinks((prevLinks) => {
     const updated = [...prevLinks];
     updated[index] = {
       ...updated[index],
       platform: platform.name,
       baseUrl: platform.baseUrl,
       color: platform.color,
       logo: platform.logo,
       showDropdown: !updated[index].showDropdown,
     };
     return updated;
   });
 };

 const handleUsernameChange = (index: number, value: string) => {
   setLinks((prevLinks) => {
     const updated = [...prevLinks];
     updated[index] = {
       ...updated[index],
       username: value,
     };
     return updated;
   });
 };

 const toggleDropdown = (index: number) => {
   setLinks((prevLinks) => {
     const updated = [...prevLinks];
     updated[index] = {
       ...updated[index],
       showDropdown: !updated[index].showDropdown,
     };
     return updated;
   });
 };

 

const handleSave = async () => {
  setIsLoading(true);
  if (!user) {
    toast.error("User not authenticated");
    return;
  }

  const filledLinks = links.filter((l) => l.platform && l.username);

  if (filledLinks.length === 0) {
    toast.error("Please add at least one valid link");
    return;
  }

  try {
    // Prepare the links data for the backend
    const linksToSave = filledLinks.map((link) => {
      // For new links (no _id), we don't include _id in the payload
      const baseLink = {
        name: link.platform,
        baseUrl: link.baseUrl,
        username: link.username,
        logo: link.logo,
        color: link.color,
      };

      // Only include _id if it exists (for existing links)
      return link._id ? { ...baseLink, _id: link._id } : baseLink;
    });

    // Use PUT for bulk update
    const response = await axios.put(`${BaseUrl}/api/links`, {
      userId: user._id,
      links: linksToSave,
    });

    await refreshUserData();
    setIsLoading(false);
    toast.success("Links saved successfully!");
  } catch (error) {
    console.error("Failed to save links:", error);
    toast.error("Failed to save links");
  }
};

  return (
<div className=" overflow-hidden ">

      <div className="bg-white overflow-x-hidden w-full sm:max-w-[21rem] lg:max-w-[41.5rem] md:max-w-[43rem] mx-auto p-4 lg:p-6 flex flex-col px-4 gap-4">
       {isLoading && <Loader />}
        <h2 className="font-bold text-xl">Customise your links</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>

        <button
          onClick={handleAddLink}
          disabled={links.length >= 5}
          className={`w-full text-center border-2 flex justify-center items-center gap-2 rounded-lg py-2 text-sm sm:text-base font-semibold ${
            links.length >= 5
              ? "bg-gray-300 text-gray-500 border-gray-300"
              : "border-[#633cff] text-[#633cff] hover:bg-[#633cff] hover:text-white"
          }`}
        >
          + Add link
        </button>

        <div className="flex flex-col gap-4 w-full">
          {links.map((link, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm sm:text-base">
                  Link {index + 1}
                </p>
                <button
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 hover:underline text-xs sm:text-sm"
                >
                  Remove
                </button>
              </div>

              {/* Platform Selection */}
              <div className="relative">
                <label className="block text-xs sm:text-sm text-gray-700 mb-1">
                  Platform
                </label>
                <div
                  onClick={() => toggleDropdown(index)}
                  className="bg-gray-50 border cursor-pointer rounded-lg p-2 sm:p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {link.logo && (
                      <img
                        src={link.logo}
                        alt={link.platform}
                        className="w-4 h-4 sm:w-5 sm:h-5 min-w-[1rem]"
                      />
                    )}
                    <p className="capitalize text-xs sm:text-sm truncate">
                      {link.platform || "Select platform"}
                    </p>
                  </div>
                  <span className="ml-2 text-xs">▼</span>
                </div>

                {link.showDropdown && (
                  <div className="relative z-10 bg-white border rounded-lg mt-1 w-full shadow sm:p-8 max-h-[12rem] lg:p-1 overflow-y-auto">
                    {platforms.map((plat) => (
                      <div
                        key={plat.name}
                        onClick={() => handlePlatformSelect(index, plat)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <img
                          src={plat.logo}
                          alt={plat.name}
                          className="w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm truncate">
                          {plat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-1">
                  Link
                </label>
                <div className="flex items-center bg-gray-50 border rounded-lg overflow-hidden">
                  <HiOutlineLink
                    size={14}
                    className="text-gray-500 ml-2 min-w-[1rem]"
                  />
                  <span className="px-1 text-gray-500 text-xs sm:text-sm truncate">
                    {link.baseUrl}
                  </span>
                  <input
                    className="flex-1 p-2 sm:p-3 outline-none text-xs -ml-3  sm:text-sm min-w-0"
                    placeholder="your-username"
                    value={link.username}
                    onChange={(e) =>
                      handleUsernameChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`w-full sm:w-36 mx-auto rounded-lg bg-[#633cff] px-4 py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#5433d1] ${
            isLoading ? "opacity-70" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default LinkForm;
