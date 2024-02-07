import { articleType } from "@/components/ArticleGrid";

export function useSortArticles(articles: articleType[]) {
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
    let sortedArticles;
    if (sortParameter === "alphabetical") {
      sortedArticles = [...articles].sort(sortByAlphabetical);
    } else if (sortParameter === "created") {
      sortedArticles = [...articles].sort(sortByCreated);
    } else if (sortParameter === "edited") {
      sortedArticles = [...articles].sort(sortByEdited);
    } else {
      console.log("sortParameter does not exist");
    }
    // setArticles(() => sortedArticles);
    return sortedArticles;
    console.log(sortedArticles);
  }

  return { sortArticles };
}
