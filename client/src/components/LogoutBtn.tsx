import { useState } from 'react';
import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { api } from '@/lib/axios-instance';
import { Navigate } from 'react-router-dom';
function LogoutBtn() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function handleLogOut() {
    setIsLoading(true);
    try {
      const res = await api.post('/signout');
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      Cookies.remove('access_token');
      setLoggedOut(true);
    } catch (error: any) {
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    } finally {
      setIsLoading(false);
    }
  }
  if (loggedOut) {
    return <Navigate to={'/signin'} />;
  }
  return (
    <Button onClick={handleLogOut} loading={isLoading} disabled={isLoading}>
      Logout
    </Button>
  );
}

export default LogoutBtn;
