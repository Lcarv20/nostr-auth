"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthTabs } from "@/lib/tabs";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BlocksIcon } from "lucide-react";
import Divider from "@/components/ui/divider";

export default function AuthForm() {
  return (
    <Tabs defaultValue={AuthTabs.Login} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={AuthTabs.Login}>
          {AuthTabs.Login.toUpperCase()}
        </TabsTrigger>
        <TabsTrigger value={AuthTabs.Register}>
          {AuthTabs.Register.toUpperCase()}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={AuthTabs.Login}>
        <LoginUI />
      </TabsContent>

      <TabsContent value={AuthTabs.Register}>
        <RegisterUI />
      </TabsContent>
    </Tabs>
  );
}

function LoginUI() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">🥔 Potat Login</CardTitle>
        <CardDescription>
          Showcase login with next-auth on nostr.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div>
          <Button className="w-full gap-2">
            <BlocksIcon />
            Login with extension
          </Button>
        </div>

        <Divider className="mt-2 mb-6" />

        <form action="#" className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="private-key">Private Key</Label>
            <Input
              id="private-key"
              type="password"
              placeholder="nsek123hasf..."
            />
          </div>
          <Button type="submit" className="self-end">Save changes</Button>
        </form>
      </CardContent>
      {/* <CardFooter> */}
      {/*   <Button>Save changes</Button> */}
      {/* </CardFooter> */}
    </Card>
  );
}

function RegisterUI() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">🚀 Rocket Register</CardTitle>
        <CardDescription>
          Showcase register with next-auth on nostr.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  );
}
