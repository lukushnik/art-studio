import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import Cookies from 'js-cookie';

const withAuth = <P extends Record<string, unknown>>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
