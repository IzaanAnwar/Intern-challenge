
import { useState } from "react";
import { Link } from "react-router-dom";
import {EyeIcon, EyeOffIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signup() {
    const [visible, setVisible] = useState(false)
  return (
    <main className="flex justify-center items-center w-full h-screen ">

    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <span onClick={() => setVisible(!visible)} className="absolute  top-[1.75rem] right-4">{visible ?<EyeOffIcon size={20}/>: <EyeIcon size={20}/>}</span>
            <Input id="password" type={visible ? "text":"password"} />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </main>

  )
}
