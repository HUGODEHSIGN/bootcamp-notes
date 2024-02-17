"use client";

import { ModeToggle } from "./ModeToggle";
import { ArticleDialog } from "./all/ArticleDialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

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
