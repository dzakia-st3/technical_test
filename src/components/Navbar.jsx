import React, { useState } from 'react'

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('status');

    const tabs = [
        'Status',
        'Tracking History',
        'Geofence',
        'Toll Declaration',
        'Live Tracking',
        'POE'
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center p-4 rounded-lg gap-4">
            {/* 1 */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <div className="text-gray-500 text-sm font-semibold">TRACKING</div>
                <div className="ml-4 flex-1">
                    <div className="text-blue-600 text-lg font-bold">B 1212 DX</div>
                    <div className="text-gray-400 text-xs">CAR TELTO MC003</div>
                </div>
                <div className="text-blue-600 ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                    >
                        <path d="M20 8h-1V7c0-2.761-2.239-5-5-5H10C7.239 2 5 4.239 5 7v1H4c-1.654 0-3 1.346-3 3v5c0 1.654 1.346 3 3 3h1c.553 0 1-.447 1-1v-1h12v1c0 .553.447 1 1 1h1c1.654 0 3-1.346 3-3v-5c0-1.654-1.346-3-3-3zM7 7c0-1.654 1.346-3 3-3h4c1.654 0 3 1.346 3 3v1H7V7zm14 9c0 .551-.449 1-1 1H4c-.551 0-1-.449-1-1v-5c0-.551.449-1 1-1h16c.551 0 1 .449 1 1v5zm-6-3H9c-.553 0-1 .447-1 1s.447 1 1 1h6c.553 0 1-.447 1-1s-.447-1-1-1z" />
                    </svg>
                </div>
            </div>

            {/* 2 */}
            <div className="flex justify-center ml-5">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-2 py-2 text-sm rounded-md transition-colors outline-none ${activeTab === tab.toLowerCase()
                                    ? "bg-blue-500 text-white outline outline-2 outline-blue-500"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3 */}
            <div className="flex justify-end col-end-0">
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md shadow hover:bg-blue-600 transition">
                    Vehicle Tracking List
                </button>
            </div>
        </div>
    )
}
