import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <Button variant="outline" asChild>
        <Link href="/">Back</Link>
      </Button>
    </div>
  );
}
