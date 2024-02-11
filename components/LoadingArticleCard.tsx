import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import React from "react";

export default function LoadingArticleCard() {
  return (
    <Card className="hover:bg-secondary h-[145px]">
      <CardHeader>
        <Skeleton className="w-full h-[24px] mb-0.5" />

        <Skeleton className="w-full h-[14px]" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="w-full h-[22px] mt-1" />
      </CardFooter>
    </Card>
  );
}
