import React from 'react';
import { Button } from './ui/button';
import { BookCopy, BookOpen, ChevronRight, MessagesSquare, SquarePen } from 'lucide-react';
import Link from 'next/link';

const FrontBody = () => {
  const four = [
    {
      icon: <BookCopy size={84} className='bg-primary p-3 rounded-xl' />,
      line1: "25+ Templates",
      line2: "Responsive, and mobile-first project on the web",
    },
    {
      icon: <SquarePen size={84} className='bg-primary p-3 rounded-xl' />,
      line1: "Customizable",
      line2: "Components are easily customized and extendable",
    },
    {
      icon: <BookOpen size={84} className='bg-primary p-3 rounded-xl' />,
      line1: "Free to Use",
      line2: "Every component and plugin is well documented",
    },
    {
      icon: <MessagesSquare size={84} className='bg-primary p-3 rounded-xl' />,
      line1: "24/7 Support",
      line2: "Contact us 24 hours a day, 7 days a week",
    },
  ];

  return (
    <div className='flex justify-center items-center mt-64 bg-url[]'>
      <div className='text-center'>
        <h1 className="text-7xl font-bold hover:scale-105 animate-pulse">
          AI Content <span className='text-primary hover:scale-105'>Generator</span>
        </h1>
        <p className='mt-5 text-xl'>
          Transform your content creation with our AI-driven app, crafting compelling, high-quality text in an instant.
        </p>
        <div className='mt-16 mb-8'>
          <Link href={'/dashboard'}>
            <Button className='px-8 py-6 text-2xl hover:scale-105'>Get Started</Button>
          </Link>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 m-10 mx-10'>
          {four.map((item, index) => (
            <div key={index} className='text-left hover:scale-105'>
              {item.icon}
              <div className='text-2xl font-semibold mt-4'>{item.line1}</div>
              <div className='text-gray-600 mt-2 text-xl'>{item.line2}</div>
              <button className='flex items-center mt-4 text-primary text-xl'>
                Learn more <ChevronRight className='ml-2' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontBody;