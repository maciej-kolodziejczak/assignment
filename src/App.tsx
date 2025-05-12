import s from "./App.module.css";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";

import { searchUser } from "./lib/api";

import { Header } from "./components/Header/Header";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchResults } from "./components/SearchResults/SearchResults";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchUser", searchQuery],
    queryFn: ({ pageParam }) => searchUser(searchQuery, pageParam),
    getNextPageParam: (lastPage, _, pageParam) => {
      if (!lastPage.hasNext) return undefined;
      return pageParam + 1;
    },
    initialPageParam: 1,
    enabled: !!searchQuery,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={s.container}>
      <Header />
      <main className={s.content}>
        <SearchForm
          onSubmit={({ q }) => setSearchQuery(q)}
          error={error?.message}
          isLoading={isLoading || isFetchingNextPage}
        />
        <div className={s.scrollWrapper}>
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            useWindow={false}
          >
            <SearchResults items={items} />
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
}

export default App;
