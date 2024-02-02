import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      Back button here later
      <div>{children}</div>
    </div>
  );
}
