import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/axios-instance';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (password && passwordConfirm) {
      setPasswordMatch(password === passwordConfirm);
    }
  }, [password, passwordConfirm]);
  const submitSugnup = async () => {
    if (password !== passwordConfirm) {
      toast.error('Password mismatch');
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post('/signup', {
        email,
        password,
        name,
      });
      if (res.status !== 201) {
        throw new Error(res.data?.message || 'Could not create user');
      }
      const data = (await res.data) as { token: string };
      Cookies.set('access_token', data.token, { secure: true, expires: 1 });
      toast.success('Signup Success');
    } catch (error: any) {
      toast.error('Error', { description: error?.message || 'Something went wrong. Please try again' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex justify-center items-center w-full min-h-full px-2 pt-20">
      <Card className="mx-auto w-full sm:max-w-sm md:w-[50%] lg:w-[26%]">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid  gap-2">
              <Label htmlFor="last-name">Name</Label>
              <Input id="full-name" placeholder="Robinson Greyrat" required onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="text" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Confirm Password</Label>
              <span onClick={() => setVisible(!visible)} className="absolute  top-[1.75rem] right-4">
                {visible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
              <Input
                id="password"
                type={visible ? 'text' : 'password'}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {!passwordMatch ? (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              ) : (
                <p className="min-h-4"></p>
              )}
            </div>
            <Button type="submit" className="w-full" onClick={submitSugnup} loading={isLoading} disabled={isLoading}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}