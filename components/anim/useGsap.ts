"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useGsap(
  scope: React.RefObject<HTMLElement>,
  fn: (ctx: gsap.Context) => void,
) {
  useLayoutEffect(() => {
    if (!scope.current) return;

    let ctx: gsap.Context | undefined;

    ctx = gsap.context(() => {
      // ctx is assigned before this runs (safe)
      fn(ctx!);
    }, scope);

    return () => ctx?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
