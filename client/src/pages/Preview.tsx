import React, { useEffect, useState } from "react";
import { useLinkContext } from "../context/LinkContext";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLink } from "react-icons/hi";
import axios from "axios";
import Cookies from 'js-cookie'
import BaseUrl from '../config'
import Loader from "../components/Loader";
import { useUser } from "../context/userContext";

const Preview = () => {
const {user} = useUser()
const route = useLocation();
  const id = route.pathname.split("/")[2];
 const token = Cookies.get("token");
const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
     const [firstName, setFirstName] = useState<string>("No name yet");
  const [lastName, setLastName] = useState<string>("")
       const [email, setEmail] = useState<string>("no mail yet");
       const [links, setLinks] = useState([])
      const [userOriginalId, setUserOriginalId] = useState('')
       const [profilePhoto, setProfilePhoto] = useState<string>("");
 useEffect(() => {if (user) {
  setUserOriginalId(user._id || "");
    console.log("useroriginalid", userOriginalId);
} }, [user]);
const toks = userOriginalId === id

 const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  const getUserDetails = async () => {
    setLoading(true);
  
    if (id) {
      const res = await axios.post(
        `${BaseUrl}/api/profile/info`,
        {
          userId: id,
        }
      );
      console.log(res);
     setFirstName(res.data.firstName);
   setLastName(res.data.lastName);
      setLinks(res.data.links);
      setEmail(res.data.email);
      setProfilePhoto(res.data.profilePicture);
      setLoading(false);
    }
  };
  useEffect(() => {

  getUserDetails()

  console.log("id",id)
console.log("toks",toks)
}, []);
setTimeout(() => {
  isCopied && setIsCopied(false);
}, 2000);
  return (
    <div>
      <section className="relative min-h-[100dvh] bg-white">
        {/* Background header - hidden on mobile */}
        <div className="h-[17rem] lg:flex rounded-b-[3.2rem] bg-[#633cff] sm:hidden"></div>

        {/* Header with back and share buttons */}
        {toks && (
          <header className="lg:absolute top-[2.0rem] lg:mx-4 flex lg:w-[calc(100%-2rem)] items-center justify-between rounded-[1.2rem] bg-white px-4 py-[0.6rem] sm:mx-0  sm:w-full sm:px-6 sm:mt-8">
            <Link
              to="/add-links"
              className="rounded-[0.8rem] hover:bg-[#633cff] hover:text-white border border-[#633cff] px-4 py-2 text-sm font-semibold text-[#633cff] sm:px-[1.7rem]"
            >
              Back to Editor
            </Link>
            <button
              onClick={handleCopy}
              className="cursor-pointer rounded-[0.8rem] bg-[#633cff] px-4 py-2 text-sm font-semibold text-white sm:px-[2.7rem]"
            >
              Share Link
            </button>
          </header>
        )}

        {/* Profile card */}
        {loading && (

            <Loader />
         
        )}
        <div className="flex flex-row justify-center items-center z-20 lg:-mt-28 ">
          <div className="top-[10rem] sm:w-full lg:max-w-[27.4rem] flex flex-col items-center rounded-[2.4rem] bg-white px-6 py-[1.8rem] shadow-lg sm:px-[1.6rem] sm:min-h-screen">
            {/* Avatar */}
            <div className="h-[10.4rem] w-[10.4rem] rounded-full border-[4px] border-[#633cff] bg-[#eee]">
              <img
                src={profilePhoto}
                alt="avatar"
                className="h-[10rem] w-[10rem] rounded-full object-cover"
              />
            </div>

            {/* Name and email */}
            <div className="space-y-[0.2rem] pb-[2rem] pt-[1.4rem] text-center">
              <h1 className="text-[2.2rem] font-bold text-[#333]">
                {firstName} {lastName}
              </h1>
              <h3 className="text-[1.1rem] text-[#737373]">{email}</h3>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 w-full px-2 sm:px-0 md:px-20">
              {links.map((link: any, index) => (
                <a
                  key={index}
                  href={`${link.baseUrl}${link.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full px-3 text-white text-center py-3 rounded-md font-medium flex flex-row ${link.color}`}
                >
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row gap-x-2">
                      <img
                        src={link.logo}
                        alt={link.platform}
                        className="w-5 h-5 text-white"
                        color="white"
                      />
                      {link.name}
                    </div>
                    <img src="/arrow-right.svg" alt="arrow-right" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copied notification */}
        {isCopied && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#333] px-4 py-3 rounded-xl">
            <HiOutlineLink size={"1.5rem"} color={"#737373"} />
            <p className="text-white text-sm">
              The link has been copied to your clipboard!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Preview;
