import { useState } from "react";
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {delay} from '@/lib/utils';

interface UserDto {
  name: string;
  phone: string;
}
const signUpUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter()

  const onSubmit = async (userData: UserDto) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccess(true);
        toast.success('Successfully registered successfully.');
        delay(1000).then(() => router.push('/login'))


      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setError(errorData?.message || "An error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
    success,
  };
};

export default useRegister;
