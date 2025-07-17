import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPackage, FiTruck, FiCheckCircle, FiMapPin } = FiIcons;

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const mockTrackingData = {
    orderId: 'TIP123456789',
    status: 'in_transit',
    estimatedDelivery: '2024-03-20',
    currentLocation: 'Mumbai, Maharashtra',
    updates: [
      {
        id: 1,
        status: 'Order Placed',
        location: 'Online',
        timestamp: '2024-03-15 10:30 AM',
        completed: true
      },
      {
        id: 2,
        status: 'Order Confirmed',
        location: 'Delhi Warehouse',
        timestamp: '2024-03-16 09:15 AM',
        completed: true
      },
      {
        id: 3,
        status: 'In Transit',
        location: 'Mumbai, Maharashtra',
        timestamp: '2024-03-17 02:45 PM',
        completed: true
      },
      {
        id: 4,
        status: 'Out for Delivery',
        location: 'Local Delivery Center',
        timestamp: 'Pending',
        completed: false
      },
      {
        id: 5,
        status: 'Delivered',
        location: 'Delivery Address',
        timestamp: 'Pending',
        completed: false
      }
    ]
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setTrackingResult(mockTrackingData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Track Your Order</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
            >
              Track
            </button>
          </div>
        </form>

        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{trackingResult.orderId}</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {trackingResult.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold">{trackingResult.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Location</p>
                  <p className="font-semibold">{trackingResult.currentLocation}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {trackingResult.updates.map((update, index) => (
                <div key={update.id} className="flex mb-8 last:mb-0">
                  <div className="relative flex flex-col items-center mr-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        update.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      {index === 0 && <SafeIcon icon={FiPackage} className="text-white" />}
                      {index === 1 && <SafeIcon icon={FiCheckCircle} className="text-white" />}
                      {index === 2 && <SafeIcon icon={FiTruck} className="text-white" />}
                      {index === 3 && <SafeIcon icon={FiTruck} className="text-white" />}
                      {index === 4 && <SafeIcon icon={FiMapPin} className="text-white" />}
                    </div>
                    {index !== trackingResult.updates.length - 1 && (
                      <div
                        className={`h-full w-0.5 ${
                          update.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{update.status}</h3>
                    <p className="text-sm text-gray-600">{update.location}</p>
                    <p className="text-sm text-gray-500">{update.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;