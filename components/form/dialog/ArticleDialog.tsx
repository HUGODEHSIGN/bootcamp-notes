"use client";

import DesktopDialog from "./desktop/DesktopDialog";
import MobileDrawer from "./mobile/MobileDrawer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useState } from "react";

// component
export function ArticleDialog() {
  const [open, setOpen] = useState(false);

  let isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DesktopDialog open={open} setOpen={setOpen} />;
  }

  return <MobileDrawer open={open} setOpen={setOpen} />;
}
