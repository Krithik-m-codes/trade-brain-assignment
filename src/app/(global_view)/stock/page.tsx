"use client";
import React from 'react';
import sectorData from '@/data/sectorData.json';


export default function StockDetailPage() {
    const sectorNames = sectorData.sectorName.map(sector => sector.sect_name && sector.sect_name)

    console.log("Sector names : ", sectorNames)

    return (
        <div className='flex items-center justify-center min-h-screen bg-slate-50 text-black'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-4'>Stock Detail Page</h1>
                <ul>
                    {sectorNames.map((names) => (
                        <li key={names} className=''>{names}</li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
}
