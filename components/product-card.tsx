'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores/cartStore';
import {Product} from '@/types'
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/userStore';

interface ProductCardProps {
  product: Product;
}

const apiCall = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Не вдалося виконати запит до API');
  }
  return response.json();
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const updateCart = useCartStore((state) => state.updateCart);

  const { token } = useAuthStore();

  const handleAddToCart = async () => {
    if (!token) {
      toast.error('Ви повинні увійти, щоб додати продукт до кошика.');
      return;
    }

    try {
      const responseData = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      console.log('responseData', responseData);

      const transformedCart = {
        ...responseData,
        cartProduct: responseData.cartProduct.map((item: any) => ({
          ...item,
          product: {
            id: item.product?.id || product.id,
            name: item.product?.name || product.name,
            price: item.product?.price || product.price,
            image: item.product?.image || product.image,
          },
        })),
      };

      updateCart(transformedCart);

      toast.success('Продукт успішно додано.');
    } catch (error) {
      console.error('Помилка при додаванні до кошика:', error);
      toast.error('Не вдалося додати продукт до кошика.');
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={product.image || '/default-product-image.jpg'}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-35' : 'opacity-0'
        }`}
      >
        <button
          onClick={handleAddToCart}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
          aria-label={`Add ${product.name} to cart`}
        >
          Додати до кошика
        </button>
      </div>
    </div>
  );
}
