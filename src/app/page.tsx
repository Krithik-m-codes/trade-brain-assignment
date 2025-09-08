import React from 'react'
import { Metadata } from 'next'
import App from '@/components/screens/MainApp'

export const metadata: Metadata = {
    title: 'TradeBrain - Stock Trading Made Simple',
    description: 'Discover the simplest way to trade stocks with TradeBrain. Get real-time data, insightful analytics, and user-friendly tools to make informed investment decisions.',
    keywords: 'stock trading, real-time stock data, investment tools, stock analytics, trade stocks online',
}

function page() {
    return (
        <App />
    )
}

export default page