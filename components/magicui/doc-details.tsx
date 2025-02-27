"use client";

import { FileTextIcon, HomeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type IconProps = React.HTMLAttributes<SVGElement>;


const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: PencilIcon, label: "Journal" },

  ],

};

export function DockDemo() {
  return (
    <div className="sticky bottom-5 left-0 right-0 z-50 flex h-24 items-center justify-center">
      <div className="container max-w-md">
        <TooltipProvider>
          <Dock direction="middle" className="bg-black/50 rounded-full border-1">
            {DATA.navbar.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-2xl", "hover:bg-destructive/20",
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="border-1">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}

            <Separator orientation="vertical" className="h-full" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={"https://drive.google.com/file/d/1TljgvQZEzktH8nGEBPbdvEuQbkoKtu2Q/view?usp=sharing"}
                    aria-label={"resume"}
                    target={"_blank"}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-2xl", "hover:bg-emerald-500/20",
                    )}
                  >
                    <FileTextIcon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="border-1">
                  <p>{"Resume"}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  );
}