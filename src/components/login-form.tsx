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
import {
  BlocksIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  UserIcon,
} from "lucide-react";
import Divider from "@/components/ui/divider";
import styles from "@/components/neon-border.module.css";
import { cn } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { generateKeys } from "@/actions/register";
import { useCopyToClipboard } from "@/lib/hooks/copy-to-clipboard";
import { loginWithExtension } from "@/lib/nostr/client-authentication";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthComponent() {
  const { data: session } = useSession();

  if (session) {
    redirect("/user");
  }

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
          <Button onClick={loginWithExtension} className="w-full gap-2">
            {/* <Button className="w-full gap-2"> */}
            <BlocksIcon />
            Login with extension
          </Button>
        </div>

        <Divider className="mt-2 mb-6" />

        <form action="#" className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="private-key" className="flex gap-2">
              <KeyRoundIcon />
              Private Key
            </Label>
            <Input
              id="private-key"
              type="password"
              placeholder="nsek123hasf..."
            />
          </div>
          <Button type="submit" className="self-end">
            Login with private key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const initialState = {
  pk: "",
  sk: "",
};

function RegisterUI() {
  const [formState, formAction] = useFormState(generateKeys, initialState);
  const [_, copy] = useCopyToClipboard();
  const [showKey, setShowKey] = React.useState(false);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🚀 Rocket Register</CardTitle>
          <CardDescription>
            Showcase register with next-auth on nostr.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="publick-key" className="flex gap-2">
              <UserIcon />
              Your new public key
            </Label>
            <div className="flex border rounded-md pl-2">
              <Input
                id="publick-key"
                type="text"
                className="border-none"
                defaultValue={formState.pk}
                disabled
              />
              <Button
                onClick={() => {
                  copy(formState.pk);
                }}
                type="button"
                variant="secondary"
                size="icon"
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="secret-key" className="flex gap-2">
              <KeyRoundIcon />
              Your new private key
              <button
                type="button"
                className="ml-auto p-1 mr-2"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOffIcon className="w-3 h-3" />
                ) : (
                  <EyeIcon className="w-3 h-3" />
                )}
              </button>
            </Label>

            <div className="flex border rounded-md pl-2">
              <Input
                id="secret-key"
                type={showKey ? "text" : "password"}
                className="border-none"
                defaultValue={formState.sk.toString()}
                disabled
              />
              <Button
                onClick={() => {
                  copy(formState.sk.toString());
                }}
                type="button"
                variant="secondary"
                size="icon"
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <GenerateButton />
        </CardFooter>
      </Card>
    </form>
  );
}

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <div data-generating={pending} className={cn(styles.glow, styles.block)}>
      <Button
        disabled={pending}
        type="submit"
        className={cn("w-full z-10", pending && styles.active)}
      >
        {pending ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
}
