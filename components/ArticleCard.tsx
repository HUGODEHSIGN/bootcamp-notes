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
};

// component takes props from ArticleGrid
export default function ArticleCard({ title, description }: Props) {
  // render component
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={`/${title}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
