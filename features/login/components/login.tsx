'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Link from 'next/link';
import LoginOTP from './login-verify';
import useLogin from '../hooks/useLogin';

const LoginPreview = () => {
  const { requestLoginCode, loading } = useLogin();
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState('');

  const handleRequestLoginCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await requestLoginCode({ phone });
    if (result) setShowOTP(true);
  };

  if (showOTP) {
    return <LoginOTP phone={phone} />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Ласкаво просимо</h1>
        <p className="text-gray-500 dark:text-gray-400">Введіть свій номер телефону, щоб увійти до облікового запису</p>
      </div>
      <form onSubmit={handleRequestLoginCode} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            placeholder="+380..."
            required
            type="tel"
            pattern="^\+?[1-9]\d{1,14}$"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Увійти
        </Button>
        <div className="text-center text-sm">
          Немає облікового запису?{' '}
          <Link href={'/register'} className="underline">
            Зареєструватися
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPreview;
