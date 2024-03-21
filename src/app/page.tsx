import AuthTabs from "@/components/login-form";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Home() {
  const relays = JSON.parse(cookies().get("relays")?.value || "{}");

  return (
    <main className="flex flex-col grow items-center justify-center">
      {/* {Object.keys(relays).length > 0 ? ( */}
      {/*   <code className="font-mono"> */}
      {/*     <pre>{JSON.stringify(relays, null, 2)}</pre> */}
      {/*   </code> */}
      {/* ) : ( */}
      {/*   <AuthTabs /> */}
      {/* )} */}
      <AuthTabs />
    </main>
  );
}
