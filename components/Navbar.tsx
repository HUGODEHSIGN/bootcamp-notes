import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import AddArticleButton from "./AddArticleButton";

export default function Navbar() {
  return (
    <div className="navbar px-12">
      <div className="navbar-start">
        <div className="text-xl font-bold">Hugo Hsi</div>
      </div>
      <div className="text-xl w-full justify-center">Bootcamp Notes</div>
      <div className="flex gap-2 navbar-end">
        <ModeToggle />
        <AddArticleButton />
      </div>
    </div>
  );
}
