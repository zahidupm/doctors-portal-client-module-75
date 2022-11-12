import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-primary text-white to-secondary">{children}</button>
    );
};

export default PrimaryButton;