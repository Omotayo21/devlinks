
import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo-devlinks-large.svg";
import {toast} from "react-hot-toast";
const ForgotPasswordReset = () => {
 
  const [token, setToken] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  
  const navigate = useNavigate();
 const togglePasswordVisibility = () => {
   setPasswordVisible(!passwordVisible);
 };

 const toggleConfirmPasswordVisibility = () => {
   setConfirmPasswordVisible(!confirmPasswordVisible);
 };
  const resetpasswordHandler = async () => {
    if (!newpassword || !confirmNewPassword) {
   //   toast.error("passwords cannot be empty");
      return;
    }
    if (newpassword !== confirmNewPassword) {
     toast.error("Passwords do not match");
      return;
    }
    try {
      if (token.length > 0) {
        setLoading(true);
        const user = await axios.post(`${BaseUrl}/api/resetpassword`, {
          token,
          newpassword,
        });
        console.log(user);
        toast.success("Password changed sucessfully");
        navigate("/");
      }
    } catch (error: any) {
     toast.error(error.response.data.data);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  return (
    <>
      {error && (
        <div className="flex justify-center bg-gray-200 border border-green-700 w-64 ">
          <h3 className="text-xl text-red-500 m-3 p-3">{error}</h3>
        </div>
      )}
      <div className="flex flex-row items-center justify-center mt-20">
        <div className=" flex flex-col items-center justify-center gap-y-12 lg:w-[40rem] lg:h-[30rem] sm:w-[22rem] sm:h-[28rem] bg-white border border-black">
          <img
            src={logo}
            alt="Logo"
            className="w-[200px] ml-5 mt-5 sm:hidden md:flex"
          />
          <h1 className="font-bold text-3xl">
            {" "}
            {loading ? "Processing" : "Reset your Password"}
          </h1>
          <div className="flex flex-row">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              required
              placeholder="enter your new password"
              value={newpassword}
              name="password"
              className="lg:w-96 py-2 sm:w-72 sm:h-8 rounded-md lg:h-12 border border-black pl-2"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Eye Icon */}
            <div
              onClick={togglePasswordVisibility}
              className="relative  -ml-8 p-1 mt-2 cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </div>
          </div>
<div className="flex flex-row">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            className="lg:w-96 py-2 sm:w-72 sm:h-8 rounded-md lg:h-12 border border-black pl-2"
            placeholder="Please confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          {/* Eye Icon for Confirm Password */}
          <div
            onClick={toggleConfirmPasswordVisibility}
            className="relative cursor-pointer -ml-8 p-1 mt-2"
          >
            {confirmPasswordVisible ? (
              <FaEyeSlash size={16} />
            ) : (
              <FaEye size={16} />
            )}
          </div>
          </div>
          <button
            className="bg-indigo-500 cursor-pointer text-white font-medium lg:w-64 lg:h-12 sm:w-48 sm:h-8 rounded-md border border-blue-500"
            onClick={resetpasswordHandler}
          >
            {" "}
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordReset;
