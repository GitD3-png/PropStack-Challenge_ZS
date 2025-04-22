import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
//push for Vercal #1
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-xs">PS</span>
            </div>
            <span className="text-xl font-bold text-gray-800">stackshare</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search tech stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/tools" className="text-gray-600 hover:text-primary text-sm font-medium">Tools</Link>
            <Link href="/stacks" className="text-gray-600 hover:text-primary text-sm font-medium">Stacks</Link>
            <Link href="/comparisons" className="text-gray-600 hover:text-primary text-sm font-medium">Comparisons</Link>
          </nav>
          
          <Link href="/admin" className="hidden md:block text-blue-500 border border-blue-500 px-4 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
            Sign up/Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
