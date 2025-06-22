import React from 'react'
import { useNavigate } from 'react-router'
import Lottie from 'lottie-react'
import errorAnimation from '../assets/error404.json'

const Error = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Lottie Animation */}
        <div className="mb-8">
          <Lottie 
            animationData={errorAnimation}
            style={{ height: 300, width: 300 }}
            loop={true}
            autoplay={true}
            className="mx-auto"
          />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Oops! Something went wrong
          </h1>
        </div>

        {/* Go Back Button */}
        <button 
          onClick={handleGoBack}
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group mx-auto transition-all duration-300 hover:shadow-lg cursor-pointer"
          type="button"
          aria-label="Go back to home page"
        >
          <div className="bg-indigo-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1024 1024" 
              height="25px" 
              width="25px"
              className="transition-transform duration-300"
            >
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>

        <p className="text-sm text-gray-500 mt-6">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  )
}

export default Error