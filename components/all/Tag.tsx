import { filterAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import { Badge } from "../ui/badge";

type Props = {
  category: string;
};

export default function Tag({ category }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);
  return (
    <Badge className="cursor-pointer" onClick={() => setFilter(category)}>
      {category}
    </Badge>
  );
}
