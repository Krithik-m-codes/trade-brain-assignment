//! this file consists of stock ticker component that fetches and displays stock ticker data
"use client";
import React, { useEffect, useState } from "react";
import { fetchStockTicker } from "@/services/stock";
import { IStockTickerResponse } from "@/types/stock";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
// import { useStockContext } from "../context/stockContext";

const formatNumber = (num: number) => {
    return num?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const StockTicker: React.FC = () => {
    const [tickers, setTickers] = useState<IStockTickerResponse["volume_movers"] | null>(null);
    const router = useRouter();
    // const [stocksInTicker, setStocksInTicker] = useStockContext();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchStockTicker();
            console.log("Fetched stock ticker data:", data);
            setTickers(data.volume_movers);
            // setStocksInTicker(data.volume_movers);
        };

        fetchData();
    }, []);

    const getHighOrLowClass = (percent: number) => {
        if (percent > 0) return 'text-green-500';
        if (percent < 0) return 'text-red-500';
        return 'text-gray-500';

    }

    const onSymbolClick = (symbol: string) => {
        router.push(`/stock/${symbol}`);
    }

    return (
        <div className="stock-ticker w-full bg-gray-100 text-black p-2">
            {/* {tickers && tickers.map((ticker) => (
                <div key={ticker.symbol}>
                    <h3>{ticker.symbol}</h3>
                    <p>Price: {ticker.prev_close}</p>
                    <p>Change: {ticker.change} ({ticker.percent}%)</p>
                </div>
            ))} */}
            <Marquee speed={50} gradient={false} pauseOnHover={true} className="">
                {tickers && tickers.map((ticker) => (
                    <div key={ticker.symbol} className="flex flex-row items-center p-2 rounded-md gap-5 mx-4 hover:cursor-pointer" onClick={() => { onSymbolClick(ticker.symbol) }}>
                        <div className='flex items-center'>
                            <h3>{ticker.symbol}</h3>
                            <p> {ticker.prev_close}</p>
                            <p className={getHighOrLowClass(ticker.percent)}> {formatNumber(ticker.change)} ({formatNumber(ticker.percent)}%)</p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};
export default StockTicker;