import React from 'react'
import PhoneMockup from '../components/PhoneMockup';
import ProfileForm from '../components/ProfileForm';

const profile = () => {
  return (
    <div>
   
      <div className=" flex flex-row lg:gap-x-7">
        <PhoneMockup />
      <ProfileForm />
      </div>
    </div>
  );
}

export default profile