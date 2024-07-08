import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleUser } from 'lucide-react';

export default function Profile() {
  return (
    <main className="w-full pt-24">
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CircleUser />
            <CardTitle className="text-xl font-bold">John Doe</CardTitle>
          </div>
          <CardTitle>
            <p className="text-sm">@johndoe</p>
          </CardTitle>
        </CardHeader>
        <div className="bg-background p-6 rounded-b-lg">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Scores</h2>

            <div className="text-2xl font-bold">85</div>
          </div>
        </div>
      </Card>
    </main>
  );
}
