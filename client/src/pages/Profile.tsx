import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/axios-instance';
import { CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Profile } from 'types';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProfileData() {
      try {
        const res = await api.get('/profile/');
        if (res.status !== 200) {
          throw new Error('Error getting all posts');
        }
        const data = res.data?.profileInfo as Profile | undefined;
        setProfileData(data);
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
    getProfileData();
  }, []);
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <main className="w-full pt-24">
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CircleUser />
            <CardTitle className="text-xl font-bold">{profileData?.name}</CardTitle>
          </div>
          <CardTitle>
            <p className="text-sm">{profileData?.email}</p>
          </CardTitle>
        </CardHeader>
        <div className="bg-background p-6 rounded-b-lg">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Scores</h2>

            <div className="text-2xl font-bold">{profileData?.score?.score ?? 0}</div>
          </div>
        </div>
      </Card>
    </main>
  );
}
