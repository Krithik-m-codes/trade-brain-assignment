"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const imageUrls = [
    "/assets/bull-image.jpg",
    "/assets/company.jpg",
    "/assets/stock-market.jpg",
    "/assets/stock.jpg"
];

function App() {

    // Random financial tips
    const financialTips = [
        "💡 Diversify your portfolio across different sectors",
        "📈 Dollar-cost averaging reduces investment risk",
        "🎯 Set clear investment goals and timelines",
        "📚 Always research before investing",
        "⚖️ Never invest more than you can afford to lose"
    ];

    const [currentTip, setCurrentTip] = useState(0);
    const [currentTime, setCurrentTime] = useState<string>('');

    // Auto-advance tips
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % financialTips.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [financialTips.length]);

    // Set current time on client side only to avoid hydration mismatch
    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString());
        };

        // Set initial time
        updateTime();

        // Update time every second
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-6'>
            {/* Shadcn Carousel Section */}
            <section className='min-h-[60vh] w-full flex items-center justify-center px-4'>
                <div className="w-full max-w-5xl mx-auto rounded-2xl">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {imageUrls.map((url, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <div className="relative overflow-hidden rounded-xl">
                                            <Image
                                                className="w-full h-[500px] object-cover hover:scale-105"
                                                src={url}
                                                alt={`Stock market slide ${index + 1}`}
                                                width={800}
                                                height={500}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="text-2xl font-bold mb-2">
                                                    {index === 0 && "Bull Market Trends"}
                                                    {index === 1 && "Corporate Growth"}
                                                    {index === 2 && "Market Analysis"}
                                                    {index === 3 && "Investment Opportunities"}
                                                </h3>
                                                <p className="text-gray-200">
                                                    {index === 0 && "Riding the wave of market optimism"}
                                                    {index === 1 && "Companies driving economic expansion"}
                                                    {index === 2 && "Data-driven market insights"}
                                                    {index === 3 && "Discover your next investment"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>
            </section>

            {/* Hero Section with Stock Market Information */}
            <section className="min-h-[70vh] w-full">
                <div className="w-full flex items-center relative">
                    <div className="min-h-max relative mx-auto pt-16 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
                        {/* Hero Title */}
                        <h1 className="text-gray-900 mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight">
                            Stock Market
                        </h1>

                        <p className="text-gray-700 mx-auto max-w-5xl text-lg">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Game of Insights </span> Money & Analytics
                        </p>

                        {/* Financial Tip */}
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-center text-white shadow-xl">
                                <h3 className="text-lg font-semibold mb-2">💡 Investment Tip</h3>
                                <p className="text-lg transition-all duration-500">
                                    {financialTips[currentTip]}
                                </p>
                            </div>
                        </div>


                        {/* Market Status */}
                        <div className="text-center text-gray-600 pt-8">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">
                                    Market is Open • {currentTime ? `Last updated: ${currentTime}` : 'Loading...'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default App