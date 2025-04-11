import React from 'react';
import Link from 'next/link';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary rounded mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PS</span>
                </div>
                <span className="text-xl font-bold text-gray-800">stackshare</span>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                PropStack helps you discover the PropTech tools and services used by leading real estate companies, and find the best tech stack for your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-800">EXPLORE</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-gray-600 hover:text-primary">Home</Link></li>
                  <li><Link href="/stacks" className="text-gray-600 hover:text-primary">PropTech Stacks</Link></li>
                  <li><Link href="/tools" className="text-gray-600 hover:text-primary">Tools</Link></li>
                  <li><Link href="/comparisons" className="text-gray-600 hover:text-primary">Comparisons</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-800">RESOURCES</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/admin" className="text-gray-600 hover:text-primary">Add Your Stack</Link></li>
                  <li><Link href="/about" className="text-gray-600 hover:text-primary">About PropStack</Link></li>
                  <li><Link href="/api" className="text-gray-600 hover:text-primary">API</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} PropStack Challenge</p>
            <p>Inspired by <a href="https://stackshare.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">StackShare.io</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
