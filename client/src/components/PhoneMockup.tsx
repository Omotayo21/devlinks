import React, {useState, useEffect} from 'react'

import { useUser } from '../context/userContext';
const PhoneMockup = () => {
   
 const { user } = useUser();
  
    
  return (
    <div>
      <div className="md:hidden sm:hidden lg:w-[42rem] -ml-8 bg-white relative lg:flex  flex-col items-center justify-start justify-self-center p-16 pb-0">
        <img src="./illustration-phone-mockup.svg" alt="phone mockup" />
        <div className="absolute top-[17rem] flex flex-col gap-[1.1rem] p-16">
          {user?.links?.map((link : any, index) => (
            <a
              key={index}
              href={`${link.baseUrl}${link.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-[15rem] px-3 text-white text-center py-3 rounded-md font-medium flex flex-row ${link.color}`}
            >
              {" "}
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row  gap-x-2">
                  <img
                    src={link.logo}
                    alt={link.platform}
                    className="w-5 h-5 text-white "
                    color="white"
                  />
                  <p className='text-[1rem]'>{link.name}</p>
                </div>
                <img src="/arrow-right.svg" alt="arrow-right" />
              </div>
            </a>
          ))}
        </div>
        <div className="absolute top-[14rem] flex flex-col items-center">
          <p className="w-full min-w-[10rem] bg-white text-center text-[0.8rem] font-semibold leading-[2.7rem] text-[#333]">
            {user?.firstName} {user?.lastName}
          </p>

          <p
            className={`bg-white text-[0.8rem] leading-[2.1rem] text-[#737373] `}
          >
         {user?.email}
          </p>
        </div>
      </div>

       {user?.profilePicture ? (
        <img
          src={user?.profilePicture}
          alt="photo"
          className="absolute lg:flex sm:hidden md:hidden left-[16rem] top-[12.5rem] h-[7.6rem] w-[7.6rem] rounded-full object-cover"
        />
      ) : null}
 
    </div>
    
  );
}

export default PhoneMockup