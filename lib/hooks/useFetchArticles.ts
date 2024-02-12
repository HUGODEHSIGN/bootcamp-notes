import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../firestore-config";

import { articleType } from "@/components/home/ArticleCardGrid";

export default function useFetchArticles(filter: string, sort: string) {
  async function fetchArticles() {
    // initialize variable, sets it to state at the end of the function
    const articleData: articleType[] = [];

    function queryGenerator(f: string, s: string) {
      let q;
      if (f === "All") {
        q = query(collection(db, "articles"), orderBy(s, "asc"));
      } else {
        q = query(
          collection(db, "articles"),
          where("category", "array-contains", f),
          orderBy(s, "asc"),
        );
      }
      //   console.log(f);
      console.log(s);
      return q;
    }

    const q = queryGenerator(filter, sort);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const newData: articleType = {
        id: doc.id,
        category: doc.data().category,
        content: doc.data().content,
        title: doc.data().title,
        description: doc.data().description,
        created: doc.data().created,
        edited: doc.data().edited,
      };
      articleData.push(newData);
    });

    return articleData;
  }

  const { data, isPending, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
    enabled: true,
  });
  return { data, isPending, isError, isSuccess, error, refetch };
}
