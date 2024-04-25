import React, { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true); // Add this state variable
  const [loading, setLoading] = useState(false);


  const handleToggle = () => {
    setIsAnnual(!isAnnual);
    // setIsMonthly(!isMonthly); // Update the isMonthly state

  };

//  const handleOnClick = async () => {
//   try {
//     setLoading(true);
//     const response = await axios.get(`/api/stripe?isMonthly=${isAnnual}`);
//     window.location.href = response.data.url;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };

const handleOnClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe?isAnnual=${isMonthly}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#111827] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>
      <p className="mb-8">
        Start scheduling on our Free plan - no credit card required, or trial Premium for unlimited scheduling, multiple social sets & more.
      </p>
      <button className="bg-black text-white px-4 py-2 rounded-full mb-8">
        GET STARTED FOR FREE
      </button>
      <p className="mb-8">
        Trusted lady by growing brands and agencies around the world including:
      </p>
      {/* Add your logos here */}
      <div className="flex items-center justify-center mb-8">
        <span className="mr-2">Monthly</span>
        <label
          htmlFor="toggle"
          className="flex items-center cursor-pointer relative"
        >
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={isAnnual}
            onChange={handleToggle}
          />
          <div className="w-10 h-6 bg-gray-400 rounded-full transition"></div>
          <span
            className={`absolute w-4 h-4 bg-white rounded-full transition transform ${
              isAnnual ? 'translate-x-6' : 'translate-x-1'
            }`}
          ></span>
        </label>
        <span className="ml-2">Annually</span>
        <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full">
          Save 70%
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1E293B] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Free</h2>
          <p className="mb-4">
            Try out Pallyy and schedule 15 posts per month, for a single brand.
            No credit card required.
          </p>
          <p className="text-4xl font-bold mb-4">$0</p>
          <p className="mb-4">per month</p>
          <p className="mb-4">Includes:</p>
          <Button variant={'outline'} className="bg-[#2B3945] text-white px-4 py-2 rounded-full mb-4" >
            GET STARTED
          </Button>
          <p className="font-bold mb-2">What you get with Free:</p>
          <ul className="list-disc list-inside mb-4">
            <li>1 Social Set</li>
            <li>15 Scheduled posts</li>
            <li>Feed Planner</li>
            <li>Reports</li>
            <li>Calendar, board & table views</li>
          </ul>
        </div>
        <div className="bg-[#1E293B] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Premium</h2>
          <p className="mb-4">
            For social media agencies with multiple brands; unlimited posting,
            add more brands & more.
          </p>
          <p className="text-4xl font-bold mb-4">
            ${isAnnual ? '180' : '18'}
          </p>
          <p className="mb-4">{isAnnual ? 'per year' : 'per month'}</p>
          <p className="mb-4">Includes:</p>
          {/* Add your includes here */}
          {/* <button className={`bg-[${isAnnual ? '#16A34A' : '#2B3945'}] text-white px-4 py-2 rounded-full mb-4`}>
            TRY FREE FOR 14 DAYS
          </button> */}
        <div className='mb-4'>

          {/* <Button variant={'premium'} className='text-white px-4 py-2 rounded-full mb-4`'>TRY FREE FOR 14 DAYS</Button>
           */}
<Button
  variant={'premium'}
  className='text-white px-4 py-2 rounded-full mb-4'
  onClick={handleOnClick}
>
  TRY FREE FOR 14 DAYS
</Button>
        </div>

          <p className="font-bold mb-2">What you get with Premium:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Additional Social Sets ($18/month each)</li>
            <li>Additional Users ($23/month each)</li>
            <li>Custom Analytics Reports</li>
            <li>Custom Domain</li>
            <li>Unlimited Scheduled Posts</li>
            <li>Bulk Scheduling</li>
            <li>Bio Link</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
