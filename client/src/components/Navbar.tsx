import React, {useState, useEffect} from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { HiOutlineLink } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Navbar = () => {
  interface UserData {
    _id: string;
   
  }
const navigate = useNavigate();

   const [id, setData] = useState<string>("nothing");
    const getUserDetails = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        if (!token) {
          throw new Error("No token found");
        }

        const res = await axios.get<{ data: UserData }>(
          `http://localhost:5000/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );

        setData(res.data.data._id);
        
      } catch (error: any) {
        console.error(error.message || "An error occurred");
        console.log(error);
      }
    };

    useEffect(() => {
      getUserDetails();
    }, []);
      const location = useLocation();
  const isMobile = window.screen.width <= 768;
      const [pathname, setPathname] = useState(location.pathname);
   useEffect(() => {
     setPathname(location.pathname);
   }, [location.pathname]);
   const logout = async () => {
     try {
      
       Cookies.remove("token"); // Remove token from cookies
       
       navigate("/"); // Navigate to the login page
     toast.success("Logout successful!");
      } catch (error: any) {
       console.log(error.message);
       toast.error(error.message);
     }
   };
      return (
        <>
          <div className="w-full p-4 bg-white h-20 flex flex-row items-center justify-between sm:gap-x-4 md:gap-x-6 lg:gap-x-0">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={`${
                  isMobile
                    ? "./logo-devlinks-small.svg"
                    : "./logo-devlinks-large.svg"
                }`}
                alt="logo"
                className="h-8"
              />
            </div>

            {/* Navigation Links - will be evenly spaced on mobile/tablet */}
            <div className="flex flex-1 justify-around sm:max-w-[300px] md:max-w-[400px] mx-4">
              <Link
                to="/add-links"
                className={`flex flex-row items-center justify-center gap-2 rounded-lg p-4 text-lg font-semibold ${
                  pathname === "/add-links"
                    ? "bg-[#efebff] text-[#633cff]"
                    : "text-[#737373] hover:text-[#633cff]"
                }`}
              >
                <HiOutlineLink size={20} />
                <span className="lg:inline sm:hidden md:hidden">Links</span>
              </Link>

              <Link
                to="/profile"
                className={`flex flex-row items-center justify-center gap-2 rounded-lg p-2 text-lg font-semibold ${
                  pathname === "/profile"
                    ? "bg-[#efebff] text-[#633cff]"
                    : "text-[#737373] hover:text-[#633cff]"
                }`}
              >
                <FaRegUserCircle size={20} />
                <span className="lg:inline sm:hidden md:hidden">Profile Details</span>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={logout}
                className="flex flex-row items-center cursor-pointer  justify-center  p-2  gap-3 text-[1.1rem] mt-2 text-[#737373] transition-none hover:text-[#633cff]"
              >
                <CiLogout size={20} />
                <span className="lg:inline sm:hidden md:hidden">Logout</span>
              </button>

              <Link
                to={`/preview/${id}`}
                className="flex flex-row items-center justify-center gap-2 border-2 border-[#633cff] rounded-lg p-2 text-lg font-semibold text-[#633cff] hover:bg-[#633cff] hover:text-white"
              >
                <FaEye size={20} className="sm:inline lg:hidden md:inline" />
                <span className="hidden lg:inline ">Preview</span>
              </Link>
            </div>
          </div>
        </>
      );
}

export default Navbar