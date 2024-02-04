import { articleType } from "@/components/ArticleGrid";
import { useAtom } from "jotai";
import { articlesAtom } from "../atoms";

export function useSortArticles() {
  const [articles, setArticles] = useAtom(articlesAtom);

  function sortByAlphabetical(a: articleType, b: articleType) {
    return a.title.localeCompare(b.title);
  }

  function sortByCreated(a: articleType, b: articleType) {
    return b.created.seconds - a.created.seconds;
  }

  function sortByEdited(a: articleType, b: articleType) {
    return b.edited.seconds - a.edited.seconds;
  }

  function sortArticles(sortParameter: string) {
    let sortedArticles: articleType[];

    if (sortParameter == "alphabetical") {
      sortedArticles = [...articles].sort(sortByAlphabetical);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else if (sortParameter == "created") {
      sortedArticles = [...articles].sort(sortByCreated);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else if (sortParameter == "edited") {
      sortedArticles = [...articles].sort(sortByEdited);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else {
      console.log("sortParameter does not exist");
    }
  }
  return { sortArticles };
}
