import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          404
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
          Page Not Found
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <Link to="/" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-light-text text-light-bg dark:bg-dark-text dark:text-dark-bg hover:opacity-80 transition-opacity duration-300 sm:px-8">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
