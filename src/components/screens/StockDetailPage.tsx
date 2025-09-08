"use client";
import React, { useEffect, useState } from 'react';
import { fetchStockPrices } from '@/services/stock';
import StockGraph from '@/components/app/stock/StockGraph';
import { useParams } from 'next/navigation';


export default function StockDetailPage() {
    const { symbol } = useParams();
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // add stores to favorite stocks in localstorage
    const addToFavorites = (symbol: string) => {
        localStorage.setItem('favoriteStocks', JSON.stringify([...JSON.parse(localStorage.getItem('favoriteStocks') || '[]'), symbol]));
    };

    useEffect(() => {
        const getPrices = async () => {
            try {
                setLoading(true);
                const fetchedPrices = await fetchStockPrices({ stock: String(symbol) });
                if (!fetchedPrices) {
                    setError("Stock not found.");
                } else {
                    setPrices(fetchedPrices);
                }
            } catch (e) {
                setError("Failed to fetch stock prices.");
            } finally {
                setLoading(false);
            }
        };

        if (symbol) {
            getPrices();
        }
    }, [symbol]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading stock data...</p>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {String(symbol).toUpperCase()} Stock Analysis
                    </h1>
                    <p className="text-gray-600">
                        Real-time stock price data and analytics
                    </p>
                    <button
                        onClick={() => addToFavorites(String(symbol).toUpperCase())}
                        className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                    >
                        Add to Favorites
                    </button>
                </div>

                <div className="mb-8">
                    <StockGraph data={prices} />
                </div>

            </div>
        </div>
    );
}

