import React from 'react'
import PhoneMockup from '../components/PhoneMockup'
import LinkForm from '../components/LinkForm'

const dashboard = () => {
  return (
    <>
    
        <div className=' flex flex-row lg:gap-x-14 '>
        <PhoneMockup /> 
      
         <LinkForm />
        
         
        </div>
           
          
           
    </>
  )
}

export default dashboard