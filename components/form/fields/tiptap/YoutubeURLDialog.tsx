import { Editor } from "@tiptap/react";
import { Youtube } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  editor: Editor | null;
};

export default function YoutubeURLDialog({ editor }: Props) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  function addYoutubeVideo() {
    if (url) {
      editor!.commands.setYoutubeVideo({
        src: url,
      });
      return;
    }
    setShowError(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* this is the button that shows up in the toolbar */}
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9"
          onClick={() => setOpen(true)}
        >
          <Youtube className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {/* title and description */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Youtube Video</DialogTitle>
          <DialogDescription>
            Embed a youtube video into the article
          </DialogDescription>
        </DialogHeader>

        {/* input with labels and errors */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">URL</Label>
          <Input
            id="name"
            placeholder="https://www.youtube.com/"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
          />
          {/* shows error when text box is empty */}
          {showError && (
            <Label className="text-destructive">Please add URL</Label>
          )}
        </div>

        {/* buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={addYoutubeVideo}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
