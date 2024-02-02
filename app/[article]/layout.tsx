import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-2xl">
      Testing Layout
      <div className="text-2xl">{children}</div>
    </div>
  );
}
