// src/App.tsx
import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer } from './types/types';
import './App.css';

const App: React.FC = () => {
    const [customers] = useState<Customer[]>([...Array(1000)].map((_, index) => ({
        id: index + 1,
        name: `Customer ${index + 1}`,
        // title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat porro iusto rem! Sunt architecto a magni optio error quod fuga officiis libero tenetur, ea minima doloribus, facere nesciunt molestias iusto dicta sapiente quae illo reiciendis at ab ipsam deleniti ipsum!',

        address: `${index + 1} Main St, City, Country`,
    })));
    const [selectedCustomerId, setSelectedCustomerId] = useState<number>(1);

    const handleSelectCustomer = (id: number) => {
        setSelectedCustomerId(id);
    };

    const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId) || null;

    return (
        <>
            <div className="app">
                <div className="heading-container">
                    <h4 className="text-center my-4">This here is the heading</h4>
                </div>
                <div className="main-content">
                    <CustomerList
                        customers={customers}
                        selectedCustomerId={selectedCustomerId}
                        onSelectCustomer={handleSelectCustomer}
                    />
                    <CustomerDetails
                        customer={selectedCustomer}
                        selectedCustomerId={selectedCustomerId} // Pass selectedCustomerId
                    />
                </div>
            </div>
        </>
    );
};

export default App;