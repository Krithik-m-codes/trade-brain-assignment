'use client';
import React, { useState } from 'react';
import NavLinks from './NavLinks';
import { useRouter } from 'next/navigation';
import SearchBar from '../app/SearchBar';
import Link from 'next/link';
import Image from 'next/image';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Close mobile menu on link click
    const handleLinkClick = () => setMobileMenuOpen(false);

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" title="Logo" className="flex">
                            <Image className="w-auto h-8 lg:h-10" width={36} height={36} src="/logo.jpg" alt="Logo" />
                        </Link>
                    </div>

                    <SearchBar onSelectStock={(stock) => router.push(`/stock/${stock.symbol}`)} />
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        aria-label="Toggle menu"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                    >
                        {/* Hamburger icon */}
                        <svg className={`w-6 h-6 ${mobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                        {/* Close icon */}
                        <svg className={`w-6 h-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Desktop nav links */}
                    <NavLinks
                        className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10"
                        itemClassName="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                    />

                    <a
                        href="#"
                        title="Get started now"
                        className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
                        role="button"
                    >
                        Get started now
                    </a>
                </nav>

                {/* Mobile nav menu */}
                {mobileMenuOpen && (
                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden animate-fade-in">
                        <div className="flow-root">
                            <NavLinks
                                className="flex flex-col px-6 -my-2 space-y-1"
                                itemClassName="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                onClickLink={handleLinkClick}
                            />
                        </div>
                        <div className="px-6 mt-6">
                            <a
                                href="#"
                                title="Get started now"
                                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700"
                                role="button"
                                onClick={handleLinkClick}
                            >
                                Login Now
                            </a>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;