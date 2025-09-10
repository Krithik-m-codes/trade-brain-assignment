import React from 'react'
import StockDetailPage from '@/components/screens/StockDetailPage'
import { Metadata } from 'next';
import { getStockCompanyName, getStockPricesServer } from '@/server/server-actions';

interface StockPageProps {
    params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {
    const { symbol } = await params;
    const companyName = await getStockCompanyName(symbol);

    return {
        title: `${symbol} ${companyName ? `- ${companyName}` : ''} | TradeBrain`,
        description: `Get detailed information and insights on ${companyName || symbol} stock with TradeBrain. Access real-time data, historical performance, and expert analysis.`,
        keywords: `${symbol}, ${companyName}, stock details, stock insights, real-time stock data, stock analysis, investment information`,
    };
}

async function StockPage({ params }: StockPageProps) {
    const { symbol } = await params;

    // Fetch data on the server side
    const [companyName, stockPrices] = await Promise.all([
        getStockCompanyName(symbol),
        getStockPricesServer(symbol)
    ]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-6'>
            <StockDetailPage
                symbol={symbol}
                companyName={companyName}
                initialPrices={stockPrices}
            />
        </div>
    )
}

export default StockPage