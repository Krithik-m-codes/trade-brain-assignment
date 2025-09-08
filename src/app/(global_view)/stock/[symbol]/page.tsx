import React from 'react'
import StockDetailPage from '@/components/screens/StockDetailPage'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Stock Details - TradeBrain',
    description: 'Get detailed information and insights on your selected stock with TradeBrain. Access real-time data, historical performance, and expert analysis to make informed investment decisions.',
    keywords: 'stock details, stock insights, real-time stock data, stock analysis, investment information',
}

function StockPage() {
    return (

        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-6'>
            <StockDetailPage />
        </div>
    )
}

export default StockPage