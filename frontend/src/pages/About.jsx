
import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 ">
        {/* MERN image section */}
      <div className='flex flex-1 items-center justify-between gap-4 my-auto p-5 border-2 rounded-xl'>
        <div className='flex flex-col items-center justify-center'>
          <img src='mongodb.svg' alt='MongoDB' className='h-16 w-16 object-contain' />
          <h2 className='text-5xl text-green-600'>M</h2>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src='express.svg' alt='Express' className='h-16 w-16 object-contain' />
          <h2 className='text-5xl text-gray'>E</h2>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src='react.svg' alt='React' className='h-16 w-16 object-contain' />
          <h2 className='text-5xl text-sky-400'>R</h2>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src='nodeJs.svg' alt='NodeJs' className='h-16 w-16 object-contain' />
          <h2 className='text-5xl text-lime-500'>N</h2>
        </div>
        
        
      </div>

      <div className="bg-linear-to-l from-green-200 to-white m-3 p-8 border border-gray-200 rounded-xl shadow-sm">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          About Our NoteApp
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Welcome to NoteApp, a minimalist workspace engineered to remove friction from writing. We believe that tools should stay out of your way so your creativity and intellect can thrive.
        </p>

        <h2 className="text-2xl font-bold text-green-600 mt-8 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 text-md leading-relaxed mb-6">
          To provide a seamless, secure, and lightning-fast digital notebook for students, professionals, and creators worldwide. By leveraging the power of the MERN stack, we deliver real-time data persistence without compromising on speed or design.
        </p>

        <h2 className="text-2xl font-bold text-green-600 mt-8 mb-4">
          Security First Philosophy
        </h2>
        <p className="text-gray-600 text-md leading-relaxed mb-6">
          Your thoughts are private, and they should stay that way. Our ecosystem implements cryptographically strong password hashing using bcrypt, industry-standard JSON Web Tokens (JWT) for session management, end-to-end email validations, rapid OTP recoveries, and frictionless OAuth integrations with Google.
        </p>

        <h2 className="text-2xl font-bold text-green-600 mt-8 mb-4">
          Tech Stack & API Integrations.
        </h2>
      
        <ul className="space-x-3 space-y-3 pl-5 list-disc text-gray-600">
          <li><strong className="text-gray-900">MongoDB & Mongoose:</strong> Secure cloud data storage and data modeling.</li>
          <li><strong className="text-gray-900">Express & Node.js:</strong> High-performance API routes protected by robust security middleware and bcrypt salting functions.</li>
          <li><strong className="text-gray-900">React & Tailwind CSS:</strong> A dynamic, highly componentized web application framework.</li>
          <li><strong className="text-gray-900">Nodemailer & Google OAuth2:</strong> Services running backend automation for seamless user lifecycle management.</li>
          <li><strong className="text-gray-900">OpenWeatherMap REST API:</strong> Integrated external microservices fetching live regional atmospheric variables using coordinated Axios geolocation requests.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
