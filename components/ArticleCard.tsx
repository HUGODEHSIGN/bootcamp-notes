import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  id: string;
};

export default function ArticleCard({ title, description, id }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          <Link href={`/${title}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
