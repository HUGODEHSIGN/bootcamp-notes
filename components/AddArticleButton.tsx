import { Button } from "./ui/button";
import { Plus } from "lucide-react";

// component for plus button for adding new article
export default function AddArticleButton() {
  return (
    <Button size="icon">
      <Plus />
    </Button>
  );
}
