'use client';
import React from 'react';
import withAuth from '@/lib/withAuth';
import AddProductForm from '@/components/add-product-form';

const Create: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Product Management</h1>
      <div className="w-full max-w-2xl">
        <AddProductForm/>
      </div>
    </main>
  )
};

export default withAuth(Create);
