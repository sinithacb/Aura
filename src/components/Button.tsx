"use client";

import Link from "next/link";
import React from "react";

type ButtonVariant = "solid" | "outline" | "ghost" | "link";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type AnchorButtonProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type NativeButtonProps = CommonProps & {
  href?: never;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export type Props = AnchorButtonProps | NativeButtonProps;

function getBaseClasses(variant: ButtonVariant): string {
  if (variant === "solid") {
    return "inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:opacity-60";
  }
  if (variant === "outline") {
    return "inline-flex items-center justify-center rounded-md border border-zinc-300/80 bg-white/80 px-6 py-3 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-colors hover:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 disabled:opacity-60";
  }
  if (variant === "ghost") {
    return "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:opacity-60";
  }
  return "inline-flex items-center justify-center text-sm font-medium text-zinc-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10";
}

export default function Button(props: Props): JSX.Element {
  const { variant = "solid", className, children } = props;
  const base = getBaseClasses(variant);
  const classes = className ? `${base} ${className}` : base;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
}


