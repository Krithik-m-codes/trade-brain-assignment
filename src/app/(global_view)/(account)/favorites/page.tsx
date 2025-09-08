import React from 'react'
import FavoritesPage from '@/components/screens/FavoritePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Your Favorite Stocks - TradeBrain',
    description: 'View and manage your favorite stocks on TradeBrain. Stay updated with real-time data and insights on the stocks you care about most.',
    keywords: 'favorite stocks, stock watch list, stock tracking, investment favorites, stock portfolio',
}

function FavoritesPageWrapper() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-6'>
            <FavoritesPage />
        </div>
    )
}

export default FavoritesPageWrapper;