import { useMemo } from "react";

export const useSortDate = (posts, sortDate) => {
    const sortedPost = useMemo( () => {
        if(sortDate === true) {
          return [...posts].sort( (a, b) => Date.parse(a.date) - Date.parse(b.date));
        } else {
          return posts;
        }
    }, [sortDate, posts]);

    return sortedPost;
}
export const useSort = (posts, sortDate, sortActive) => {
    const sortedPost = useSortDate(posts, sortDate);
    
    const sortedActivePost = useMemo( () => {
        if(sortActive === true) {
          return [...sortedPost].sort( (a, b) => (a.isActive === b.isActive) ? 0 : a.isActive? -1 : 1);
        } else {
          return sortedPost;
        }
    }, [sortActive, sortedPost]);

    return sortedActivePost;
}
 
export const useSearch = (posts, sortDate, search, sortActive) => {
    const sortedPost = useSort(posts, sortDate, sortActive);

    const sortedAndSearchedPost = useMemo(() => {
      return sortedPost.filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
    }, [search, sortedPost]);

    return sortedAndSearchedPost;
}