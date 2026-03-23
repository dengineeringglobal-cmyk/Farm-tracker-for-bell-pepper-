'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('user');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <span>🌾</span>
            Farm Tracker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </Link>
                <Link href="/records" className="text-gray-700 hover:text-green-600 transition">
                  Farm Records
                </Link>
                <Link href="/data" className="text-gray-700 hover:text-purple-600 transition">
                  Data Management
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l">
                  <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && isLoggedIn && (
          <div className="md:hidden pb-4 border-t">
            <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/records" className="block py-2 text-gray-700 hover:text-green-600">
              Farm Records
            </Link>
            <Link href="/data" className="block py-2 text-gray-700 hover:text-purple-600">
              Data Management
            </Link>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600 mb-2">Welcome, {user?.name || 'User'}</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 w-full"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
