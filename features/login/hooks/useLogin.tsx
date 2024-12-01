import { useState } from 'react';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import {useAuthStore} from '@/stores/userStore';

interface LoginDto {
  phone: string;
}

interface LoginCodeDto {
  phone: string;
  code: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setAuthorization } = useAuthStore();

  const router = useRouter();
  const requestLoginCode = async (data: LoginDto) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        toast.success('Code send successfully.');
        return await response.json();
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message || "An error occurred");
        setError(errorData?.message || 'Failed to request login code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const verifyLoginCode = async (data: LoginCodeDto) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, code: Number(data.code) }),
      });

      if (response.ok) {
        const result = await response.json();
        const { accessToken } = result;

        if (accessToken) {
          Cookies.set('accessToken', accessToken, {
            path: '/',
            secure: true,
            sameSite: 'strict',
            expires: 1,
          });
          router.refresh();
          setAuthorization(true)
          setSuccess(true);
          toast.success('Code verified successfully.');

          return result;
        } else {
          toast.error('Token not found in the response.');
          setError('Token not found in the response.');
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message || 'An unexpected error occurred');
        setError(errorData?.message || 'Failed to verify login code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    requestLoginCode,
    verifyLoginCode,
    loading,
    error,
    success,
  };
};

export default useLogin;
