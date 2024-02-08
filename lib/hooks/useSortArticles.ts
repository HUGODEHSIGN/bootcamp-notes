import { articleType } from "@/components/ArticleGrid";

export function useSortArticles(articles: articleType[]) {
  console.log(articles);
  function sortByAlphabetical(a: articleType, b: articleType) {
    console.log(a);
    console.log(b);
    console.log(a.title.localeCompare(b.title));
    return a.title.localeCompare(b.title);
  }

  function sortByCreated(a: articleType, b: articleType) {
    console.log(a);
    console.log(b);
    return b.created.seconds - a.created.seconds;
  }

  function sortByEdited(a: articleType, b: articleType) {
    console.log(a);
    console.log(b);
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
    return sortedArticles;
  }

  return { sortArticles };
}
