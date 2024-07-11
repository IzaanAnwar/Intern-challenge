import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/axios-instance';
import { CircleUser, UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Profile } from 'types';
import { Link, useParams } from 'react-router-dom';
import { ProfileLoadingPage } from '@/components/loading-page';
import { TwitterShareButton, XIcon } from 'react-share';

const SHARE_PROFILE_HEADING = 'Check out my progress';

export default function ProfilePage() {
  const currUrl = window.location.href;
  const params = useParams();

  const [profileData, setProfileData] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getProfileData() {
      try {
        const res = await api.get(`/profile/${params.username}`);
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
    return <ProfileLoadingPage />;
  }
  return (
    <main className="flex flex-col items-center justify-center pt-24 bg-background">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <UserIcon size={100} />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profileData?.name}</h2>
            <p className="text-muted-foreground">{profileData?.email}</p>
          </div>
          <div className="bg-primary rounded-full px-6 py-2 text-primary-foreground font-bold text-4xl">
            {profileData?.score?.score || 0}
          </div>
          <div className="flex gap-4">
            <Link to="#" className="hover:underline p-2 rounded-md hover:bg-accent">
              <TwitterShareButton url={currUrl} title={SHARE_PROFILE_HEADING} className="" tabIndex={1}>
                <XIcon className="w-6 h-6 text-[#1DA1F2]" />
              </TwitterShareButton>
            </Link>
            <Link to="#" className="hover:underline p-2 rounded-md hover:bg-accent">
              <InstagramIcon className="w-6 h-6 text-[#E1306C]" />
            </Link>
            <Link to="#" className="hover:underline p-2 rounded-md hover:bg-accent">
              <FacebookIcon className="w-6 h-6 text-[#4267B2]" />
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
