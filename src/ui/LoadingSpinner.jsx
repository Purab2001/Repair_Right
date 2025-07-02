import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const LoadingSpinner = () => {
  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center'>
      <div className="w-96 h-96">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;