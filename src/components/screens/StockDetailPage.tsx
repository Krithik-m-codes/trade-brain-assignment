"use client";
import React, { useState } from 'react';
import StockGraph from '@/components/app/stock/StockGraph';
import { ISStockPrice } from '@/types/stock';

interface StockDetailPageProps {
    symbol: string;
    companyName: string | null;
    initialPrices: ISStockPrice[] | null;
}

export default function StockDetailPage({ symbol, companyName, initialPrices }: StockDetailPageProps) {
    const [prices] = useState(initialPrices);
    const [error] = useState<string | null>(initialPrices ? null : "Failed to load stock data");

    // add stores to favorite stocks in localstorage
    const addToFavorites = (symbol: string) => {
        localStorage.setItem('favoriteStocks', JSON.stringify([...JSON.parse(localStorage.getItem('favoriteStocks') || '[]'), symbol]));
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!prices || prices.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">📈</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
                    <p className="text-gray-600">Stock data not found for {symbol}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-6'>
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {companyName} Stock Analysis
                            </h1>
                            {companyName && (
                                <h2 className="text-xl text-gray-600 mb-2">{symbol}</h2>
                            )}
                            <p className="text-gray-600">
                                Real-time stock price data and analytics
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-4">
                            <button
                                onClick={() => addToFavorites(symbol.toUpperCase())}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                            >
                                <span>Add to Favorites</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <StockGraph data={prices} />
                </div>

            </div>
        </div>
    );
}

