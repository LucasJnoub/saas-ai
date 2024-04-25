import React, { useState } from 'react';
import PricingCard from './pricing-card';
import axios from 'axios';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const [isBusiness, setIsBusiness] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
    setIsMonthly(!isMonthly);
  };

  const handleBusinessClick = () => {
    setIsBusiness(true);
    handleOnClick(true);
  };

  const handleOnClick = async (isBusiness = false) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe?isAnnual=${isMonthly}&isBusiness=${isBusiness}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pricingCards = [
    {
      title: 'Free',
      description: 'Try out Pallyy and schedule 15 posts per month, for a single brand. No credit card required.',
      price: 0,
      period: 'per month',
      features: ['1 Social Set', '15 Scheduled posts', 'Feed Planner', 'Reports', 'Calendar, board & table views'],
      variant: 'outline',
      handleClick: () => {}, 
      isBusiness: false,
    },
    {
      title: 'Premium',
      description: 'For social media agencies with multiple brands; unlimited posting, add more brands & more.',
      price: isAnnual ? '180' : '18',
      period: isAnnual ? 'per year' : 'per month',
      features: [
        'Additional Social Sets ($18/month each)',
        'Additional Users ($23/month each)',
        'Custom Analytics Reports',
        'Custom Domain',
        'Unlimited Scheduled Posts',
        'Bulk Scheduling',
        'Bio Link',
      ],
      variant: 'premium',
      handleClick: handleOnClick,
      isBusiness: false,
    },
    {
      title: 'Business',
      description:
        'For large organizations with extensive social media needs; unlimited posting, advanced analytics, priority support, and more.',
      price: isAnnual ? '500' : '50',
      period: isAnnual ? 'per year' : 'per month',
      features: [
        'Unlimited Social Sets',
        'Advanced Analytics',
        'Priority Support',
        'Custom Solutions',
        'Team Collaboration Tools',
        'API Access',
      ],
      variant: 'outline',
      handleClick: handleBusinessClick,
      isBusiness: true,
    },
  ];

  return (
    <div className="bg-[#111827] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>
      <p className="mb-8">
        Start scheduling on our Free plan - no credit card required, or trial Premium for unlimited scheduling, multiple
        social sets & more.
      </p>
      <div className="flex items-center justify-center mb-8">
        <span className="mr-2">Monthly</span>
        <label htmlFor="toggle" className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={isMonthly}
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
        <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full">2 months for free</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingCards.map((card, index) => (
          <PricingCard
            key={index}
            title={card.title}
            description={card.description}
            price={card.price}
            period={card.period}
            features={card.features}
            variant={card.variant}
            handleClick={card.handleClick}
            isBusiness={card.isBusiness}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;