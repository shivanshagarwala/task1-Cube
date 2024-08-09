// src/components/CustomerDetails.tsx
import React from 'react';
import { Customer } from '../types/types';
import PhotoGrid from './PhotoGrid';

interface Props {
    customer: Customer | null;
    selectedCustomerId: number; // Add selectedCustomerId prop
}

const CustomerDetails: React.FC<Props> = ({ customer, selectedCustomerId }) => {
    if (!customer) return <div className="alert alert-info">Select a customer to see details</div>;

    return (
        <div className="customer-details">
            <h4>{customer.name} details here</h4>
            <h6>{customer.title}</h6>
            {/* <p>{customer.address}</p> */}
            <PhotoGrid selectedCustomerId={selectedCustomerId} /> {/* Pass selectedCustomerId */}
        </div>
    );
};

export default CustomerDetails;
