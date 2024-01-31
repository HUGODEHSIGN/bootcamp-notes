"use client";

import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import AddArticleButton from "./AddArticleButton";

export default function Navbar() {
  return (
    <div className="navbar px-6 sm:px-12 md:px-24 lg:px-48 pt-6">
      <div className="navbar-start">
        <div className="text-md sm:text-xl font-bold">Hugo Hsi</div>
      </div>
      <div className="text-md sm:text-xl w-full justify-center">
        Bootcamp Notes
      </div>
      <div className="flex gap-2 navbar-end">
        <ModeToggle />
        <AddArticleButton />
      </div>
    </div>
  );
}
