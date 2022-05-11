import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@infoshare-f3/shared-ui';
import { useAuthContext } from '@infoshare-f3/data-providers';

export function Index() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="grid grid-cols-1 max-w-md m-auto gap-4 my-4">
      <Button title="users" onPress={() => router.push('users')} />
      <Button title="tweets" onPress={() => router.push('tweets')} />
    </div>
  );
}

export default Index;
