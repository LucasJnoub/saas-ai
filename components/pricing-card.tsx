import React from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';

const PricingCard = ({ title, description, price, period, features, variant, handleClick, isBusiness }:any) => {
    const { user } = useUser();
  return (
    <div className={`bg-[#1E293B] p-8 ${variant === 'premium' ? 'border-gradient' : ''}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4 h-[110px]">{description}</p>
      <p className="text-4xl font-bold mb-4">${price}</p>
      <p className="mb-4">{period}</p>
      <p className="mb-4">Includes:</p>
      <div className="h-[250px]">
        <p className="font-bold mb-2">What you get with {title}:</p>
        <ul className="list-disc list-inside mb-4">
          {features.map((feature:any, index:any) => (
            <li key={index}>{feature}</li> 
          ))}  
        </ul>
      </div>
      <div className="mb-4 flex justify-center">
        <Button
          variant={variant}
          className={`text-white px-4 py-2 rounded-full mb-4 ${
            variant === 'outline' ? 'bg-[#2B3945]' : ''
          }`}
          onClick={handleClick}
        >
          {user && isBusiness ? 'TRY FREE FOR 30 DAYS' : ' TRY FOR FREE'}
          {/* {isBusiness ? 'TRY FREE FOR 30 DAYS' : 'TRY FREE FOR 14 DAYS'} */}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;