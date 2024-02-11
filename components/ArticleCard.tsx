import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { filterAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: React.ReactNode;
  description: React.ReactNode;
  category: string[] | React.ReactNode;
};

// component takes props from ArticleGrid
export default function ArticleCard({ title, description, category }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);

  const [tagHovering, setTagHovering] = useState<boolean>(false);

  function renderTags() {
    if (Array.isArray(category)) {
      return category.map((tag) => (
        <Badge
          key={tag}
          onClick={() => {
            setFilter(tag);
          }}
          onMouseEnter={() => {
            setTagHovering(true);
          }}
          onMouseLeave={() => {
            setTagHovering(false);
          }}
        >
          {tag}
        </Badge>
      ));
    }
  }

  // render component
  return (
    <Link href={tagHovering ? "#" : `/${title}`}>
      <Card className="hover:bg-secondary h-[145px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-row gap-2">{renderTags()}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
