import {
  ChevronLeft,
  DessertIcon,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  SendToBackIcon,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full md:w-[70%] lg:w-[60%] flex-1 auto-rows-max gap-4">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Textarea
                      id="description"
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="flex justify-start items-center gap-2">
                  <DessertIcon />
                  <p>Post</p>
                </Button>
              </CardFooter>
            </Card>
            <section className="space-y-6">
              <h1>Latest Posts</h1>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
