import { cn } from "@/lib/utils";
import React from "react";
import { ThemeToggler } from "./theme-toggler";
import { VenetianMaskIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className={cn("p-4 border-b", "flex")}>
      <h1 className="text-3xl font-bold font-serif relative">
        <VenetianMaskIcon className="w-6 h-6 absolute -right-3 -top-0.5 rotate-12 z-10 text-destructive" />
        NAuth
      </h1>
      <div className="ml-auto">
        <ThemeToggler />
      </div>
    </nav>
  );
}
