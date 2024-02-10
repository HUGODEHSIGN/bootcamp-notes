import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";

import { db } from "../firestore-config";

import { articleType } from "@/components/ArticleGrid";

import { filteredArticleAtom } from "../atoms";

export default function useInit() {
  // const [articles, setArticles] = useAtom(articlesAtom);
  const [filteredArticles, setFilteredArticles] = useAtom(filteredArticleAtom);
  // useEffect(() => {
  const categoryRef = doc(db, "categories", "categories");
  async function fetchCategory() {
    const docSnap = await getDoc(categoryRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCategories(docSnap.data().categories);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  // fetchCategory();

  // fetch HTML articles
  const q = query(
    collection(db, "articles"),
    //   where("category", "==", "HTML")
  );

  // fetch articles

  async function fetchArticles() {
    // initialize variable, sets it to state at the end of the function
    const articleData: articleType[] = [];
    try {
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
    } catch (e) {
      throw e;
    }

    // setArticles(articleData);
    // setFilteredArticles(articleData);
    // console.log(articles);
    return articleData;
  }

  // const { data, status } = useQuery({
  //   queryKey: ["articles"],
  //   queryFn: () => fetchArticles(),
  // });

  // const [{ data, status }] = useAtom(articlesAtom);
  // fetchArticles();
  // }, []);

  return;
}
