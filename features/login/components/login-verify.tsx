'use client';

import React, { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import useLogin from '../hooks/useLogin';

interface LoginVerifyProps {
  phone: string;
}

const LoginVerify: React.FC<LoginVerifyProps> = ({ phone }) => {
  const { verifyLoginCode, loading } = useLogin();
  const [otp, setOtp] = useState('');

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyLoginCode({ phone, code: otp });
    if (result) {
      console.log('Login successful', result);
      // Perform post-login actions, such as redirecting
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Enter OTP</h1>
        <p className="text-gray-500 dark:text-gray-400">We sent a code to your phone</p>
      </div>
      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-center space-x-4">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading && <span className="mr-2">Verifying...</span>}
          Verify
        </Button>
      </form>
    </div>
  );
};

export default LoginVerify;
