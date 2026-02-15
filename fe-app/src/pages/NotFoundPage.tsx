import React from 'react';
import { Home, ArrowLeft } from 'lucide-react'; // Using lucide-react for clean icons

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="text-center">
        {/* Error Code */}
        <p className="text-6xl font-extrabold text-red-600">404</p>
        
        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        
        {/* Subtext */}
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. 
          Maybe it was moved or never existed in the first place?
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all"
          >
            <Home size={18} />
            Back to home
          </a>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </div>

      {/* Optional: Simple Decorative Element */}
      <div className="mt-16 w-full max-w-2xl opacity-10">
        <hr className="border-t-2 border-gray-300" />
      </div>
    </div>
  );
};

export default NotFoundPage