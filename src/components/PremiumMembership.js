// src/components/PremiumMembership.js
import React from 'react';

const PremiumMembership = ({ onUpgrade }) => {
    return (
        <div>
            <h2>Premium Membership</h2>
            {/* Display premium features and upgrade button */}
            <button onClick={onUpgrade}>Upgrade to Premium</button>
        </div>
    );
};

export default PremiumMembership;
