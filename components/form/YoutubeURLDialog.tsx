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
  handleSubmit: (url: string) => void;
};

export default function YoutubeURLDialog({ handleSubmit }: Props) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Youtube Video</DialogTitle>
          <DialogDescription>
            Embed a youtube video into the article
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="name">URL</Label>
        <Input
          id="name"
          placeholder="https://www.youtube.com/"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => handleSubmit(url)}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
