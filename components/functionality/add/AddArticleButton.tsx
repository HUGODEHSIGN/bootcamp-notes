import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

// component for plus button for adding new article
export default function AddArticleButton() {
  return (
    <Button size="icon">
      <Plus />
    </Button>
  );
}
