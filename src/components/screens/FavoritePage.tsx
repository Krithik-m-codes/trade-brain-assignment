"use client";
//! fetch favorite stocks from localstorage and display them
import React, { useEffect, useState } from 'react';
import { fetchStockPrices } from '@/services/stock';
import StockGraph from '@/components/app/stock/StockGraph';
import { ISStockPrice } from '@/types/stock';

interface FavoriteStockData {
    symbol: string;
    prices: ISStockPrice[];
    loading: boolean;
    error: string | null;
}

const FavoritesPage = () => {
    const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);
    const [stockData, setStockData] = useState<FavoriteStockData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load favorite stocks from localStorage
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem('favoriteStocks');
            if (storedFavorites) {
                const favorites = JSON.parse(storedFavorites);
                setFavoriteStocks(favorites);

                // Initialize stock data structure
                const initialStockData = favorites.map((symbol: string) => ({
                    symbol,
                    prices: [],
                    loading: true,
                    error: null
                }));
                setStockData(initialStockData);
            }
        } catch (err) {
            setError("Failed to load favorites from storage");
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch stock prices for each favorite stock
    useEffect(() => {
        if (favoriteStocks.length === 0) return;

        const fetchAllPrices = async () => {
            const updatedStockData = await Promise.all(
                favoriteStocks.map(async (symbol) => {
                    try {
                        const prices = await fetchStockPrices({
                            stock: symbol,
                            days: 7,
                            limit: 20
                        });

                        return {
                            symbol,
                            prices: prices || [],
                            loading: false,
                            error: null
                        };
                    } catch (error) {
                        console.error(`Failed to fetch prices for ${symbol}:`, error);
                        return {
                            symbol,
                            prices: [],
                            loading: false,
                            error: `Failed to load ${symbol} data`
                        };
                    }
                })
            );

            setStockData(updatedStockData);
        };

        fetchAllPrices();
    }, [favoriteStocks]);

    // Remove stock from favorites
    const removeFromFavorites = (symbolToRemove: string) => {
        const updatedFavorites = favoriteStocks.filter(symbol => symbol !== symbolToRemove);
        setFavoriteStocks(updatedFavorites);
        setStockData(stockData.filter(stock => stock.symbol !== symbolToRemove));
        localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your favorite stocks...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Favorites</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (

        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Favorite Stocks</h1>
                <p className="text-gray-600">
                    Track your preferred stocks with real-time data and analytics
                </p>
            </div>

            {favoriteStocks.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Favorite Stocks</h2>
                    <p className="text-gray-600 mb-6">
                        Start adding stocks to your favorites to track them here
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Browse Stocks
                    </button>
                </div>
            ) : (
                <div className="grid gap-8">
                    {stockData.map((stock) => (
                        <div key={stock.symbol} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                            {/* Stock Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{stock.symbol}</h2>
                                        {stock.prices.length > 0 && (
                                            <div className="flex items-center space-x-4 mt-2">
                                                <div className="text-lg font-semibold text-black">
                                                    ₹{stock.prices[stock.prices.length - 1]?.close.toFixed(2)}
                                                </div>
                                                <div className={`px-2 py-1 rounded-full text-sm font-medium ${stock.prices[stock.prices.length - 1]?.change >= 0
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {stock.prices[stock.prices.length - 1]?.change >= 0 ? '+' : ''}
                                                    {stock.prices[stock.prices.length - 1]?.change.toFixed(2)}
                                                    ({stock.prices[stock.prices.length - 1]?.percent.toFixed(2)}%)
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeFromFavorites(stock.symbol)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        title="Remove from favorites"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Stock Content */}
                            <div className="p-6">
                                {stock.loading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-2 text-gray-600">Loading {stock.symbol} data...</p>
                                        </div>
                                    </div>
                                ) : stock.error ? (
                                    <div className="text-center py-16">
                                        <div className="text-red-400 text-4xl mb-4">⚠️</div>
                                        <p className="text-red-600">{stock.error}</p>
                                    </div>
                                ) : stock.prices.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="text-gray-400 text-4xl mb-4">📈</div>
                                        <p className="text-gray-600">No price data available for {stock.symbol}</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Stock Info Cards */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Open</div>
                                                <div className="text-xl font-semibold text-black">
                                                    ₹{stock.prices[stock.prices.length - 1]?.open.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-sm text-gray-600">High</div>
                                                <div className="text-xl font-semibold text-green-600">
                                                    ₹{stock.prices[stock.prices.length - 1]?.high.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Low</div>
                                                <div className="text-xl font-semibold text-red-600">
                                                    ₹{stock.prices[stock.prices.length - 1]?.low.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Volume</div>
                                                <div className="text-xl font-semibold text-blue-600">
                                                    {stock.prices[stock.prices.length - 1]?.volume.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stock Graph */}
                                        <StockGraph data={stock.prices} showTooltip={false} />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
