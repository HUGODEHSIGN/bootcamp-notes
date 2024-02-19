"use client";

import { useMediaQuery } from "@/lib/useMediaQuery";
import { useState } from "react";

import DesktopDialog from "@/components/form/dialog/desktop/DesktopDialog";
import MobileDrawer from "@/components/form/dialog/mobile/MobileDrawer";

// component
export function ArticleDialog() {
  const [open, setOpen] = useState(false);

  let isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DesktopDialog open={open} setOpen={setOpen} />;
  }

  return <MobileDrawer open={open} setOpen={setOpen} />;
}
