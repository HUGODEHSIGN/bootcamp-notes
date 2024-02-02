"use client";

import { AddArticleDialog } from "./AddArticleDialog";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <div className="flex flex-col mb-6">
      <div className="navbar px-6 sm:px-12 md:px-24 lg:px-48">
        <div className="navbar-start">
          <div className="text-md sm:text-xl font-bold">Hugo Hsi</div>
        </div>
        <div className="text-md sm:text-xl w-full justify-center">
          Bootcamp Notes
        </div>
        <div className="flex gap-2 navbar-end">
          <ModeToggle />
          {/* <AddArticleButton /> */}
          <AddArticleDialog />
        </div>
      </div>
      <Separator />
    </div>
  );
}
