import TooltipAll from "./TooltipAll";
import { disableLinkAtom, filterAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import { Badge } from "../ui/badge";

type Props = {
  category: string;
};

export default function Tag({ category }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  return (
    <TooltipAll content={`Filter by - ${category}`}>
      <div>
        <Badge
          className="cursor-pointer"
          onClick={() => setFilter(category)}
          onMouseEnter={() => {
            setLinkIsDisabled(true);
          }}
          onMouseLeave={() => {
            setLinkIsDisabled(false);
          }}
        >
          {category}
        </Badge>
      </div>
    </TooltipAll>
  );
}
