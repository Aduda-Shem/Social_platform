import React from 'react';
import { Button } from 'reactstrap';

const PremiumUpgrade = ({ onUpgrade }) => {
  const handleUpgrade = () => {
    onUpgrade();
  };

  return (
    <div>
      <h2 className="mb-4">Upgrade to Premium</h2>
      <p>Unlock all premium features and view 100 posts!</p>
      <Button color="success" onClick={handleUpgrade}>
        Upgrade Now
      </Button>
    </div>
  );
};

export default PremiumUpgrade;
