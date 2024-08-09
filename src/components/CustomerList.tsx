// src/components/CustomerList.tsx
import React from 'react';
import { Customer } from '../types/types';

interface Props {
    customers: Customer[];
    selectedCustomerId: number;
    onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<Props> = ({ customers, selectedCustomerId, onSelectCustomer }) => {
    return (
        <div className="customer-list">
            {customers.map((customer) => (
                <div
                    key={customer.id}
                    className={`customer-card ${selectedCustomerId === customer.id ? 'selected' : ''}`}
                    onClick={() => onSelectCustomer(customer.id)}
                >
                    <h5>{customer.name}</h5>
                    <p>{customer.title.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerList;
