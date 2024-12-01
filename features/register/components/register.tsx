'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import useRegister from '@/features/register/hooks/useRegister';

const RegisterPreview = () => {
  const { onSubmit, loading } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Katy Lukash"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+380.."
            required
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
      <div className="text-center text-sm mt-2">
        Already have an account?{' '}
        <Link href={'/login'} className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPreview;
