import React from 'react';
import { Button } from 'reactstrap';

const PremiumUpgrade = ({ onUpgrade }) => {
  const handleUpgrade = () => {
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-3xl font-semibold mb-4 text-blue-500">Upgrade to Premium</h2>
        <p className="text-gray-700">Unlock all premium features and view 100 posts!</p>
        <Button color="success" className="mt-4" onClick={handleUpgrade}>
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
