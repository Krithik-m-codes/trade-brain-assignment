// ! stock graph component ,  uses recharts library to display stock data for that particular time period
"use client";
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { ISStockPrice } from '@/types/stock';

interface StockGraphProps {
    data: ISStockPrice[];
    showTooltip?: boolean;
}

const StockGraph: React.FC<StockGraphProps> = ({ data, showTooltip = true }) => {
    // Handle empty or invalid data
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-gray-50 text-black rounded-lg border border-gray-200">
                <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">📈</div>
                    <p className="text-gray-600">No stock data available</p>
                </div>
            </div>
        );
    }

    // Transform data for recharts with proper time formatting
    const chartData = data.map((item, index) => {
        // Parse the date string "2025-09-05 09:38:00+05:30"
        const date = new Date(item.date);

        return {
            ...item,
            price: item.close,
            displayDate: data.length === 1 ?
                'Current' :
                date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }),
            fullDate: date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            index: index,
        };
    });

    // For single data point, create a simple display
    if (data.length === 1) {
        const singleData = data[0];
        return (
            <div className="w-full">
                <div className="mb-4 p-4 bg-gray-50 text-black rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Stock Price</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Current Price:</span>
                            <div className="font-semibold text-lg">₹{singleData.close.toFixed(2)}</div>
                        </div>
                        <div>
                            <span className="text-gray-600">Change:</span>
                            <div className={`font-semibold ${singleData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {singleData.change >= 0 ? '+' : ''}
                                {singleData.change.toFixed(2)}
                                ({singleData.percent.toFixed(2)}%)
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-600">Volume:</span>
                            <div className="font-semibold">{singleData.volume.toLocaleString()}</div>
                        </div>
                        <div>
                            <span className="text-gray-600">Value:</span>
                            <div className="font-semibold">₹{singleData.value.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-sm text-gray-600">Open</div>
                        <div className="text-xl font-semibold">₹{singleData.open.toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-sm text-gray-600">High</div>
                        <div className="text-xl font-semibold text-green-600">₹{singleData.high.toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-sm text-gray-600">Low</div>
                        <div className="text-xl font-semibold text-red-600">₹{singleData.low.toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-sm text-gray-600">Prev Close</div>
                        <div className="text-xl font-semibold">₹{singleData.prev_close.toFixed(2)}</div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800">
                        📊 This shows current stock data. For historical trends, try increasing the time period or limit in your API call.
                    </p>
                </div>
            </div>
        );
    }

    // Custom tooltip to show more stock information
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{`Time: ${data.fullDate}`}</p>
                    <p className="text-blue-600">{`Close: ₹${data.close.toFixed(2)}`}</p>
                    <p className="text-green-600">{`High: ₹${data.high.toFixed(2)}`}</p>
                    <p className="text-red-600">{`Low: ₹${data.low.toFixed(2)}`}</p>
                    <p className="text-gray-600">{`Open: ₹${data.open.toFixed(2)}`}</p>
                    <p className="text-purple-600">{`Volume: ${data.volume.toLocaleString()}`}</p>
                    <p className={`font-semibold ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {`Change: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.percent.toFixed(2)}%)`}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Determine the gradient color based on overall trend
    const firstPrice = chartData[0]?.close || 0;
    const lastPrice = chartData[chartData.length - 1]?.close || 0;
    const isPositiveTrend = lastPrice >= firstPrice;

    return (
        <div className="w-full">
            <div className="mb-4 p-4 bg-gray-50 text-black rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Stock Price Chart</h3>
                {chartData.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Current Price:</span>
                            <div className="font-semibold text-lg">₹{lastPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <span className="text-gray-600">Change:</span>
                            <div className={`font-semibold ${chartData[chartData.length - 1]?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {chartData[chartData.length - 1]?.change >= 0 ? '+' : ''}
                                {chartData[chartData.length - 1]?.change.toFixed(2)}
                                ({chartData[chartData.length - 1]?.percent.toFixed(2)}%)
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-600">Volume:</span>
                            <div className="font-semibold">{chartData[chartData.length - 1]?.volume.toLocaleString()}</div>
                        </div>
                        <div>
                            <span className="text-gray-600">Data Points:</span>
                            <div className="font-semibold">{chartData.length}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full h-96 bg-white rounded-lg border border-gray-200 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={isPositiveTrend ? "#10b981" : "#ef4444"}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={isPositiveTrend ? "#10b981" : "#ef4444"}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                            dataKey="displayDate"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            domain={['dataMin - 1', 'dataMax + 1']}
                            tickFormatter={(value) => `₹${value.toFixed(2)}`}
                        />
                        {showTooltip && <Tooltip content={<CustomTooltip />} />}
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={isPositiveTrend ? "#10b981" : "#ef4444"}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            dot={{ fill: isPositiveTrend ? "#10b981" : "#ef4444", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: isPositiveTrend ? "#10b981" : "#ef4444", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockGraph;