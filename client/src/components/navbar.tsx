import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { CircleUser, Menu, TvMinimal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';
import { api } from '@/lib/axios-instance';

export default function Navbar() {
  const [loggedOut, setLoggedOut] = useState(false);
  async function handleLogOut() {
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
    }
  }
  if (loggedOut) {
    return <Navigate to={'/signin'} />;
  }
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <TvMinimal className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>

        <Link to="#" className="text-foreground transition-colors hover:text-foreground">
          Posts
        </Link>
        <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
          Profile
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
              <TvMinimal className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link to="#" className="text-foreground transition-colors hover:text-foreground">
              Posts
            </Link>
            <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <ModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
