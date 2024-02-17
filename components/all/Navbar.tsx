"use client";

import { ModeToggle } from "./theme/ModeToggle";
import { Plus } from "lucide-react";

import { ArticleDialog } from "../form/dialog/ArticleDialog";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex flex-col mb-6">
      <div className="navbar px-6 sm:px-12 md:px-24 xl:px-48">
        <div className="font-bold text-md sm:text-xl w-full navbar-start">
          Bootcamp Notes
        </div>
        <div className="flex gap-2 navbar-end">
          <ModeToggle />
          {/* <AddArticleButton /> */}
          <ArticleDialog>
            <Button size="icon">
              <Plus />
            </Button>
          </ArticleDialog>
        </div>
      </div>
    </div>
  );
}
