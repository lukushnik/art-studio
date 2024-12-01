'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';
import { UserMenu } from '@/components/user-menu';
import CartMenu from '@/components/cart-menu';
import { useCartStore } from '@/stores/cartStore';

export function Header() {
  const { isAuthorization, token, setUser } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error('Не вдалося отримати профіль користувача');
          }
        } catch (error) {
          console.error('Помилка при отриманні профілю користувача:', error);
        }
      }
    };

    fetchUserProfile();

    if (token) {
      fetchCart(token);
    }
  }, [token, fetchCart, setUser]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-black text-xl">ART Studio</div>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                href="/shop"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Наш магазин
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isMounted ? (
              isAuthorization ? (
                <UserMenu/>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                   Увійти
                </Link>
              )
            ) : (
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            )}
            <CartMenu/>
          </div>
        </div>
      </div>
    </header>
  );
}
