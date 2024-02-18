import { useAtom } from "jotai";

import TooltipAll from "@/components/all/TooltipAll";
import { filterAtom } from "@/components/functionality/filter-sort/useFilterSortArticles";
import { Badge } from "@/components/ui/badge";
import { disableLinkAtom } from "@/components/view/home/ArticleCardGrid";

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
          // disables link to article cards on hover
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
