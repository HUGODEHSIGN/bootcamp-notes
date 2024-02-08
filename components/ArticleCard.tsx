import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  category: string[];
};

// component takes props from ArticleGrid
export default function ArticleCard({ title, description, category }: Props) {
  function renderTags() {
    return category.map((tag) => <Badge key={tag}>{tag}</Badge>);
  }

  // render component
  return (
    <Link href={`/${title}`}>
      <Card className="hover:bg-secondary">
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
