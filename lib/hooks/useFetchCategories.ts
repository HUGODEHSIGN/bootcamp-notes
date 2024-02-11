import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";
import _ from "lodash";

import { db } from "../firestore-config";

export default function useFetchCategories() {
  async function fetchCategories() {
    // initialize variable, sets it to state at the end of the function
    let categoriesData: string[] = [];
    const q = query(collection(db, "articles"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      const newData: string[] = doc.data().category;
      categoriesData.push(...newData);
    });
    categoriesData = _.uniq(categoriesData);

    return categoriesData;
  }

  const { data, isPending, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return { data, isPending, isError, isSuccess, error, refetch };
}
